import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-expertises_131339ff.jpg";

const poles = [
  {
    id: 1,
    slug: "assessment-coaching",
    title: "Assessment & Coaching",
    description: "Évaluer le potentiel, révéler les talents et accompagner les leaders dans leur montée en puissance.",
    services: [
      "Assessment individuel et collectif",
      "Coaching et empowerment de dirigeants et managers"
    ]
  },
  {
    id: 2,
    slug: "people-development",
    title: "People Development (CapSkills)",
    description: "L'offre CapSkills couvre trois axes — Management & Leadership, Développement personnel, Efficacité professionnelle — avec des programmes structurés.",
    services: [
      "Transformation : développement des soft skills et compétences managériales",
      "Parcours sur-mesure",
      "Leadership avancé",
      "Emerging Management",
      "Shaping our Leaders",
      "Management de projet"
    ]
  },
  {
    id: 3,
    slug: "transformation",
    title: "Transformation des Hommes et des Organisations",
    description: "Accompagner les dirigeants et leurs équipes dans les mutations profondes de leur organisation, en alignant la vision stratégique avec les dynamiques humaines.",
    services: [
      "Alignement du top management",
      "Conduite de stratégie de transformation culturelle et digitale",
      "Management de transition"
    ]
  },
  {
    id: 4,
    slug: "conseil-rh",
    title: "Conseil RH",
    description: "Une approche intégrée du capital humain pour construire des organisations performantes, attractives et résilientes.",
    services: [
      "Plateforme de management du capital humain",
      "Expérience collaborateur",
      "Marque employeur et marketing RH",
      "Baromètre social",
      "Wellbeing@work",
      "Académies d'entreprise"
    ]
  }
];

export { poles };

export default function Expertises() {
  return (
    <>
    <div className="page-expertises-v2">
      {/* ═══ HERO BANNER ═══ */}
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="page-hero__overlay"></div>
        <div className="page-hero__content">
          <span className="page-hero__tag">NOS PÔLES</span>
          <h1>Nos <em>Expertises</em></h1>
          <p>Quatre pôles d'expertise intégrés pour accompagner votre transformation et votre performance durable.</p>
          <div className="page-hero__accent"></div>
        </div>
      </div>

      {/* ═══ INTRO — fond cream ═══ */}
      <section className="pi-section pi-section--cream">
        <div className="pi-inner">
          <span className="pi-tag">NOS COMPÉTENCES</span>
          <h2 className="pi-title">Quatre pôles d'expertise <span className="pi-red">intégrés</span></h2>
          <p className="pi-text">Le cabinet intervient de manière holistique à travers quatre métiers complémentaires. Du diagnostic stratégique à la mise en œuvre opérationnelle, nos consultants — tous praticiens expérimentés — interviennent au Maroc, en Afrique et à l'international avec une exigence de résultats concrets.</p>
        </div>
      </section>

      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ GRILLE EXPERTISES 2x2 — fond dark ═══ */}
      <section className="pi-section pi-section--dark">
        <div className="pi-inner">
          <span className="pi-tag">NOS EXPERTISES</span>
          <h2 className="pi-title pi-title--white">Nos <span className="pi-red">4 pôles</span> d'expertise</h2>
          <div className="pi-grid pi-grid--2">
            {poles.map((pole) => (
              <a key={pole.id} href={`/expertises/${pole.slug}`} className="pi-card pi-card--dark pi-card--link">
                <div className="pi-card-num">{pole.id.toString().padStart(2, '0')}</div>
                <h3 className="pi-card-title">{pole.title}</h3>
                <p className="pi-card-text">{pole.description}</p>
                <ul className="pi-card-list">
                  {pole.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
                <div className="pi-card-cta">Découvrir ce pôle →</div>
                <div className="pi-card-accent"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--olive"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--red"></div>
      </div>

      {/* ═══ POURQUOI DEO — fond cream ═══ */}
      <section className="pi-section pi-section--cream">
        <div className="pi-inner">
          <span className="pi-tag">NOTRE DIFFÉRENCE</span>
          <h2 className="pi-title">Pourquoi choisir <span className="pi-red">DEO Conseil</span> ?</h2>
          <div className="pi-grid pi-grid--2">
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Partenaires, pas prestataires</h3>
              <p className="pi-card-text">Nos consultants ont dirigé avant de conseiller. Ils comprennent les réalités du terrain.</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Approche People First</h3>
              <p className="pi-card-text">Éprouvée depuis 2002, adaptée à chaque réalité d'entreprise et contexte culturel.</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Accompagnement sur mesure</h3>
              <p className="pi-card-text">Chaque mission est conçue pour répondre aux enjeux spécifiques de votre organisation.</p>
            </div>
            <div className="pi-card pi-card--cream pi-card--border-left">
              <h3 className="pi-card-title">Outils certifiés</h3>
              <p className="pi-card-text">Assessment et méthodes reconnus mondialement pour garantir la qualité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA — fond rouge ═══ */}
      <section className="pi-section pi-section--red">
        <div className="pi-inner pi-center">
          <h2 className="pi-title pi-title--white">Quelle expertise pour votre <span style={{color: '#fff', textDecoration: 'underline', textUnderlineOffset: '6px'}}>enjeu</span> ?</h2>
          <a href="#contact" className="pi-btn pi-btn--white">Parlons-en →</a>
        </div>
      </section>
    </div>
    <NewsletterSection />
    <ActualitesSection />
    <SiteFooter />
    </>
  );
}
