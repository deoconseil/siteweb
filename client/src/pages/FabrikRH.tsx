import { useEffect, useMemo, useRef, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_RAW_UPLOAD_PRESET,
  gasGet,
  gasPost,
} from "@/lib/gas";
import FABRIK_LOGO from "@/assets/fabrik-rh-logo.png";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-fabrik_1ded06c1.jpg";
const PARTNER_LOGOS = [
  {
    key: "deo",
    name: "DEO Conseil",
    src: "https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png",
    bg: "#f3f3f3",
  },
  {
    key: "evotrust",
    name: "Evotrust",
    src: "/images/partners/evotrust-logo.png",
    bg: "#1f252c",
  },
  {
    key: "people-company",
    name: "People & Company",
    src: "https://cdn.prod.website-files.com/672a3241ca864fbc59f730e0/672a32425f7e3f333704afab_Deursticker_white.png",
    bg: "#efefef",
  },
];

const piliers = [
  {
    num: "01",
    title: "Espace communautaire",
    text: "Créer une dynamique communautaire pour accompagner la mutation des pratiques RH dans une nouvelle ère.",
    accent: "var(--red)",
  },
  {
    num: "02",
    title: "Réseau d'experts",
    text: "Fédération d'experts sélectionnés par compétences, valeurs et vision du monde.",
    accent: "var(--red)",
  },
  {
    num: "03",
    title: "Partage & Pratiques",
    text: "Un lieu de partage des expériences et des meilleures pratiques RH.",
    accent: "#888",
  },
  {
    num: "04",
    title: "Débats & Études",
    text: "Espace de débats et d'études autour des transformations des organisations.",
    accent: "#888",
  },
  {
    num: "05",
    title: "Innovation managériale",
    text: "Promotion de toutes les innovations en matière de management et développement du leadership.",
    accent: "#888",
  },
  {
    num: "06",
    title: "Révolution digitale",
    text: "Le numérique au cœur de toutes les transformations humaines et organisationnelles.",
    accent: "#888",
  },
];

const DOMAINES_RH = [
  "Recrutement",
  "Formation & Talent",
  "QVCT & Bien-être",
  "SIRH & Data RH",
  "Marque Employeur",
  "Leadership & Coaching",
  "Autres",
] as const;

const EXPERIENCE_OPTIONS = [
  "Moins de 2 ans",
  "2 à 5 ans",
  "6 à 10 ans",
  "11 à 15 ans",
  "Plus de 15 ans",
] as const;

const ROLE_OPTIONS = [
  "DRH / RRH",
  "Dirigeant(e) / Manager",
  "Consultant(e) RH",
  "Coach / Formateur(trice)",
  "Expert(e) RH / Talent",
  "Autre",
] as const;

const SECTEUR_OPTIONS = [
  "Industrie & Manufacturing",
  "Agroalimentaire",
  "Énergie & Environnement",
  "BTP & Construction",
  "Chimie & Pharmacie",
  "Conseil & Audit",
  "Banque & Finance",
  "Assurance",
  "Immobilier",
  "Transport & Logistique",
  "Santé & Médico-social",
  "Éducation & Formation",
  "Ressources Humaines",
  "Technologies & Informatique",
  "Télécommunications",
  "Commerce & Distribution",
  "Tourisme & Hôtellerie",
  "Administration publique",
  "Agriculture",
  "Autre",
] as const;

type FabrikStatus = "idle" | "sending" | "sent" | "error";
type CvUploadStatus = "idle" | "uploading" | "uploaded" | "error";
type DocLeadStatus = "idle" | "sending" | "sent" | "error";

interface FabrikFormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  fonctionActuelle: string;
  experienceRh: string;
  secteurActivite: string;
  domainesInteret: string[];
  autresDomaine: string;
  roleSouhaite: string;
  motivation: string;
  sujetsInteret: string;
  contenuRh: string;
  lienReference: string;
  linkedin: string;
  cvUrl: string;
  consentement: boolean;
}

const initialFormState: FabrikFormState = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  ville: "",
  fonctionActuelle: "",
  experienceRh: "",
  secteurActivite: "",
  domainesInteret: [],
  autresDomaine: "",
  roleSouhaite: "",
  motivation: "",
  sujetsInteret: "",
  contenuRh: "",
  lienReference: "",
  linkedin: "",
  cvUrl: "",
  consentement: false,
};

interface FabrikDocPopupConfig {
  title: string;
  description: string;
  article: string;
  state: "ON" | "OFF";
}

interface DocLeadFormState {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  fonction: string;
}

const FABRIK_DOC_POPUP_CACHE_KEY = "fabrik_doc_popup_config_v1";
const initialDocLeadFormState: DocLeadFormState = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  entreprise: "",
  fonction: "",
};

const toAttachmentName = (title: string): string => {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  return normalized || "fabrik-rh-document";
};

const hasPdfSignature = async (blob: Blob): Promise<boolean> => {
  const bytes = new Uint8Array(await blob.slice(0, 5).arrayBuffer());
  if (bytes.length < 5) return false;
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d;
};

export default function FabrikRH() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FabrikStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formState, setFormState] = useState<FabrikFormState>(initialFormState);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploadStatus, setCvUploadStatus] = useState<CvUploadStatus>("idle");
  const [cvUploadProgress, setCvUploadProgress] = useState(0);
  const [uploadedCvUrl, setUploadedCvUrl] = useState("");
  const [docPopupConfig, setDocPopupConfig] = useState<FabrikDocPopupConfig | null>(null);
  const [showDocPopup, setShowDocPopup] = useState(false);
  const [isDownloadingDoc, setIsDownloadingDoc] = useState(false);
  const [docDownloadError, setDocDownloadError] = useState("");
  const [docLeadForm, setDocLeadForm] = useState<DocLeadFormState>(initialDocLeadFormState);
  const [docLeadStatus, setDocLeadStatus] = useState<DocLeadStatus>("idle");
  const [docLeadError, setDocLeadError] = useState("");
  const cvUploadRequestId = useRef(0);

  const closeDocPopup = () => {
    setShowDocPopup(false);
    setDocDownloadError("");
    setDocLeadError("");
    setDocLeadStatus("idle");
    setDocLeadForm(initialDocLeadFormState);
  };

  const downloadPopupArticle = async (url: string, title: string) => {
    const filename = `${toAttachmentName(title)}.pdf`;
    const sourceUrl = url.trim();
    if (!sourceUrl) {
      setDocDownloadError("Lien de l'article manquant.");
      return;
    }
    setDocDownloadError("");
    setIsDownloadingDoc(true);
    try {
      const res = await fetch(sourceUrl, { method: "GET" });
      if (!res.ok) {
        const cldError = String(res.headers.get("x-cld-error") || "").toLowerCase();
        if (res.status === 401 || cldError.includes("deny") || cldError.includes("acl")) {
          throw new Error("CLOUDINARY_PDF_BLOCKED");
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const blob = await res.blob();
      if (!(await hasPdfSignature(blob))) {
        throw new Error("INVALID_PDF_BINARY");
      }
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      if (err instanceof Error && err.message === "CLOUDINARY_PDF_BLOCKED") {
        setDocDownloadError(
          "Cloudinary bloque la livraison PDF (401 ACL). Activez 'Allow delivery of PDF and ZIP files' puis re-uploadez le PDF."
        );
      } else if (err instanceof Error && err.message === "INVALID_PDF_BINARY") {
        setDocDownloadError(
          "Le fichier configuré n'est pas un PDF valide. Merci de re-uploader l'article depuis l'admin."
        );
      } else {
        setDocDownloadError("Téléchargement impossible. Le lien direct va s'ouvrir dans un nouvel onglet.");
        window.open(sourceUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setIsDownloadingDoc(false);
    }
  };

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const updateDocLeadField = <K extends keyof DocLeadFormState>(key: K, value: DocLeadFormState[K]) => {
    setDocLeadForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDocLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!docPopupConfig) return;
    setDocLeadError("");
    setDocDownloadError("");
    setDocLeadStatus("sending");
    try {
      const payload = {
        action: "submitCatalogue",
        nom: docLeadForm.nom.trim(),
        prenom: docLeadForm.prenom.trim(),
        email: docLeadForm.email.trim(),
        telephone: docLeadForm.telephone.trim(),
        entreprise: docLeadForm.entreprise.trim(),
        fonction: docLeadForm.fonction.trim(),
        articleTitle: docPopupConfig.title,
        articleUrl: docPopupConfig.article,
        source: "fabrik-popup-article",
      };
      const res = await gasPost(payload);
      if (!res.ok) {
        throw new Error(res.error || "Envoi impossible.");
      }
      setDocLeadStatus("sent");
      await downloadPopupArticle(docPopupConfig.article, docPopupConfig.title);
    } catch (err) {
      setDocLeadStatus("error");
      setDocLeadError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  const updateField = <K extends keyof FabrikFormState>(key: K, value: FabrikFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const stepTitle = useMemo(() => {
    if (step === 1) return "Étape 1/3 - Parlez-nous de vous";
    if (step === 2) return "Étape 2/3 - Vos motivations";
    return "Étape 3/3 - CV & confirmation";
  }, [step]);

  useEffect(() => {
    let isMounted = true;
    const applyPopupConfig = (config: FabrikDocPopupConfig) => {
      setDocPopupConfig(config);
      setShowDocPopup(
        config.state === "ON" &&
        config.title.length > 0 &&
        config.description.length > 0 &&
        config.article.length > 0
      );
    };

    try {
      const cached = window.localStorage.getItem(FABRIK_DOC_POPUP_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Partial<FabrikDocPopupConfig>;
        const cachedConfig: FabrikDocPopupConfig = {
          title: String(parsed.title || "").trim(),
          description: String(parsed.description || "").trim(),
          article: String(parsed.article || "").trim(),
          state: String(parsed.state || "OFF").toUpperCase() === "ON" ? "ON" : "OFF",
        };
        applyPopupConfig(cachedConfig);
      }
    } catch {
      // Ignore local cache parsing errors.
    }

    const fetchPopupConfig = async () => {
      const res = await gasGet<{
        title?: string;
        description?: string;
        article?: string;
        state?: string;
      }>({ action: "getFabrikPopupConfig" });

      if (!isMounted || !res.ok || !res.data) return;

      const normalized: FabrikDocPopupConfig = {
        title: String(res.data.title || "").trim(),
        description: String(res.data.description || "").trim(),
        article: String(res.data.article || "").trim(),
        state: String(res.data.state || "OFF").toUpperCase() === "ON" ? "ON" : "OFF",
      };

      applyPopupConfig(normalized);
      try {
        window.localStorage.setItem(FABRIK_DOC_POPUP_CACHE_KEY, JSON.stringify(normalized));
      } catch {
        // Ignore localStorage write errors.
      }
    };

    fetchPopupConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  const validateStep = (targetStep: number): string => {
    if (targetStep === 1) {
      if (!formState.prenom.trim() || !formState.nom.trim()) return "Prénom et nom sont obligatoires.";
      if (!formState.email.trim()) return "L'email est obligatoire.";
      if (!formState.fonctionActuelle.trim()) return "La fonction actuelle est obligatoire.";
      if (!formState.ville.trim()) return "La ville est obligatoire.";
      if (!formState.experienceRh) return "Merci de sélectionner vos années d'expérience RH.";
      if (!formState.secteurActivite.trim()) return "Le secteur d'activité est obligatoire.";
      if (formState.domainesInteret.length === 0) return "Sélectionnez au moins un domaine d'expertise RH.";
      if (formState.domainesInteret.includes("Autres") && !formState.autresDomaine.trim()) {
        return "Merci de préciser votre domaine 'Autres'.";
      }
    }

    if (targetStep === 2) {
      if (!formState.roleSouhaite) return "Merci de sélectionner votre rôle.";
      if (!formState.motivation.trim()) return "Expliquez pourquoi vous souhaitez rejoindre la communauté.";
      if (!formState.sujetsInteret.trim()) return "Indiquez les sujets qui vous intéressent.";
      if (!formState.contenuRh) return "Merci d'indiquer si vous avez déjà produit du contenu RH.";
    }

    if (targetStep === 3) {
      if (!formState.cvUrl.trim() && !cvFile) return "Ajoutez un CV (fichier ou lien).";
      if (!formState.consentement) return "Le consentement est obligatoire pour soumettre votre candidature.";
    }

    return "";
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage("");
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrev = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const uploadCvViaXhr = (endpoint: string, file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);
      xhr.responseType = "json";

      xhr.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        const pct = Math.round((event.loaded / event.total) * 100);
        setCvUploadProgress(pct);
      };

      xhr.onerror = () => reject(new Error("Erreur reseau durant l'upload du CV."));
      xhr.onload = () => {
        const body = xhr.response || {};
        if (xhr.status >= 200 && xhr.status < 300) {
          const url = body.secure_url || body.url || "";
          if (url) resolve(url);
          else reject(new Error("Cloudinary a repondu sans URL de CV."));
          return;
        }
        const apiMessage = body?.error?.message || `Cloudinary HTTP ${xhr.status}`;
        reject(new Error(apiMessage));
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_RAW_UPLOAD_PRESET);
      formData.append("folder", "deo-conseil/fabrik-rh/cv");
      formData.append("use_filename", "true");
      formData.append("unique_filename", "true");
      xhr.send(formData);
    });
  };

  const uploadCvToCloudinary = async (file: File): Promise<string> => {
    const endpoints = [
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    ];

    let lastError: Error | null = null;
    for (const endpoint of endpoints) {
      try {
        return await uploadCvViaXhr(endpoint, file);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("Upload Cloudinary CV impossible.");
      }
    }
    throw lastError || new Error("Upload Cloudinary CV impossible.");
  };

  const handleCvFileChange = async (file: File | null, resetInput?: () => void) => {
    const requestId = ++cvUploadRequestId.current;
    setErrorMessage("");
    setUploadedCvUrl("");
    setCvUploadProgress(0);
    setCvUploadStatus("idle");

    if (!file) {
      setCvFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Le fichier CV depasse 5 Mo.");
      if (resetInput) resetInput();
      setCvFile(null);
      return;
    }

    setCvFile(file);
    setCvUploadStatus("uploading");
    try {
      const url = await uploadCvToCloudinary(file);
      if (requestId !== cvUploadRequestId.current) return;
      setUploadedCvUrl(url);
      setCvUploadStatus("uploaded");
      setCvUploadProgress(100);
    } catch (err) {
      if (requestId !== cvUploadRequestId.current) return;
      setCvUploadStatus("error");
      setCvUploadProgress(0);
      setCvFile(null);
      if (resetInput) resetInput();
      setErrorMessage(err instanceof Error ? err.message : "Upload du CV impossible.");
    }
  };

  const handleSubmit = async () => {
    const validationError = validateStep(3);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");

    try {
      setStatus("sending");
      const domaines = formState.domainesInteret.includes("Autres")
        ? [...formState.domainesInteret.filter((d) => d !== "Autres"), `Autres: ${formState.autresDomaine.trim()}`]
        : formState.domainesInteret;
      const typedCvUrl = formState.cvUrl.trim();
      const finalCvUrl = (cvFile ? uploadedCvUrl : "") || typedCvUrl;
      if (cvFile && cvUploadStatus === "uploading") {
        throw new Error("Upload du CV en cours. Merci d'attendre.");
      }
      if (!finalCvUrl) {
        throw new Error("Le CV n'a pas pu etre stocke sur Cloudinary.");
      }

      const payload = {
        action: "submitFabrikRH",
        prenom: formState.prenom.trim(),
        nom: formState.nom.trim(),
        email: formState.email.trim(),
        telephone: formState.telephone.trim(),
        ville: formState.ville.trim(),
        fonctionActuelle: formState.fonctionActuelle.trim(),
        experienceRh: formState.experienceRh,
        secteurActivite: formState.secteurActivite.trim(),
        domainesExpertise: domaines.join(" | "),
        roleSouhaite: formState.roleSouhaite,
        motivation: formState.motivation.trim(),
        sujetsInteret: formState.sujetsInteret.trim(),
        contenuRh: formState.contenuRh,
        lienReference: formState.lienReference.trim(),
        linkedin: formState.linkedin.trim(),
        cvUrl: finalCvUrl,
        cvFileName: cvFile?.name || "",
        consentement: formState.consentement ? "Oui" : "Non",
        entreprise: formState.secteurActivite.trim(),
        fonction: formState.fonctionActuelle.trim(),
        interet: formState.sujetsInteret.trim(),
        source: "fabrik-page-3-etapes",
      };

      const res = await gasPost(payload);
      if (!res.ok) {
        throw new Error(res.error || "Envoi impossible.");
      }

      setStatus("sent");
      setStep(3);
      setFormState(initialFormState);
      setCvFile(null);
      setCvUploadStatus("idle");
      setCvUploadProgress(0);
      setUploadedCvUrl("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <>
      {showDocPopup && docPopupConfig && (
        <div
          className="fabrik-doc-popup-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDocPopup();
            }
          }}
        >
          <div className="fabrik-doc-popup" role="dialog" aria-modal="true" aria-label="Publication Fabrik RH">
            <button
              type="button"
              className="fabrik-doc-popup-close"
              onClick={closeDocPopup}
              aria-label="Fermer"
            >
              ×
            </button>
            <img src={FABRIK_LOGO} alt="Logo La Fabrik RH" className="fabrik-doc-popup-logo" />
            <h3>{docPopupConfig.title}</h3>
            <p>{docPopupConfig.description}</p>
            {docLeadStatus === "sent" ? (
              <>
                <p style={{ marginTop: "12px" }}>
                  Merci. Le téléchargement va démarrer automatiquement.
                </p>
                <button
                  type="button"
                  className="fabrik-doc-popup-btn"
                  onClick={() => downloadPopupArticle(docPopupConfig.article, docPopupConfig.title)}
                  disabled={isDownloadingDoc}
                >
                  {isDownloadingDoc ? "Téléchargement..." : "Retélécharger l'article PDF"}
                </button>
              </>
            ) : (
              <form onSubmit={handleDocLeadSubmit} style={{ marginTop: "18px" }}>
                <div className="modal-row-2">
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="Nom"
                    className="modal-input"
                    value={docLeadForm.nom}
                    onChange={(e) => updateDocLeadField("nom", e.target.value)}
                  />
                  <input
                    type="text"
                    name="prenom"
                    required
                    placeholder="Prénom"
                    className="modal-input"
                    value={docLeadForm.prenom}
                    onChange={(e) => updateDocLeadField("prenom", e.target.value)}
                  />
                </div>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Téléphone"
                  className="modal-input"
                  value={docLeadForm.telephone}
                  onChange={(e) => updateDocLeadField("telephone", e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail"
                  className="modal-input"
                  value={docLeadForm.email}
                  onChange={(e) => updateDocLeadField("email", e.target.value)}
                />
                <input
                  type="text"
                  name="entreprise"
                  placeholder="Entreprise"
                  className="modal-input"
                  value={docLeadForm.entreprise}
                  onChange={(e) => updateDocLeadField("entreprise", e.target.value)}
                />
                <input
                  type="text"
                  name="fonction"
                  placeholder="Fonction"
                  className="modal-input"
                  value={docLeadForm.fonction}
                  onChange={(e) => updateDocLeadField("fonction", e.target.value)}
                />
                <button type="submit" className="fabrik-doc-popup-btn" disabled={docLeadStatus === "sending" || isDownloadingDoc}>
                  {docLeadStatus === "sending" ? "Envoi..." : (isDownloadingDoc ? "Téléchargement..." : "Télécharger l'article PDF")}
                </button>
              </form>
            )}
            {(docLeadError || docDownloadError) && <p className="fabrik-popup-error">{docLeadError || docDownloadError}</p>}
          </div>
        </div>
      )}

      <div className="page-fabrik-v2">
        {/* ═══ HERO BANNER ═══ */}
        <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
          <div className="page-hero__overlay"></div>
          <div className="page-hero__content">
            <span className="page-hero__tag">THINK TANK · DEO CONSEIL</span>
            <h1>La Fabrik <em>RH</em></h1>
            <p>A l'ère de la fonction RH réinventée : réfléchir, coconstruire, vulgariser, incarner.</p>
            <div className="page-hero__accent"></div>
          </div>
        </div>

        {/* ═══ INTRO — fond cream ═══ */}
        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">COMMUNAUTÉ RH · INNOVATION · LEADERSHIP</span>
            <h2 className="pi-title">Qu'est-ce que la <span className="pi-red">Fabrik RH</span> ?</h2>
            <p className="pi-text">La Fabrik RH est le think tank de DEO Conseil. C'est aussi fabriquer une pensée RH nouvelle, adaptée aux réalités du terrain et aux mutations du monde du travail.</p>
            <p className="pi-text">Positionnement : ce que nous sommes et ne sommes pas. Pas un club, pas une association, pas une structure fermée, pas un événement isolé. Un réseau d'experts et de passionnés, ouvert, inclusif et en mouvement, au service des dynamiques humaines et de la création de valeur durable.</p>
          </div>
        </section>

        {/* Séparateur */}
        <div className="section-separator">
          <div className="sep-line sep-line--red"></div>
          <div className="sep-line sep-line--red" style={{ opacity: 0.4 }}></div>
          <div className="sep-line sep-line--red" style={{ opacity: 0.15 }}></div>
        </div>

        {/* ═══ PILIERS — ACCORDÉON ═══ */}
        <section className="fabrik-vuca">
          <div className="fabrik-vuca__bg-text">FABRIK</div>
          <div className="fabrik-vuca__inner">
            <div className="fabrik-vuca__header">
              <span className="fabrik-vuca__tag">QUE VOULONS NOUS ADRESSER ?</span>
              <h2 className="fabrik-vuca__title">Notre <em>ADN</em></h2>
              <div className="fabrik-vuca__title-line"></div>
            </div>

            {/* Accordéon */}
            <div className="fabrik-accordion">
              {piliers.map((p, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`fabrik-accordion__item ${isOpen ? "fabrik-accordion__item--open" : ""}`}
                    style={{ "--acc-accent": p.accent } as React.CSSProperties}
                  >
                    <button
                      className="fabrik-accordion__header"
                      onClick={() => toggleItem(i)}
                      aria-expanded={isOpen}
                    >
                      <span className="fabrik-accordion__num fabrik-number-emphasis">{p.num}</span>
                      <span className="fabrik-accordion__title">{p.title}</span>
                      <span className="fabrik-accordion__icon">+</span>
                    </button>
                    <div className="fabrik-accordion__body">
                      <div className="fabrik-accordion__body-inner">
                        <p>{p.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGE 4 — POSITIONNEMENT (cartes) */}
            <div className="pi-grid pi-grid--4" style={{ marginTop: "28px" }}>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✗</div>
                <h4>Pas un club</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✗</div>
                <h4>Pas une association</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✗</div>
                <h4>Pas une structure fermée</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✗</div>
                <h4>Pas un événement isolé</h4>
              </div>
            </div>
            <div className="pi-grid pi-grid--4" style={{ marginTop: "14px" }}>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Un réseau d'experts et de passionnés</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Au service des dynamiques humaines</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Pour une création de valeur durable</h4>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Ouvert, inclusif et en mouvement</h4>
              </div>
            </div>
          </div>
          <div className="fabrik-vuca__deco-top"></div>
          <div className="fabrik-vuca__deco-bottom"></div>
        </section>

        {/* Séparateur */}
        <div className="section-separator">
          <div className="sep-line sep-line--red" style={{ opacity: 0.15 }}></div>
          <div className="sep-line sep-line--red" style={{ opacity: 0.4 }}></div>
          <div className="sep-line sep-line--red"></div>
        </div>

        {/* ═══ PUBLICATIONS — fond cream ═══ */}
        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">PHILOSOPHIE</span>
            <h2 className="pi-title">Nos <span className="pi-red">convictions</span></h2>
            <div className="pi-grid pi-grid--2">
              <div className="pi-card pi-card--cream pi-card--border-left">
                <h3 className="pi-card-title">01 · Passion & impact durable</h3>
                <p className="pi-card-text">Des professionnels passionnés par l'évolution des organisations et leurs impacts sur les hommes, pour créer de la valeur de manière durable.</p>
              </div>
              <div className="pi-card pi-card--cream pi-card--border-left">
                <h3 className="pi-card-title">02 · Compétences & croissance humaine</h3>
                <p className="pi-card-text">Nous croyons que les compétences feront la différence : faire grandir les hommes fera grandir l'entreprise.</p>
              </div>
              <div className="pi-card pi-card--cream pi-card--border-left">
                <h3 className="pi-card-title">03 · Développement humain & valeur</h3>
                <p className="pi-card-text">Associer développement humain et création de valeur au sein des organisations est une nécessité stratégique.</p>
              </div>
              <div className="pi-card pi-card--cream pi-card--border-left">
                <h3 className="pi-card-title">04-05 · Innovation managériale & digital</h3>
                <p className="pi-card-text">Promouvoir l'innovation en management, installer les soft skills comme prérequis, et faire du digital le moteur des transformations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PAGE 3 — NOS PARTENAIRES (cartes) ═══ */}
        <div className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">QUE VOULONS NOUS ADRESSER ?</span>
            <h2 className="pi-title">Nos <span className="pi-red">partenaires</span></h2>
            <div className="pi-card pi-card--cream pi-card--border-left" style={{ marginBottom: "22px" }}>
              <h3 className="pi-card-title">La Fabrik RH · DEO Conseil</h3>
              <p className="pi-card-text">La Fabrik RH s'appuie sur des partenaires de confiance pour vous accompagner.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 8px" }}>
              <div
                style={{
                  border: "1px solid rgba(200,16,46,0.35)",
                  borderRadius: "20px",
                  background: "#fff",
                  padding: "14px 20px",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
                }}
              >
                <img src={FABRIK_LOGO} alt="La Fabrik RH" style={{ height: "44px", width: "auto", display: "block" }} />
              </div>
            </div>
            <div style={{ width: "2px", height: "26px", background: "rgba(200,16,46,0.45)", margin: "0 auto" }}></div>
            <div style={{ height: "2px", background: "rgba(200,16,46,0.45)", width: "72%", margin: "0 auto 18px" }}></div>
            <div className="pi-grid" style={{ alignItems: "stretch", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {PARTNER_LOGOS.map((partner) => (
                <div
                  key={partner.key}
                  className="pi-card"
                  style={{
                    background: partner.bg,
                    borderRadius: "20px",
                    padding: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "140px",
                  }}
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "84px",
                      width: "auto",
                      height: "auto",
                      display: "block",
                      borderRadius: "20px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ REJOINDRE — fond dark ═══ */}
        <section className="pi-section pi-section--dark" id="rejoindre">
          <div className="pi-inner">
            <span className="pi-tag">CIBLES & AUDIENCES</span>
            <h2 className="pi-title pi-title--white">Nous <span className="pi-red">ciblons</span></h2>
            <p className="pi-text pi-text--light">Directions générales, comités de direction, DRH, start-ups RH, fonds d'investissement, professeurs & chercheurs (universités, écoles privées, académiques et experts en sciences humaines), et professionnels passionnés nationaux & internationaux.</p>
            <div className="pi-grid pi-grid--4" style={{ marginBottom: "32px" }}>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Directions générales</h4>
                <p>Comités de direction & secrétaires généraux.</p>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>DRH</h4>
                <p>Directeurs des Ressources Humaines.</p>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Start-ups RH</h4>
                <p>Innovations & EdTech dans le domaine RH.</p>
              </div>
              <div className="pi-mini-card">
                <div className="pi-mini-icon">✓</div>
                <h4>Fonds d'investissement</h4>
                <p>Impact investing & capital humain.</p>
              </div>
            </div>
            <p className="pi-text pi-text--light" style={{ textAlign: "center" }}>
              Rejoignez la communauté : fabriquons ensemble la RH de demain.
            </p>
          </div>
        </section>
      </div>

      <div id="fabrik-formulaire" className="fabrik-popup-overlay fabrik-popup-overlay--inline">
          <div className="fabrik-popup fabrik-popup--inline">
            <div className="fabrik-popup-brand">LA FABRIK RH</div>
            <h3 className="fabrik-popup-title">Rejoindre la communauté</h3>
            <p className="fabrik-popup-step">{stepTitle}</p>

            {status === "sent" ? (
              <div className="fabrik-popup-success">
                <span className="fabrik-success-icon">✓</span>
                <h4>Candidature envoyée</h4>
                <p>Merci. Votre profil a bien été transmis à notre équipe pour validation.</p>
                <button
                  type="button"
                  className="fabrik-popup-secondary"
                  onClick={() => {
                    setStatus("idle");
                    setStep(1);
                    setErrorMessage("");
                  }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="fabrik-popup-grid">
                    <label className="fabrik-popup-field">
                      <span>Prénom *</span>
                      <input value={formState.prenom} onChange={(e) => updateField("prenom", e.target.value)} placeholder="Votre prénom" />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Nom *</span>
                      <input value={formState.nom} onChange={(e) => updateField("nom", e.target.value)} placeholder="Votre nom" />
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Email *</span>
                      <input type="email" value={formState.email} onChange={(e) => updateField("email", e.target.value)} placeholder="vous@entreprise.com" />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Téléphone</span>
                      <input value={formState.telephone} onChange={(e) => updateField("telephone", e.target.value)} placeholder="+212 6 XX XX XX XX" />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Ville *</span>
                      <input value={formState.ville} onChange={(e) => updateField("ville", e.target.value)} placeholder="Ex : Casablanca" />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Fonction actuelle *</span>
                      <input value={formState.fonctionActuelle} onChange={(e) => updateField("fonctionActuelle", e.target.value)} placeholder="Ex : RRH, DRH, HRBP..." />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Années d'expérience RH *</span>
                      <select value={formState.experienceRh} onChange={(e) => updateField("experienceRh", e.target.value)}>
                        <option value="">Sélectionner</option>
                        {EXPERIENCE_OPTIONS.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Secteur d'activité *</span>
                      <select value={formState.secteurActivite} onChange={(e) => updateField("secteurActivite", e.target.value)}>
                        <option value="">Selectionner votre secteur</option>
                        {SECTEUR_OPTIONS.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <div className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Domaines d'expertise / intérêt RH *</span>
                      <div className="fabrik-popup-check-grid">
                        {DOMAINES_RH.map((domaine) => (
                          <label key={domaine} className="fabrik-popup-check">
                            <input
                              type="checkbox"
                              checked={formState.domainesInteret.includes(domaine)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateField("domainesInteret", [...formState.domainesInteret, domaine]);
                                } else {
                                  updateField("domainesInteret", formState.domainesInteret.filter((d) => d !== domaine));
                                }
                              }}
                            />
                            <span>{domaine}</span>
                          </label>
                        ))}
                      </div>
                      {formState.domainesInteret.includes("Autres") && (
                        <input
                          className="fabrik-popup-inline-input"
                          value={formState.autresDomaine}
                          onChange={(e) => updateField("autresDomaine", e.target.value)}
                          placeholder="Précisez le domaine 'Autres'"
                        />
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="fabrik-popup-grid">
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Vous souhaitez rejoindre en tant que *</span>
                      <select value={formState.roleSouhaite} onChange={(e) => updateField("roleSouhaite", e.target.value)}>
                        <option value="">Sélectionner votre rôle</option>
                        {ROLE_OPTIONS.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Pourquoi souhaitez-vous rejoindre la Fabrik RH ? *</span>
                      <textarea value={formState.motivation} onChange={(e) => updateField("motivation", e.target.value)} placeholder="Exprimez vos motivations..." />
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Quels sujets vous intéressent dans la Fabrik RH ? *</span>
                      <textarea value={formState.sujetsInteret} onChange={(e) => updateField("sujetsInteret", e.target.value)} placeholder="Ex : leadership, talent, engagement, data RH..." />
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Avez-vous déjà produit du contenu RH ? *</span>
                      <select value={formState.contenuRh} onChange={(e) => updateField("contenuRh", e.target.value)}>
                        <option value="">Sélectionner</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </label>
                    <label className="fabrik-popup-field">
                      <span>Lien / référence (optionnel)</span>
                      <input value={formState.lienReference} onChange={(e) => updateField("lienReference", e.target.value)} placeholder="Lien LinkedIn, blog, publication..." />
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="fabrik-popup-grid">
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>LinkedIn (optionnel)</span>
                      <input value={formState.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="https://linkedin.com/in/votre-profil" />
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>Déposez votre CV (PDF, DOC, DOCX - 5Mo max)</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleCvFileChange(file, () => { e.target.value = ""; });
                        }}
                      />
                      {cvFile && <small className="fabrik-popup-file-name">{cvFile.name}</small>}
                      {cvUploadStatus === "uploading" && (
                        <small className="fabrik-popup-file-name">Upload en cours... {cvUploadProgress}%</small>
                      )}
                      {cvUploadStatus === "uploaded" && (
                        <small className="fabrik-popup-file-name">CV uploade avec succes sur Cloudinary.</small>
                      )}
                    </label>
                    <label className="fabrik-popup-field fabrik-popup-field--full">
                      <span>ou lien CV (Drive/Dropbox)</span>
                      <input value={formState.cvUrl} onChange={(e) => updateField("cvUrl", e.target.value)} placeholder="https://..." />
                    </label>
                    <label className="fabrik-popup-consent">
                      <input
                        type="checkbox"
                        checked={formState.consentement}
                        onChange={(e) => updateField("consentement", e.target.checked)}
                      />
                      <span>J'accepte que mes informations soient utilisées par l'équipe Fabrik RH pour évaluer ma candidature et me recontacter.</span>
                    </label>
                  </div>
                )}

                {errorMessage && <p className="fabrik-popup-error">{errorMessage}</p>}

                <div className="fabrik-popup-actions">
                  {step > 1 && (
                    <button type="button" className="fabrik-popup-secondary" onClick={handlePrev}>
                      Retour
                    </button>
                  )}
                  {step < 3 ? (
                    <button type="button" className="fabrik-popup-primary" onClick={handleNext}>
                      Continuer
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="fabrik-popup-primary"
                      onClick={handleSubmit}
                      disabled={status === "sending" || cvUploadStatus === "uploading"}
                    >
                      {status === "sending" ? "Envoi en cours..." : "Soumettre ma candidature"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

      <NewsletterSection />
      <ActualitesSection />
      <SiteFooter />
    </>
  );
}

