import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";

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
  { nom: "360° FEEDBACK", usage: "Evaluation multi-sources" },
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
      <div className="performanse-page">
        <div className="page-hero performanse-hero">
          <div className="page-hero__overlay"></div>
          <div className="page-hero__content">
            <span className="page-hero__tag">OUTILS & METHODES</span>
            <h1>PerformanSe</h1>
            <p>Distributeur exclusif au Maroc via DEO Conseil.</p>
            <div className="page-hero__accent"></div>
          </div>
        </div>

        <section className="performanse-intro">
          <div className="performanse-inner">
            <h2 className="performanse-title">Nos outils d'assessment</h2>
            <p className="performanse-text">
              Des outils reconnus internationalement pour un diagnostic precis des competences
              comportementales, du potentiel managerial et de la dynamique d'equipe.
            </p>
            <p className="performanse-text">
              Fondes sur 35 ans d'expertise psychometrique, ces dispositifs sont valides scientifiquement
              et operationnels pour vos decisions RH.
            </p>
          </div>
        </section>

        <section className="performanse-benefices">
          <div className="performanse-inner performanse-benefices-grid">
            {BENEFICES.map((item) => (
              <article key={item.num} className="performanse-card">
                <span className="performanse-card-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="performanse-outils">
          <div className="performanse-inner">
            <h2 className="performanse-title">
              10 outils disponibles
            </h2>
            <div className="performanse-outils-grid">
              {OUTILS.map((outil, idx) => (
                <div key={outil.nom} className={`performanse-outil ${idx % 4 === 0 ? "performanse-outil--accent" : ""}`}>
                  <h4>{outil.nom}</h4>
                  <p>{outil.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="performanse-kpis">
          <div className="performanse-inner performanse-kpis-grid">
            <div className="performanse-kpi">
              <span>35+</span>
              <p>Soft skills evaluees</p>
            </div>
            <div className="performanse-kpi">
              <span>10</span>
              <p>Outils disponibles</p>
            </div>
            <div className="performanse-kpi">
              <span>#1</span>
              <p>Distributeur exclusif Maroc</p>
            </div>
          </div>
        </section>

        <section className="performanse-cta">
          <div className="performanse-inner">
            <h2>Besoin d'un assessment adapte a votre contexte ?</h2>
            <p>Nous vous aidons a choisir l'outil pertinent selon vos objectifs RH.</p>
            <a href="#contact" className="performanse-cta-btn">Parlons-en</a>
          </div>
        </section>
      </div>

      <NewsletterSection />
      <ActualitesSection />
      <SiteFooter />
    </>
  );
}
