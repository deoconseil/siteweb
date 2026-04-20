import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { poles } from "./Expertises";
import { gasGet } from "@/lib/gas";

/* ── Accordion Programmes (section Home) ── */
const PROG_PANELS = [
  { num: "01", category: "LEADERSHIP", title: "Leadership & Transformation", text: "Piloter les grands chantiers, inspirer les équipes.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" },
  { num: "02", category: "ENGAGEMENT", title: "Engagement & Performance Collective", text: "Répondre au défi de la productivité.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" },
  { num: "03", category: "SOFT SKILLS", title: "Soft Skills Critiques", text: "Les compétences du 21e siècle.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
  { num: "04", category: "MANAGEMENT", title: "Management de la Complexité", text: "Piloter les projets transverses et pluri-acteurs.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80" },
  { num: "05", category: "ÉQUILIBRE HUMAIN", title: "Bien-être & Qualité de Vie au Travail", text: "Performance durable, réduction du turnover.", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=900&q=80" },
];

/* ── Vos Enjeux RH — Sliding Cards ── */
const RH_CARDS = [
  { num: "01", tag: "Culture & engagement", index: "Enjeu 01", title: "Engagement et fidélisation des collaborateurs" },
  { num: "02", tag: "Leadership", index: "Enjeu 02", title: "Leadership authentique et transformationnel au service de l'ambition de votre organisation" },
  { num: "03", tag: "Soft skills", index: "Enjeu 03", title: "Développement des Soft Skills critiques : communication, créativité, coopération, pensée critique" },
  { num: "04", tag: "Organisation", index: "Enjeu 04", title: "Management de la complexité et de la transversalité" },
  { num: "05", tag: "Équilibre humain", index: "Enjeu 05", title: "Santé, bien-être et intelligence émotionnelle" },
];

function VosEnjeuxRH() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: number) => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector('.rh-card') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 420;
    railRef.current.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 900) return;
      if (rail.scrollWidth <= rail.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      rail.scrollBy({ left: e.deltaY * 1.15, behavior: 'smooth' });
    };
    rail.addEventListener('wheel', handleWheel, { passive: false });
    return () => rail.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="rh-page">
      <section className="rh-shell">
        <header className="rh-header">
          <p className="rh-kicker">UP-SKILLING · RE-SKILLING</p>
          <h2 className="rh-title">VOS ENJEUX RH</h2>
        </header>
        <div className="rh-controls">
          <button className="rh-btn" aria-label="Carte précédente" onClick={() => scrollByCard(-1)}>←</button>
          <button className="rh-btn" aria-label="Carte suivante" onClick={() => scrollByCard(1)}>→</button>
        </div>
        <div className="rh-rail-wrap">
          <div className="rh-rail" ref={railRef}>
            {RH_CARDS.map((c, i) => (
              <article key={i} className={`rh-card${i === 0 ? ' rh-card--first' : ''}`}>
                <div className="rh-progress">{c.num} / 05</div>
                <div className="rh-watermark">{c.num}</div>
                <div className="rh-small">{c.tag}</div>
                <div className="rh-index">{c.index}</div>
                <div className="rh-node-line">
                  <div className="rh-node"></div>
                  <div className="rh-stroke"></div>
                </div>
                <h3 className="rh-panel-title">{c.title}</h3>
              </article>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

function HomeProgrammesAccordion() {
  const [active, setActive] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 980;
  return (
    <section className="home-prog-section">
      <div className="home-prog-inner">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/capskills-light-transparent_3a9c59ec.png"
          alt="CapSkills — Empowering people"
          style={{height:'80px', width:'auto', display:'block', marginBottom:'8px'}}
        />
        <h2 className="services-v2-title" style={{color:'#1a1a1a', marginTop:'12px'}}>PROGRAMMES<br/><span style={{color:'#C8102E'}}>SUR MESURE.</span></h2>
        <p className="services-v2-intro" style={{color:'#888888'}}>5 axes thématiques conçus pour répondre aux enjeux concrets des organisations marocaines et africaines.</p>
        <div className="home-prog-accordion">
          {PROG_PANELS.map((p, i) => (
            <article
              key={i}
              className={`home-prog-panel${active === i ? ' active' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 980) setActive(i); }}
              onClick={() => setActive(i)}
            >
              <img className="home-prog-panel-img" src={p.image} alt={p.title} />
              <div className="home-prog-panel-overlay" />
              <div className="home-prog-panel-inner">
                <div className="home-prog-panel-num">{p.num}</div>
                <div className="home-prog-panel-cat">{p.category}</div>
                <h3 className="home-prog-panel-title-v">{p.title}</h3>
                <div className="home-prog-panel-content">
                  <h3 className="home-prog-panel-title">{p.title}</h3>
                  <p className="home-prog-panel-text">{p.text}</p>
                  <a href={`/programmes-sur-mesure#prog-${p.num}`} className="home-prog-panel-link">Découvrir →</a>
                </div>
              </div>
              {i < PROG_PANELS.length - 1 && <div className="home-prog-panel-rail" />}
            </article>
          ))}
        </div>
        <div className="home-prog-cta">
          <a href="/programmes-sur-mesure" className="pi-btn pi-btn--red">Voir tous les programmes →</a>
        </div>
      </div>
    </section>
  );
}
import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";

/* ── Google Analytics & Hotjar ── */
if (typeof window !== 'undefined') {
  // Google Analytics
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(gaScript);
  (window as any).dataLayer = (window as any).dataLayer || [];
  const gtag = (...args: any[]) => { (window as any).dataLayer.push(args); };
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  // Note: Replace G-XXXXXXXXXX with your actual Google Analytics ID
  (window as any).gtag = gtag;

  // Hotjar
  const hjScript = document.createElement('script');
  hjScript.async = true;
  hjScript.src = 'https://static.hotjar.com/c/hotjar-XXXXXXXXX.js?sv=6';
  document.head.appendChild(hjScript);
}

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/hero-woman_5038af7f.jpg";
const PHOTO_LEADERSHIP = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-leadership-women_02c59ba8.jpg";
const PHOTO_TRAINING = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-training-2_9b973402.jpg";
const PHOTO_BOARDROOM = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-boardroom_a2961e27.jpg";
const PHOTO_TEAM = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-team-diverse_8556497f.jpg";

/* ── Bot responses for chatbot ── */
const botResponses: Record<string, string> = {
  "vos services rh":
    "DEO Conseil propose 5 domaines d'expertise : Recrutement & Chasse, Développement des Talents, Formation & Coaching, Conseil en Organisation RH et Assessment. Quel sujet vous intéresse ?",
  "recrutement cadres":
    "Nous recrutons des profils cadres et dirigeants depuis 2002 — au Maroc et à l'international. Notre réseau couvre +15 pays en Afrique et en Europe. Vous avez un poste à pourvoir ?",
  "prendre un rdv":
    "Pour planifier un échange avec l'un de nos consultants, vous pouvez nous contacter directement :\n📞 +212 522 94 42 74 / +212 522 94 42 77\n📨 WhatsApp : +212 6 64 02 26 30\n📧 contact@deoconseil.com\n📍 37 Rue Jalal Eddine Sayouti, Rés. Malika, 3ème étage, App. 16, Casablanca\nOu utilisez le formulaire en bas de cette page.",
  "le catalogue":
    "Notre catalogue CapSkills 2024-2025 présente l'ensemble de nos formations et programmes RH. Je vous invite à le télécharger via le bouton rouge en haut de page !",
  default:
    "Merci pour votre message. Un consultant DEO Conseil vous répondra très prochainement. Vous pouvez aussi nous appeler au +212 522 94 42 74 ou +212 522 94 42 77.",
};

export default function Home() {
  /* ── State ── */
  const [openAdn, setOpenAdn] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; type: "bot" | "user"; time: string }[]>([
    { text: "Bonjour 👋 Je suis l'assistant DEO Conseil. Comment puis-je vous aider aujourd'hui ?", type: "bot", time: "maintenant" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const [jamalExpanded, setJamalExpanded] = useState(false);
  // Compteurs hero
  const [heroStats, setHeroStats] = useState({ entreprises: 0, cadres: 0, formes: 0, evalues: 0 });
  const [heroAnimated, setHeroAnimated] = useState(false);
  const heroStatsRef = useRef<HTMLDivElement>(null);
  // Compteurs différenciation
  const [diffStats, setDiffStats] = useState({ entreprises: 0, cadres: 0, formes: 0, evalues: 0 });
  const [diffAnimated, setDiffAnimated] = useState(false);
  const diffStatsRef = useRef<HTMLDivElement>(null);
  // Compteurs références
  const [refsStats, setRefsStats] = useState({ entreprises: 0, cadres: 0, formes: 0, evalues: 0 });
  const [refsAnimated, setRefsAnimated] = useState(false);
  const refsStatsRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  // Références logos dynamiques
  const [refsRow1, setRefsRow1] = useState<string[]>(["OCP", "CDG", "SCR", "Renault Group", "Orange", "BMCI-BNP Paribas", "Société Générale", "Bank of Africa", "TotalEnergies", "Air Liquide", "Centrale Danone", "Akwa Group", "Nexans"]);
  const [refsRow2, setRefsRow2] = useState<string[]>(["Sonasid", "NABC", "CGI", "Majorel", "Lydec", "Al Barid Bank", "Saham Assurance", "Maroc PME", "Nareva", "Ministère de l'Industrie", "Ministère des Affaires Étrangères", "Direction Générale des Impôts", "UIR", "Madaef (Groupe CDG)"]);
  const [refsLogos, setRefsLogos] = useState<{nom: string; logo: string}[]>([]);
  // Blog posts dynamiques depuis GAS (3 derniers)
  const [blogPosts, setBlogPosts] = useState<{slug: string; titre: string; auteur: string; date: string; categorie: string; extrait: string; image: string}[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setShowNotif(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const handleScroll = () => {
      // Hero stats
      if (heroStatsRef.current && !heroAnimated) {
        const rect = heroStatsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHeroAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setHeroStats({
              entreprises: Math.floor(250 * progress),
              cadres: Math.floor(1500 * progress),
              formes: Math.floor(25000 * progress),
              evalues: Math.floor(100000 * progress),
            });
            if (progress === 1) clearInterval(interval);
          }, 30);
        }
      }
      // Diff stats
      if (diffStatsRef.current && !diffAnimated) {
        const rect = diffStatsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setDiffAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setDiffStats({
              entreprises: Math.floor(250 * progress),
              cadres: Math.floor(1500 * progress),
              formes: Math.floor(25000 * progress),
              evalues: Math.floor(100000 * progress),
            });
            if (progress === 1) clearInterval(interval);
          }, 30);
        }
      }
      // Refs stats
      if (refsStatsRef.current && !refsAnimated) {
        const rect = refsStatsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setRefsAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setRefsStats({
              entreprises: Math.floor(250 * progress),
              cadres: Math.floor(1500 * progress),
              formes: Math.floor(25000 * progress),
              evalues: Math.floor(100000 * progress),
            });
            if (progress === 1) clearInterval(interval);
          }, 30);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immédiatement pour les éléments visibles au chargement
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroAnimated, diffAnimated, refsAnimated]);

  // Fetch références logos depuis GAS
  useEffect(() => {
    const fetchRefs = async () => {
      try {
        const res = await gasGet<{id: string; nom: string; logo: string; actif: boolean}[]>({ action: "getReferences" });
        if (res.ok && res.data && res.data.length > 0) {
          const actifs = res.data.filter(r => r.actif);
          if (actifs.length > 0) {
            setRefsLogos(actifs.map(r => ({ nom: r.nom, logo: r.logo })));
            // Répartir les logos actifs en 2 rangées
            const mid = Math.ceil(actifs.length / 2);
            setRefsRow1(actifs.slice(0, mid).map(r => r.nom));
            setRefsRow2(actifs.slice(mid).map(r => r.nom));
          }
        }
      } catch {
        // Garder les noms statiques en cas d'erreur
      }
    };
    fetchRefs();
  }, []);

  // Fetch blog posts depuis GAS (3 derniers)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await gasGet<{slug: string; titre: string; auteur: string; date: string; categorie: string; extrait: string; image: string; publie: boolean}[]>({ action: "getBlog" });
        if (res.ok && res.data && res.data.length > 0) {
          const published = res.data.filter(a => a.publie);
          if (published.length > 0) {
            setBlogPosts(published.slice(0, 3));
          }
        }
      } catch {
        // Garder les articles statiques en cas d'erreur
      }
    };
    fetchBlog();
  }, []);
  // Micro-animations au scroll (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getTime = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const botReply = useCallback((userText: string) => {
    setIsTyping(true);
    const lower = userText.toLowerCase();
    let reply = botResponses['default'];
    for (const key of Object.keys(botResponses)) {
      if (key !== 'default' && lower.includes(key)) {
        reply = botResponses[key];
        break;
      }
    }
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [...prev, { text: reply, type: "bot", time: getTime() }]);
    }, 600 + Math.random() * 400);
  }, []);

  const sendMessage = useCallback(() => {
    const text = chatInput.trim();
    if (!text) return;
    setShowSuggestions(false);
    setChatMessages((prev) => [...prev, { text, type: "user", time: getTime() }]);
    setChatInput("");
    botReply(text);
  }, [chatInput, botReply]);

  const sendSugg = useCallback(
    (text: string) => {
      setShowSuggestions(false);
      setChatMessages((prev) => [...prev, { text, type: "user", time: getTime() }]);
      botReply(text);
    },
    [botReply]
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  /* ── Contact form state ── */
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const prenom = fd.get("prenom") as string || "";
    const nom = fd.get("nom") as string || "";
    const email = fd.get("email") as string || "";
    const telephone = fd.get("telephone") as string || "";
    const entreprise = fd.get("entreprise") as string || "";
    const message = fd.get("message") as string || "";
    try {
      const { gasPost } = await import("@/lib/gas");
      const res = await gasPost({
        action: "submitContact",
        prenom, nom, email, telephone, entreprise, message,
        source: "home",
      });
      if (res.ok) {
        setContactStatus("sent");
        form.reset();
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };


  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav>
        <div className="nav-topbar">
          <div className="topbar-socials">
            <a href="https://www.linkedin.com/company/deo-conseil" target="_blank" rel="noreferrer" className="s-li" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/deoconseil" target="_blank" rel="noreferrer" className="s-ig" title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/deoconseil" target="_blank" rel="noreferrer" className="s-fb" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <a href="tel:+212522944274">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +212 (0)5 22 94 42 74
          </a>
          <a href="tel:+212522944277">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +212 (0)5 22 94 42 77
          </a>
          <a href="https://wa.me/212664022630" target="_blank" rel="noreferrer" className="topbar-whatsapp">
            <svg viewBox="0 0 24 24" fill="#25D366" style={{width:14,height:14}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +212 6 64 02 26 30
          </a>
          <a href="mailto:contact@deoconseil.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            contact@deoconseil.com
          </a>
        </div>
        <div className="nav-main">
          <a href="#" className="nav-logo">
            <img src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png" alt="DEO Conseil" />
          </a>
          <ul className="nav-links">
            <li><a href="/notre-adn">Notre ADN</a></li>
            <li><a href="/expertises">Expertises</a></li>
            <li><a href="/programmes-sur-mesure">Programmes</a></li>
            <li><a href="/fabrik-rh">La Fabrik RH</a></li>
            <li><a href="/blog">Blog DEO</a></li>
          </ul>
          <div className="nav-right">
            <button className="nav-cta-outline" onClick={(e) => { e.preventDefault(); openModal(); }}>↓ Catalogue</button>
            <a href="#contact" className="nav-cta">Parlons-en</a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <a href="/notre-adn" onClick={() => setMobileOpen(false)}>Notre ADN</a>
            <a href="/expertises" onClick={() => setMobileOpen(false)}>Expertises</a>
            <a href="/programmes-sur-mesure" onClick={() => setMobileOpen(false)}>Programmes</a>
            <a href="/fabrik-rh" onClick={() => setMobileOpen(false)}>La Fabrik RH</a>
            <a href="/blog" onClick={() => setMobileOpen(false)}>Blog DEO</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          </div>
        )}
      </nav>
      {/* ═══ HERO ═══ */}
      <section className="hero animate-fade" id="accueil">
        <div className="hero-badge">Cabinet de Conseil RH — Fondé en 2002</div>
        <div className="hero-main-text">
          <h1 className="hero-peoplefirst">PEOPLE <em>FIRST.</em></h1>
          <div className="hero-slogan">« Faire grandir les hommes &amp; les organisations. »</div>
        </div>
        <div className="hero-stats" ref={heroStatsRef}>
          <div>
            <div className="hero-stat-num c-red">{heroStats.entreprises}+</div>
            <div className="hero-stat-lbl">Entreprises</div>
          </div>
          <div>
            <div className="hero-stat-num c-red">{heroStats.cadres >= 1000 ? (heroStats.cadres / 1000).toFixed(1) + 'K' : heroStats.cadres}+</div>
            <div className="hero-stat-lbl">Cadres coachés</div>
          </div>
          <div>
            <div className="hero-stat-num c-red">{heroStats.formes >= 1000 ? Math.floor(heroStats.formes / 1000) + 'K' : heroStats.formes}+</div>
            <div className="hero-stat-lbl">Collaborateurs formés</div>
          </div>
          <div>
            <div className="hero-stat-num c-red">{heroStats.evalues >= 1000 ? Math.floor(heroStats.evalues / 1000) + 'K' : heroStats.evalues}+</div>
            <div className="hero-stat-lbl">Collaborateurs évalués</div>
          </div>
        </div>
        <div className="hero-btns">
          <a href="#services" className="hero-btn-primary">Nos expertises →</a>
          <a href="#contact" className="hero-btn-secondary">Parlons-en →</a>
        </div>
        <img className="hero-woman" src={HERO_IMG} alt="DEO Conseil — People First" />
        <div className="hero-accent"></div>
      </section>

      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ JAMAL — SECTION EDITORIALE ═══ */}
      <section className="jamal-v3" id="jamal">
        {/* Déco arrière-plan */}
        <div className="jv3-bg-text" aria-hidden="true">PEOPLE FIRST</div>
        <div className="jv3-deco-corner" aria-hidden="true"></div>
        <div className="jv3-deco-line-h" aria-hidden="true"></div>

        <div className="jv3-inner">
          {/* Rangée 1 : Grand titre + photo */}
          <div className="jv3-hero-row">
            <div className="jv3-hero-left reveal-left">
              <div className="jv3-tag">JAMAL BELAHRACH</div>
              <h2 className="jv3-title">
                ENSEMBLE,<br />
                NOUS POUVONS <em>RELEVER</em><br />
                <span className="jv3-title-lime">LE DÉFI DES</span><br />
                COMPÉTENCES
              </h2>
              <div className="jv3-title-underline"></div>
            </div>
            <div className="jv3-hero-right reveal-right">
              <div className="jv3-photo-container">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/jamal_nobg_new_8b52a9a9.png"
                  alt="Jamal Belahrach, Fondateur DEO Conseil"
                  className="jv3-photo"
                />
              </div>
            </div>
          </div>

          {/* Citation extraite en grand */}
          <div className="jv3-pullquote jv3-pullquote--light reveal">
            <div className="jv3-pullquote-mark" aria-hidden="true">&ldquo;</div>
            <blockquote className="jv3-pullquote-text">
              La création de valeur naît toujours d'une rencontre sincère entre les hommes et leur organisation.
            </blockquote>
            <div className="jv3-pullquote-line"></div>
          </div>

          {/* Rangée 2 : Texte éditorial structuré */}
          <div className="jv3-editorial reveal">
            <div className="jv3-editorial-visible">
              <p className="jv3-para jv3-para--lead">
                Nous sommes entrés dans un monde qui a changé de nature et qui impose un nouveau rythme aux organisations, qu'elles soient publiques ou privées. Il faut ajouter à cela que les priorités des collaborateurs ont été chamboulées post-covid avec les sujets du <strong>sens au travail</strong> ainsi que l'<strong>engagement pour l'entreprise</strong> qui sont fortement questionnés.
              </p>
              <p className="jv3-para">
                Dans ce nouvel environnement <span className="jv3-highlight">VUCA</span> (Volatile, Uncertain, Complex &amp; Ambiguous), les dirigeants sont définitivement challengés pour mieux comprendre ces nouveaux défis et anticiper les mutations et les disruptions. La révolution numérique et son impact dans les business modèles ainsi que dans les processus des organisations impose davantage d'agilité.
              </p>
            </div>
            <div className={`jv3-editorial-expandable ${jamalExpanded ? 'jv3-editorial-expandable--open' : ''}`}>
              <div className="jv3-editorial-cols">
                <div className="jv3-editorial-col">
                  <p className="jv3-para">
                    Dès lors, mieux comprendre les attentes des collaborateurs en matière de management, de leadership, d'empowerment pour répondre à leurs besoins d'équilibre entre vie professionnelle et vie personnelle, apparaît comme essentiel pour garantir leur engagement et leur capacité à créer de la valeur pour leurs employeurs.
                  </p>
                  <p className="jv3-para">
                    Forts de 27 ans d'expérience, de nos échanges avec des dirigeants, des cadres, des employés, chez DEO Conseil, nous voulons continuer à accompagner nos partenaires dans ce monde VUCA. Nous proposons une offre d'empowerment pour faire grandir les organisations en accompagnant leurs cadres dirigeants, leurs cadres et employés pour mieux appréhender ce défi des compétences du 21ème siècle :
                  </p>
                </div>
                <div className="jv3-editorial-col">
                  <div className="jv3-4c">
                    <div className="jv3-4c-item"><span className="jv3-4c-letter">C</span>ommunication</div>
                    <div className="jv3-4c-item"><span className="jv3-4c-letter">C</span>réativité</div>
                    <div className="jv3-4c-item"><span className="jv3-4c-letter">C</span>oopération</div>
                    <div className="jv3-4c-item"><span className="jv3-4c-letter">C</span>ritical thinking</div>
                  </div>
                  <div className="jv3-capskills-block">
                    <p className="jv3-para">
                      <span className="jv3-capskills">CapSkills</span>, se former autrement, est la nouvelle expérience que nous vous proposons pour vos stratégies d'up-skilling et de re-skilling, et ce, dans une démarche sur-mesure avec des offres modulaires en fonction de vos besoins.
                    </p>
                    <p className="jv3-para jv3-para--closing">
                      Avec <span className="jv3-capskills">CapSkills</span>, nous souhaitons relever ce défi des compétences pour vous et vos collaborateurs !
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button className="jv3-read-more-btn" onClick={() => setJamalExpanded(!jamalExpanded)}>
              {jamalExpanded ? 'Lire moins ↑' : 'Lire plus ↓'}
            </button>
          </div>

        </div>
       </section>

      {/* Vos Enjeux RH — Sliding Cards (pleine largeur) */}
      <VosEnjeuxRH />

      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--olive"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--red"></div>
      </div>
      {/* ═══ MISSIONS HERO ═══ */}
      <section className="missions-v2-hero page-section" id="missions">
        <div className="missions-v2-hero-bg" aria-hidden="true">MISSIONS</div>
        <div className="missions-v2-hero-inner reveal-left">
          <div className="vuca-eyebrow vuca-eyebrow--dark">Ce que nous faisons depuis 2002</div>
          <h2 className="missions-v2-hero-title">NOS<br/><span>MISSIONS.</span></h2>
          <p className="missions-v2-hero-intro">Nous accompagnons les entreprises et leurs dirigeants dans leurs transformations les plus complexes, avec l'humain au centre de chaque décision.</p>
          <div className="missions-btns">
            <a href="#contact" className="btn-red">Parlons-en</a>
          </div>
        </div>
      </section>

      {/* ═══ MISSIONS LISTE ═══ */}
      {/* ═══ GRILLE 6 MISSIONS ═══ */}
      <section className="missions-v2-list">
        <div className="missions-v2-list-inner">
          <div className="pi-grid pi-grid--3 pi-grid--home">
            {[
              { id: 1, title: "Connecter les dirigeants aux enjeux du monde", description: "Séminaires de prospective, benchmarks internationaux et immersions sectorielles pour aider vos leaders à décoder les signaux faibles et transformer les ruptures en opportunités de croissance." },
              { id: 2, title: "Aligner le top management sur la vision", description: "Ateliers de cohésion CODIR, team-building stratégique et facilitation de gouvernance pour créer un leadership collectif aligné sur les objectifs de l’entreprise." },
              { id: 3, title: "Créer un référentiel commun", description: "Co-construction de chartes de valeurs, déploiement de référentiels de compétences et programmes d’acculturation pour ancrer une identité d’entreprise forte et partagée." },
              { id: 4, title: "Adapter la stratégie pour anticiper les mutations", description: "Diagnostic stratégique, scénarios prospectifs et plans de transformation agiles pour préparer votre organisation aux évolutions du marché et de la réglementation." },
              { id: 5, title: "Mettre le capital humain au cœur de la stratégie", description: "Cartographie des talents, plans de succession, GPEC et programmes de développement du leadership pour faire de vos collaborateurs le premier levier de performance." },
              { id: 6, title: "Intégrer le digital comme levier de transformation", description: "Accompagnement à la digitalisation des processus RH, déploiement d’outils collaboratifs et conduite du changement numérique pour une organisation agile et connectée." },
            ].map((mission) => (
              <div key={mission.id} className="pi-card pi-card--dark">
                <div className="pi-card-num">{mission.id.toString().padStart(2, '0')}</div>
                <h3 className="pi-card-title">{mission.title}</h3>
                <p className="pi-card-text">{mission.description}</p>
                <div className="pi-card-accent"></div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section className="services-v2 page-section" id="services">
        <div className="pi-inner">
          <span className="pi-tag">NOS EXPERTISES</span>
          <h2 className="pi-title">Nos <span className="pi-red">4 pôles</span> d'expertise</h2>
          <div className="pi-grid pi-grid--2">
            {poles.map((pole) => (
              <a key={pole.id} href={`/expertises/${pole.slug}`} className="pi-card pi-card--light pi-card--link">
                <div className="pi-card-num pi-card-num--dark">{pole.id.toString().padStart(2, '0')}</div>
                <h3 className="pi-card-title pi-card-title--dark">{pole.title}</h3>
                <p className="pi-card-text pi-card-text--dark">{pole.description}</p>
                <ul className="pi-card-list pi-card-list--dark">
                  {pole.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
                <div className="pi-card-cta pi-card-cta--dark">Découvrir ce pôle →</div>
                <div className="pi-card-accent"></div>
              </a>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'48px'}}>
            <a href="/#contact" className="pi-btn pi-btn--red">Parlons-en →</a>
          </div>
        </div>
      </section>

      {/* ═══ CE QUI NOUS DIFFÉRENCIE V2 ═══ */}
      <section className="diff-v2" id="differents">
        <div className="diff-v2-bg" aria-hidden="true">WHY</div>
        <div className="diff-v2-inner">
          <div className="diff-v2-header reveal">
            <div className="diff-v2-tag">POURQUOI DEO CONSEIL</div>
            <h2 className="diff-v2-title">CE QUI NOUS<br /><span className="diff-v2-title-accent">DIFFÉRENCIE.</span></h2>
            <p className="diff-v2-subtitle">Des partenaires, pas des théoriciens. 27+ ans sur le terrain au Maroc, en Afrique et à l'international.</p>
            <div className="diff-v2-stats" ref={diffStatsRef}>
              <div className="diff-v2-stat">
                <div className="diff-v2-stat-num">{diffStats.entreprises}<span>+</span></div>
                <div className="diff-v2-stat-lbl">Entreprises</div>
              </div>
              <div className="diff-v2-stat-sep"></div>
              <div className="diff-v2-stat">
                <div className="diff-v2-stat-num">{diffStats.cadres >= 1000 ? (diffStats.cadres / 1000).toFixed(1) + 'K' : diffStats.cadres}<span>+</span></div>
                <div className="diff-v2-stat-lbl">Cadres coachés</div>
              </div>
              <div className="diff-v2-stat-sep"></div>
              <div className="diff-v2-stat">
                <div className="diff-v2-stat-num">{diffStats.formes >= 1000 ? Math.floor(diffStats.formes / 1000) + 'K' : diffStats.formes}<span>+</span></div>
                <div className="diff-v2-stat-lbl">Collaborateurs formés</div>
              </div>
              <div className="diff-v2-stat-sep"></div>
              <div className="diff-v2-stat">
                <div className="diff-v2-stat-num">{diffStats.evalues >= 1000 ? Math.floor(diffStats.evalues / 1000) + 'K' : diffStats.evalues}<span>+</span></div>
                <div className="diff-v2-stat-lbl">Collaborateurs évalués</div>
              </div>
            </div>
          </div>
          <div className="diff-v2-grid">
            {[
              { icon: "★", title: "PARTENAIRES", text: "Nos consultants ont dirigé avant de conseiller.", color: "var(--red)" },
              { icon: "❤", title: "PEOPLE FIRST", text: "L'humain au centre de chaque décision.", color: "var(--red)" },
              { icon: "✦", title: "ACCOMPAGNEMENT SUR MESURE", text: "Chaque organisation est unique, notre approche aussi.", color: "var(--red)" },
              { icon: "◈", title: "ÉVALUATION", text: "Assessment certifié, déployé avec rigueur.", color: "var(--red)" },
              { icon: "⚒", title: "SUR MESURE", text: "Chaque mission est unique. Zéro copier-coller.", color: "var(--red)" },
              { icon: "✓", title: "RÉSULTATS", text: "Indicateurs concrets, suivi post-mission.", color: "var(--red)" },
            ].map((item, i) => (
              <div key={i} className="diff-v2-card" style={{ '--dv2-color': item.color } as React.CSSProperties}>
                <div className="diff-v2-card-icon" aria-hidden="true">{item.icon}</div>
                <h3 className="diff-v2-card-title">{item.title}</h3>
                <p className="diff-v2-card-text">{item.text}</p>
                <div className="diff-v2-card-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ PROGRAMMES SUR MESURE ═══ */}
      <HomeProgrammesAccordion />

      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ CATALOGUE BAND ═══ */}
      <div className="catalogue-band">
        <p>Notre catalogue de formations &amp; services est disponible.</p>
        <a
          href="https://deoconseil.com/wp-content/uploads/2024/06/DEO-CONSEIL-Catalogue-CapSkills-2024-2025.pdf"
          target="_blank"
          rel="noreferrer"
          className="catalogue-dl"
          onClick={(e) => { e.preventDefault(); openModal(); }}
        >
          ↓ Télécharger le Catalogue
        </a>
      </div>

      {/* ═══ FABRIK ═══ */}
      <section className="fabrik page-section" id="fabrik">
        <div className="fabrik-hd reveal">
          <div className="section-tag">Think Tank &amp; Communauté</div>
          <h2 className="section-title">LA FABRIK <em style={{color:'var(--red)'}}>RH.</em></h2>
        </div>
        <div className="fabrik-grid">
          {[
            { cls: "f-red", num: "01", title: "Recherche & Innovation RH", desc: "Veille permanente sur les pratiques RH mondiales." },
            { cls: "f-red", num: "02", title: "Outils & Méthodes", desc: "Développement de frameworks et outils propriétaires testés en conditions réelles depuis plus de 20 ans." },
            { cls: "f-grey", num: "03", title: "Communauté RH", desc: "Un réseau de 1000+ DRH, dirigeants et experts connectés et animés par DEO Conseil." },
            { cls: "f-grey", num: "04", title: "Publications & Insights", desc: "Études, tribunes, podcasts et événements pour nourrir la réflexion des décideurs." },
          ].map((f, i) => (
            <div key={i} className={`fabrik-card ${f.cls}`}>
              <div className="fabrik-num">{f.num}</div>
              <div className="fabrik-title">{f.title}</div>
              <p className="fabrik-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Séparateur graphique */}
      <div className="section-separator">
        <div className="sep-line sep-line--olive"></div>
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
      </div>

      {/* ═══ RÉFÉRENCES — PREMIUM ═══ */}
      <section className="refs-v2" id="references">
        {/* Texte décoratif géant en arrière-plan */}
        <div className="refs-v2__bg-text" aria-hidden="true">CONFIANCE</div>

        {/* Header : tag + titre + sous-titre */}
        <div className="refs-v2__header reveal">
          <div className="refs-v2__tag">Depuis 2002</div>
          <h2 className="refs-v2__title">
            ILS NOUS FONT <em>CONFIANCE</em>
          </h2>
          <p className="refs-v2__subtitle">
            +200 organisations publiques et privées, au Maroc et à l'international, nous confient leurs enjeux de capital humain.
          </p>
        </div>

        {/* Stats animées */}
        <div className="refs-v2__stats" ref={refsStatsRef}>
          <div className="refs-v2__stat">
            <span className="refs-v2__stat-num">{refsStats.entreprises}+</span>
            <span className="refs-v2__stat-lbl">Entreprises accompagnées</span>
          </div>
          <div className="refs-v2__stat-sep"></div>
          <div className="refs-v2__stat">
            <span className="refs-v2__stat-num" style={{ color: 'var(--red)' }}>{refsStats.cadres >= 1000 ? (refsStats.cadres / 1000).toFixed(1) + 'K' : refsStats.cadres}+</span>
            <span className="refs-v2__stat-lbl">Cadres &amp; dirigeants</span>
          </div>
          <div className="refs-v2__stat-sep"></div>
          <div className="refs-v2__stat">
            <span className="refs-v2__stat-num" style={{ color: 'var(--red)' }}>{refsStats.formes >= 1000 ? Math.floor(refsStats.formes / 1000) + 'K' : refsStats.formes}+</span>
            <span className="refs-v2__stat-lbl">Collaborateurs formés</span>
          </div>
          <div className="refs-v2__stat-sep"></div>
          <div className="refs-v2__stat">
            <span className="refs-v2__stat-num" style={{ color: 'var(--red)' }}>{refsStats.evalues >= 1000 ? Math.floor(refsStats.evalues / 1000) + 'K' : refsStats.evalues}+</span>
            <span className="refs-v2__stat-lbl">Collaborateurs évalués</span>
          </div>
        </div>

        {/* Marquee rangée 1 — vers la gauche (logos ou noms) */}
        <div className="refs-v2__marquee">
          <div className="refs-v2__marquee-track refs-v2__marquee-track--left">
            {[...Array(3)].map((_, setIdx) => (
              <div className="refs-v2__marquee-set" key={`r1-${setIdx}`}>
                {refsRow1.map((name, i) => {
                  const logoItem = refsLogos.find(l => l.nom === name);
                  return logoItem?.logo ? (
                    <span key={i} className="refs-v2__logo-item">
                      <img src={logoItem.logo} alt={name} className="refs-v2__logo-img" />
                    </span>
                  ) : (
                    <span key={i} className="refs-v2__name">{name}</span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee rangée 2 — vers la droite (logos ou noms) */}
        <div className="refs-v2__marquee">
          <div className="refs-v2__marquee-track refs-v2__marquee-track--right">
            {[...Array(3)].map((_, setIdx) => (
              <div className="refs-v2__marquee-set" key={`r2-${setIdx}`}>
                {refsRow2.map((name, i) => {
                  const logoItem = refsLogos.find(l => l.nom === name);
                  return logoItem?.logo ? (
                    <span key={i} className="refs-v2__logo-item">
                      <img src={logoItem.logo} alt={name} className="refs-v2__logo-img" />
                    </span>
                  ) : (
                    <span key={i} className="refs-v2__name">{name}</span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Ligne décorative bas */}
        <div className="refs-v2__deco">
          <div className="refs-v2__deco-line refs-v2__deco-line--red"></div>
          <div className="refs-v2__deco-line refs-v2__deco-line--lime"></div>
          <div className="refs-v2__deco-line refs-v2__deco-line--olive"></div>
        </div>
      </section>
      {/* ═══ BLOG ═══ */}
      <section className="blog page-section" id="blog">
        <div className="blog-hd reveal">
          <div>
            <div className="section-tag">Insights &amp; Réflexions</div>
            <h2 className="section-title">LE BLOG <em style={{color:'var(--red)'}}>DEO.</em></h2>
          </div>
          <a href="/blog" className="blog-more">Tous les articles →</a>
        </div>
        {blogPosts.length > 0 ? (
          <div className="blog-grid">
            <a href={`/blog/${blogPosts[0].slug}`} className="blog-featured">
              {blogPosts[0].image && <img src={blogPosts[0].image} alt={blogPosts[0].titre} style={{width:'100%',height:'200px',objectFit:'cover',borderRadius:'8px 8px 0 0',marginBottom:'12px'}} />}
              <div className="blog-tag">{blogPosts[0].categorie}</div>
              <h3 className="blog-featured-title">{blogPosts[0].titre}</h3>
              <p className="blog-featured-excerpt">{blogPosts[0].extrait}</p>
              <div className="blog-author">
                <div className="blog-author-avatar">{(blogPosts[0].auteur || 'D')[0]}</div>
                <div className="blog-author-info">{blogPosts[0].auteur} <span>{blogPosts[0].date}</span></div>
              </div>
              <span className="blog-read">Lire l'article →</span>
            </a>
            {blogPosts.length > 1 && (
              <div className="blog-col">
                {blogPosts.slice(1).map(post => (
                  <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-tag">{post.categorie}</div>
                    <h3 className="blog-card-title">{post.titre}</h3>
                    <p className="blog-card-excerpt">{post.extrait}</p>
                    <div className="blog-card-meta">{post.auteur} · {post.date}</div>
                    <span className="blog-read">Lire →</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="blog-grid">
            <a href="/blog/engagement-collaborateurs" className="blog-featured">
              <div className="blog-tag">Leadership &amp; RH</div>
              <h3 className="blog-featured-title">L'engagement des collaborateurs : quels leviers ?</h3>
              <p className="blog-featured-excerpt">Dans le cadre de la Fabrik RH pour les VUCA Talks, nous abordons le thème de l'engagement des collaborateurs. Jamal Belahrach explique ce qui permet de définir l'engagement : stratégie claire, marque employeur, expérience collaborateurs et culture d'entreprise.</p>
              <div className="blog-author">
                <div className="blog-author-avatar">J</div>
                <div className="blog-author-info">Jamal Belahrach <span>CEO DEO Conseil · 11 avril 2022</span></div>
              </div>
              <span className="blog-read">Lire l'article →</span>
            </a>
            <div className="blog-col">
              <a href="/blog/leadership-management-proximite" className="blog-card">
                <div className="blog-tag">Leadership &amp; Management</div>
                <h3 className="blog-card-title">Un leadership inspirant et un management de proximité pour créer de la valeur</h3>
                <p className="blog-card-excerpt">Ce sont les hommes et les femmes qui créent de la valeur, pas les institutions.</p>
                <div className="blog-card-meta">Jamal Belahrach · 11 avril 2022</div>
                <span className="blog-read">Lire →</span>
              </a>
              <a href="/blog/monde-vuca" className="blog-card">
                <div className="blog-tag">Transformation &amp; Stratégie</div>
                <h3 className="blog-card-title">Le monde VUCA, de quoi parle-t-on ?</h3>
                <p className="blog-card-excerpt">Volatile, Incertain, Complexe et Ambigu — Jamal Belahrach aborde les enjeux de ce monde.</p>
                <div className="blog-card-meta">Jamal Belahrach · 30 mai 2022</div>
                <span className="blog-read">Lire →</span>
              </a>
            </div>
          </div>
        )}
      </section>

    <NewsletterSection />
      <ActualitesSection />
      <SiteFooter />

      {/* ═══ MODAL CATALOGUE ═══ */}
      {modalOpen && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal}>✕</button>
            <h2 className="modal-title">Télécharger notre catalogue</h2>
            <form className="modal-form" onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const nom = fd.get("nom") as string || "";
              const prenom = fd.get("prenom") as string || "";
              const telephone = fd.get("telephone") as string || "";
              const email = fd.get("email") as string || "";
              const entreprise = fd.get("entreprise") as string || "";
              const fonction = fd.get("fonction") as string || "";
              // Save to GAS in background
              try {
                const { gasPost } = await import("@/lib/gas");
                await gasPost({ action: "submitCatalogue", nom, prenom, telephone, email, entreprise, fonction });
              } catch { /* silently continue */ }
              // Trigger download
              const link = document.createElement('a');
              link.href = 'https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/DEO-CONSEIL-Catalogue-CapSkills-2024-2025_8798a621.pdf';
              link.download = 'DEO-CONSEIL-Catalogue-CapSkills-2024-2025.pdf';
              link.target = '_blank';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              closeModal();
            }}>
              <div className="modal-row-2">
                <input type="text" name="nom" required placeholder="Nom" className="modal-input" />
                <input type="text" name="prenom" required placeholder="Prénom" className="modal-input" />
              </div>
              <input type="tel" name="telephone" placeholder="Téléphone" className="modal-input" />
              <input type="email" name="email" required placeholder="E-mail" className="modal-input" />
              <input type="text" name="entreprise" placeholder="Entreprise" className="modal-input" />
              <input type="text" name="fonction" placeholder="Fonction" className="modal-input" />
              <button type="submit" className="modal-submit">Télécharger le catalogue ↓</button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ CHATBOT ═══ */}
      {showNotif && (
        <div id="deo-chat-notif">👋 Bonjour, comment puis-je vous aider ?</div>
      )}
      <button
        id="deo-chat-btn"
        className={chatOpen ? "open" : ""}
        onClick={() => setChatOpen(!chatOpen)}
        title="Parlons-en"
      >
        <svg className="ico-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg className="ico-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div id="deo-chat-window" className={chatOpen ? "open" : ""}>
        <div className="chat-header">
          <div className="chat-avatar">D</div>
          <div className="chat-header-info">
            <div className="chat-header-name">DEO Conseil</div>
            <div className="chat-header-status"><span className="chat-status-dot"></span>En ligne · répond en quelques minutes</div>
          </div>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {chatMessages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.type}`}>
              <div className="chat-bubble" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }} />
              <div className="chat-msg-time">{msg.time}</div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-msg bot">
              <div className="chat-bubble" style={{ padding: 0 }}>
                <div className="chat-typing"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
        </div>
        {showSuggestions && (
          <div className="chat-suggestions">
            {["Vos services RH", "Recrutement cadres", "Prendre un RDV", "Le catalogue"].map((s, i) => (
              <button key={i} className="chat-sugg" onClick={() => sendSugg(s)}>{s}</button>
            ))}
          </div>
        )}
        <div className="chat-input-area">
          <input
            className="chat-input"
            type="text"
            placeholder="Écrivez votre message…"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          />
          <button className="chat-send" onClick={sendMessage}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
