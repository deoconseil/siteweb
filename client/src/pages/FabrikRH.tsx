import { useState, FormEvent } from "react";
import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";
import { gasPost } from "@/lib/gas";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-fabrik_1ded06c1.jpg";
const PHOTO_TEAM_MEETING = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-team-meeting_ffa4821d.jpg";
const PHOTO_LEADERSHIP = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-leadership-women_02c59ba8.jpg";

const piliers = [
  {
    num: "01",
    title: "Recherche & Innovation RH",
    text: "Veille permanente sur les pratiques RH mondiales et adaptation au contexte africain et proche-oriental. Nous étudions les tendances émergentes pour aider les organisations à anticiper les mutations.",
    accent: "var(--red)",
  },
  {
    num: "02",
    title: "Outils & Méthodes",
    text: "Développement de frameworks et outils propriétaires testés en conditions réelles depuis plus de 20 ans. Nos méthodes sont pragmatiques, mesurables et adaptées aux organisations africaines.",
    accent: "var(--red)",
  },
  {
    num: "03",
    title: "Communauté RH",
    text: "Un réseau de 1000+ DRH, dirigeants et experts connectés autour des enjeux RH. Nous créons des espaces de dialogue, d'apprentissage et de co-construction.",
    accent: "#888",
  },
  {
    num: "04",
    title: "Publications & Insights",
    text: "Analyses, études, rapports et contenus exclusifs sur les enjeux RH au Maroc, en Afrique et à l'international. Nous partageons notre expertise pour nourrir la réflexion collective.",
    accent: "#888",
  },
];

export default function FabrikRH() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fabrikStatus, setFabrikStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleFabrikSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFabrikStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await gasPost({
        action: "submitFabrikRH",
        prenom: fd.get("prenom") as string || "",
        nom: fd.get("nom") as string || "",
        email: fd.get("email") as string || "",
        telephone: fd.get("telephone") as string || "",
        entreprise: fd.get("entreprise") as string || "",
        fonction: fd.get("fonction") as string || "",
        interet: fd.get("interet") as string || "",
      });
      if (res.ok) {
        setFabrikStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        setFabrikStatus("error");
      }
    } catch {
      setFabrikStatus("error");
    }
  };

  return (
    <>
    <div className="page-fabrik-v2">
      {/* ═══ HERO BANNER ═══ */}
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="page-hero__overlay"></div>
        <div className="page-hero__content">
          <span className="page-hero__tag">THINK TANK</span>
          <h1>La Fabrik <em>RH</em></h1>
          <p>Notre think tank au service de la réflexion et de l'action pour les RH de demain.</p>
          <div className="page-hero__accent"></div>
        </div>
      </div>

      {/* ═══ INTRO — fond cream ═══ */}
      <section className="pi-section pi-section--cream">
        <div className="pi-inner">
          <span className="pi-tag">NOTRE THINK TANK</span>
          <h2 className="pi-title">Qu'est-ce que la <span className="pi-red">Fabrik RH</span> ?</h2>
          <p className="pi-text">La Fabrik RH est le think tank de DEO Conseil. Depuis 2002, nous traitons régulièrement de sujets divers et publions sous différents formats pour prendre des initiatives et mener des études sur les enjeux d'entreprise dans le contexte marocain, africain et international.</p>
          <p className="pi-text">Notre mission : contribuer à l'émergence d'une pensée RH nouvelle, adaptée aux réalités du terrain et aux mutations du monde du travail.</p>
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
            <span className="fabrik-vuca__tag">NOS FONDAMENTAUX</span>
            <h2 className="fabrik-vuca__title">Les piliers de la <em>Fabrik RH</em></h2>
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
                    <span className="fabrik-accordion__num">{p.num}</span>
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

          {/* Stats bar */}
          <div className="fabrik-vuca__stats">
            <div className="fabrik-vuca__stat">
              <span className="fabrik-vuca__stat-num">20<span>+</span></span>
              <span className="fabrik-vuca__stat-label">ans d'expertises</span>
            </div>
            <div className="fabrik-vuca__stat-sep"></div>
            <div className="fabrik-vuca__stat">
              <span className="fabrik-vuca__stat-num">50<span>+</span></span>
              <span className="fabrik-vuca__stat-label">Publications</span>
            </div>
            <div className="fabrik-vuca__stat-sep"></div>
            <div className="fabrik-vuca__stat">
              <span className="fabrik-vuca__stat-num">1000<span>+</span></span>
              <span className="fabrik-vuca__stat-label">Experts connectés</span>
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
          <span className="pi-tag">NOS FORMATS</span>
          <h2 className="pi-title">Publications & <span className="pi-red">Formats</span></h2>
          <div className="pi-grid pi-grid--2">
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Articles & Éditos</h3>
              <p className="pi-card-text">Analyses approfondies sur les tendances RH, le leadership, la transformation organisationnelle et les enjeux du monde du travail.</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Études & Rapports</h3>
              <p className="pi-card-text">Recherches quantitatives et qualitatives sur des sujets spécifiques (engagement, culture, transformation digitale, etc.).</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Webinaires & Conférences</h3>
              <p className="pi-card-text">Sessions d'apprentissage et d'échange avec experts, dirigeants et praticiens du terrain.</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Podcasts & Vidéos</h3>
              <p className="pi-card-text">Contenus audio et vidéo pour explorer les enjeux RH de manière accessible et engageante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PHOTO IMMERSIVE FABRIK RH ═══ */}
      <div className="fabrik-photo-immersive">
        <div className="fabrik-photo-immersive__img-wrap">
          <img src={PHOTO_LEADERSHIP} alt="Communauté Fabrik RH" />
        </div>
        <div className="fabrik-photo-immersive__content">
          <div className="fabrik-photo-immersive__tag">COMMUNAUTÉ FABRIK RH</div>
          <h2 className="fabrik-photo-immersive__title">1 000<span>+</span><br />experts connectés</h2>
          <p className="fabrik-photo-immersive__text">
            DRH, dirigeants, consultants et experts RH du Maroc, d'Afrique et d'Europe
            — unis autour d'une vision commune du capital humain.
          </p>
          <a href="#contact" className="fabrik-photo-immersive__btn">Rejoindre la communauté →</a>
        </div>
      </div>

      {/* ═══ REJOINDRE — fond dark ═══ */}
      <section className="pi-section pi-section--dark" id="rejoindre">
        <div className="pi-inner">
          <span className="pi-tag">COMMUNAUTÉ</span>
          <h2 className="pi-title pi-title--white">Rejoignez la <span className="pi-red">Communauté</span> Fabrik RH</h2>
          <p className="pi-text pi-text--light">Que vous soyez DRH, dirigeant, consultant ou expert en RH, la Fabrik RH vous offre un espace pour apprendre, partager et co-créer les pratiques RH de demain.</p>
          <div className="pi-grid pi-grid--4" style={{marginBottom: '48px'}}>
            <div className="pi-mini-card">
              <div className="pi-mini-icon">✓</div>
              <h4>Accès aux publications</h4>
              <p>Articles, études et rapports exclusifs</p>
            </div>
            <div className="pi-mini-card">
              <div className="pi-mini-icon">✓</div>
              <h4>Réseau d'experts</h4>
              <p>Connectez-vous avec d'autres praticiens</p>
            </div>
            <div className="pi-mini-card">
              <div className="pi-mini-icon">✓</div>
              <h4>Événements & Webinaires</h4>
              <p>Sessions d'apprentissage régulières</p>
            </div>
            <div className="pi-mini-card">
              <div className="pi-mini-icon">✓</div>
              <h4>Outils & Ressources</h4>
              <p>Frameworks et templates à utiliser</p>
            </div>
          </div>

          {/* Formulaire d'inscription */}
          {fabrikStatus === "sent" ? (
            <div className="fabrik-form-success">
              <span className="fabrik-success-icon">✓</span>
              <h3>Bienvenue dans la communauté !</h3>
              <p>Votre demande a bien été reçue. Notre équipe vous contactera sous 48h.</p>
            </div>
          ) : (
            <form className="fabrik-join-form" onSubmit={handleFabrikSubmit}>
              <div className="fabrik-form-row">
                <div className="fabrik-form-group">
                  <label>Prénom *</label>
                  <input type="text" name="prenom" required placeholder="Votre prénom" />
                </div>
                <div className="fabrik-form-group">
                  <label>Nom *</label>
                  <input type="text" name="nom" required placeholder="Votre nom" />
                </div>
              </div>
              <div className="fabrik-form-row">
                <div className="fabrik-form-group">
                  <label>Email professionnel *</label>
                  <input type="email" name="email" required placeholder="votre@entreprise.com" />
                </div>
                <div className="fabrik-form-group">
                  <label>Téléphone</label>
                  <input type="tel" name="telephone" placeholder="+212 6 XX XX XX XX" />
                </div>
              </div>
              <div className="fabrik-form-row">
                <div className="fabrik-form-group">
                  <label>Entreprise / Organisation</label>
                  <input type="text" name="entreprise" placeholder="Nom de votre organisation" />
                </div>
                <div className="fabrik-form-group">
                  <label>Fonction</label>
                  <input type="text" name="fonction" placeholder="DRH, Dirigeant, Consultant…" />
                </div>
              </div>
              <div className="fabrik-form-group">
                <label>Centre d'intérêt principal</label>
                <select name="interet">
                  <option value="">Sélectionner un domaine</option>
                  <option value="Leadership & Management">Leadership & Management</option>
                  <option value="Transformation RH">Transformation RH</option>
                  <option value="Assessment & Coaching">Assessment & Coaching</option>
                  <option value="Formation & Développement">Formation & Développement</option>
                  <option value="Culture & Engagement">Culture & Engagement</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <button type="submit" className="fabrik-form-submit" disabled={fabrikStatus === "sending"}>
                {fabrikStatus === "sending" ? "Envoi en cours…" : "Rejoindre la Fabrik RH →"}
              </button>
              {fabrikStatus === "error" && <p className="fabrik-form-error">Échec de l'envoi. Réessayez ou contactez-nous directement.</p>}
            </form>
          )}
        </div>
      </section>
    </div>
    <NewsletterSection />
    <ActualitesSection />
    <SiteFooter />
    </>
  );
}
