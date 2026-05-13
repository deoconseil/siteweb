import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/photo-conference_f372139c.jpg";
const PERFORMANSE_LOGO = "/images/performanse-logo.png";

const BENEFICES = [
  {
    num: "01",
    title: "Validite scientifique",
    text: "Tests bases sur les modeles Big Five, les besoins de McClelland et les schemas cognitifs. Outils certifies ISO 27001 et ISO 10667-2.",
  },
  {
    num: "02",
    title: "Objectivite des decisions RH",
    text: "Reduisez les biais cognitifs en recrutement, evaluation et developpement. Des donnees fiables pour des choix eclaires.",
  },
  {
    num: "03",
    title: "Experience contextuelle",
    text: "Chaque restitution genere un dialogue concret entre evaluateur et evalue, au service d'un plan de developpement actionnable.",
  },
];

const OUTILS = [
  { nom: "ECHO2", usage: "Comportement professionnel" },
  { nom: "MANAGE-R", usage: "Competences manageriales" },
  { nom: "360 FEEDBACK", usage: "Evaluation multi-sources" },
  { nom: "TEAM BOOSTER", usage: "Dynamique d'equipe" },
  { nom: "BOOST", usage: "Competences commerciales" },
  { nom: "TWOB-R", usage: "Cognitif et comportemental" },
  { nom: "IDONEO", usage: "Recrutement de masse" },
  { nom: "EVOLUTION", usage: "Employabilite et mobilite" },
  { nom: "MINDKEYS", usage: "Developpement des talents" },
  { nom: "LEARN", usage: "Apprentissage et evolution" },
];

export default function Performanse() {
  return (
    <>
      <div className="page-performanse-v2">
        <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
          <div className="page-hero__overlay"></div>
          <div className="page-hero__content">
            <img
              src={PERFORMANSE_LOGO}
              alt="Logo PerformanSe"
              style={{ width: "120px", height: "120px", objectFit: "contain", margin: "0 auto 12px" }}
            />
            <span className="page-hero__tag">OUTILS & METHODES</span>
            <h1>Performan<em>Se</em></h1>
            <p>Distributeur exclusif au Maroc via DEO Conseil pour vos assessments RH.</p>
            <div className="page-hero__accent"></div>
          </div>
        </div>

        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">ASSESSMENT RH</span>
            <h2 className="pi-title">Nos outils d'<span className="pi-red">assessment</span></h2>
            <p className="pi-text">
              Des outils reconnus internationalement pour un diagnostic precis des competences
              comportementales, du potentiel managerial et de la dynamique d'equipe.
            </p>
            <p className="pi-text">
              Fondes sur 35 ans d'expertise psychometrique, ces dispositifs sont valides scientifiquement
              et operationnels pour vos decisions RH.
            </p>
          </div>
        </section>

        <div className="section-separator">
          <div className="sep-line sep-line--red"></div>
          <div className="sep-line sep-line--lime"></div>
          <div className="sep-line sep-line--olive"></div>
        </div>

        <section className="pi-section pi-section--dark">
          <div className="pi-inner">
            <span className="pi-tag">POURQUOI PERFORMANSE</span>
            <h2 className="pi-title pi-title--white">3 benefices <span className="pi-red">majeurs</span></h2>
            <div className="pi-grid pi-grid--3">
              {BENEFICES.map((item) => (
                <article key={item.num} className="pi-card pi-card--dark">
                  <div className="pi-card-num mission-number-emphasis">{item.num}</div>
                  <h3 className="pi-card-title">{item.title}</h3>
                  <p className="pi-card-text">{item.text}</p>
                  <div className="pi-card-accent"></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">OUTILS DISPONIBLES</span>
            <h2 className="pi-title">10 outils <span className="pi-red">operationnels</span></h2>
            <div className="pi-grid pi-grid--2">
              {OUTILS.map((outil) => (
                <div key={outil.nom} className="pi-card pi-card--cream pi-card--border-left">
                  <h3 className="pi-card-title">{outil.nom}</h3>
                  <p className="pi-card-text">{outil.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pi-section pi-section--dark">
          <div className="pi-inner">
            <span className="pi-tag">CHIFFRES CLES</span>
            <h2 className="pi-title pi-title--white">Impact <span className="pi-red">mesurable</span></h2>
            <div className="pi-stats-row">
              <div className="pi-stat">
                <div className="pi-stat-num">35+</div>
                <div className="pi-stat-label">Soft skills evaluees</div>
              </div>
              <div className="pi-stat">
                <div className="pi-stat-num">10</div>
                <div className="pi-stat-label">Outils disponibles</div>
              </div>
              <div className="pi-stat">
                <div className="pi-stat-num">#1</div>
                <div className="pi-stat-label">Distributeur exclusif Maroc</div>
              </div>
              <div className="pi-stat">
                <div className="pi-stat-num">ISO</div>
                <div className="pi-stat-label">Methodes certifiees</div>
              </div>
            </div>
          </div>
        </section>

        <section className="pi-section pi-section--red">
          <div className="pi-inner pi-center">
            <img
              src={PERFORMANSE_LOGO}
              alt="Logo PerformanSe"
              style={{ width: "108px", height: "108px", objectFit: "contain", margin: "0 auto 14px" }}
            />
            <h2 className="pi-title pi-title--white">Besoin d'un assessment adapte a votre contexte ?</h2>
            <p className="pi-text pi-text--white" style={{ textAlign: "center" }}>
              Nous vous aidons a choisir l'outil le plus pertinent selon vos objectifs RH.
            </p>
            <a href="#contact" className="pi-btn pi-btn--white">Parlons-en</a>
          </div>
        </section>
      </div>

      <NewsletterSection />
      <ActualitesSection />
      <SiteFooter />
    </>
  );
}
