import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-missions_7c850bfb.jpg";
const PHOTO_TEAM = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-team-diverse_8556497f.jpg";
const PHOTO_TRAINING = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-training-1_985da9f5.jpg";
const PHOTO_CONFERENCE = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-conference_f372139c.jpg";

export default function Missions() {
  const missions = [
    {
      id: 1,
      title: "Connecter les dirigeants aux enjeux du monde",
      description: "Séminaires de prospective, benchmarks internationaux et immersions sectorielles pour aider vos leaders à décoder les signaux faibles et transformer les ruptures en opportunités de croissance."
    },
    {
      id: 2,
      title: "Aligner le top management sur la vision",
      description: "Ateliers de cohésion CODIR, team-building stratégique et facilitation de gouvernance pour créer un leadership collectif aligné sur les objectifs de l'entreprise."
    },
    {
      id: 3,
      title: "Créer un référentiel commun",
      description: "Co-construction de chartes de valeurs, déploiement de référentiels de compétences et programmes d'acculturation pour ancrer une identité d'entreprise forte et partagée."
    },
    {
      id: 4,
      title: "Adapter la stratégie pour anticiper les mutations",
      description: "Diagnostic stratégique, scénarios prospectifs et plans de transformation agiles pour préparer votre organisation aux évolutions du marché et de la réglementation."
    },
    {
      id: 5,
      title: "Mettre le capital humain au cœur de la stratégie",
      description: "Cartographie des talents, plans de succession, GPEC et programmes de développement du leadership pour faire de vos collaborateurs le premier levier de performance."
    },
    {
      id: 6,
      title: "Intégrer le digital comme levier de transformation",
      description: "Accompagnement à la digitalisation des processus RH, déploiement d'outils collaboratifs et conduite du changement numérique pour une organisation agile et connectée."
    }
  ];

  return (
    <>
    <div className="page-missions-v2">
      {/* ═══ HERO BANNER ═══ */}
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="page-hero__overlay"></div>
        <div className="page-hero__content">
          <span className="page-hero__tag">NOTRE ENGAGEMENT</span>
          <h1>Nos <em>Missions</em></h1>
          <p>Comment nous accompagnons les organisations dans leur transformation et leur performance durable.</p>
          <div className="page-hero__accent"></div>
        </div>
      </div>

      {/* ═══ INTRO — fond cream ═══ */}
      <section className="pi-section pi-section--cream">
        <div className="pi-inner">
          <span className="pi-tag">NOS MISSIONS</span>
          <h2 className="pi-title">Accompagner les organisations vers une <span className="pi-red">performance durable</span></h2>
          <p className="pi-text">Depuis plus de 20 ans, nous travaillons aux côtés des dirigeants et de leurs organisations pour créer une valeur durable. Nos missions reflètent notre engagement envers une transformation authentique et mesurable.</p>
        </div>
      </section>

      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ GRILLE MISSIONS — fond dark ═══ */}
      <section className="pi-section pi-section--dark">
        <div className="pi-inner">
          <span className="pi-tag">CE QUE NOUS FAISONS</span>
          <h2 className="pi-title pi-title--white">Nos <span className="pi-red">6 missions</span> stratégiques</h2>
          <div className="pi-grid pi-grid--3">
            {missions.map((mission) => (
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

      {/* ═══ CTA — fond rouge ═══ */}
      <section className="pi-section pi-section--red">
        <div className="pi-inner pi-center">
          <h2 className="pi-title pi-title--white">Prêt à transformer votre <span style={{color: '#fff', textDecoration: 'underline', textUnderlineOffset: '6px'}}>organisation</span> ?</h2>
          <p className="pi-text pi-text--white" style={{textAlign: 'center'}}>Parlons de vos enjeux spécifiques et comment DEO Conseil peut vous accompagner.</p>
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
