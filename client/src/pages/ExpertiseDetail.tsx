import { Link, useParams } from "wouter";
import SiteFooter from "@/components/SiteFooter";
import { poles } from "./Expertises";
import "./expertise-detail.css";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP";

interface ExpertiseData {
  slug: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  heroImage: string;
  approach: {
    title: string;
    text: string;
    image: string;
  };
  benefits: {
    title: string;
    items: { icon: string; label: string; description: string }[];
  };
  useCases: {
    title: string;
    cases: { title: string; context: string; result: string }[];
  };
  quote: {
    text: string;
    author: string;
  };
}

const expertisesData: ExpertiseData[] = [
  {
    slug: "assessment-coaching",
    title: "Assessment & Coaching",
    subtitle: "Évaluation des potentiels et accompagnement des leaders",
    heroDescription: "Évaluer le potentiel, révéler les talents et accompagner les leaders dans leur montée en puissance. Notre approche combine des outils d'assessment reconnus internationalement avec un coaching de dirigeants ancré dans la réalité du terrain.",
    heroImage: `${CDN}/expertise-assessment_bbc3d49a.jpg`,
    approach: {
      title: "Notre approche",
      text: "L'assessment individuel et collectif : entretiens structurés, mises en situation (in-basket, jeux de rôle, études de cas), tests psychométriques validés scientifiquement, feedback 360°. Chaque assessment est conçu sur mesure en fonction du référentiel de compétences et du niveau de responsabilité. Le coaching et empowerment de dirigeants et managers : accompagnement individuel et collectif sur 6 à 12 mois, avec des méthodologies certifiées (ICF, EMCC). Nos coachs sont d'anciens dirigeants qui comprennent les enjeux de pouvoir, de solitude et de prise de décision sous pression.",
      image: `${CDN}/expertise-coaching_eec056e0.jpg`,
    },
    benefits: {
      title: "Bénéfices concrets",
      items: [
        { icon: "01", label: "Décisions objectivées", description: "Des données fiables pour recruter, promouvoir ou réorganiser en minimisant les biais." },
        { icon: "02", label: "Posture renforcée", description: "Le dirigeant gagne en assurance, en clarté décisionnelle et en impact sur son équipe." },
        { icon: "03", label: "Plans de succession", description: "Identification des successeurs potentiels avec des plans de développement ciblés." },
        { icon: "04", label: "Leadership authentique", description: "Développement d'un leadership ancré dans les valeurs et la vision de l'organisation." },
      ],
    },
    useCases: {
      title: "Cas d'usage",
      cases: [
        { title: "Plan de succession COMEX", context: "Évaluation de 15 directeurs pour identifier les successeurs potentiels du DG.", result: "3 successeurs identifiés, plans de développement sur 18 mois, transition réussie." },
        { title: "Coaching de DG", context: "Prise de poste après promotion interne, difficulté à asseoir sa légitimité.", result: "Coaching de 9 mois : posture affirmée, équipe restructurée, +18% de performance." },
        { title: "Cartographie des talents", context: "Évaluation de 60 cadres pour identifier les hauts potentiels d'un groupe agroalimentaire.", result: "15 HP identifiés, programme accéléré, 80% promus dans les 24 mois." },
      ],
    },
    quote: {
      text: "Évaluer n'est pas juger. C'est donner à chacun les clés pour comprendre ses forces et construire son développement.",
      author: "Jamal Belahrach — DEO Conseil",
    },
  },
  {
    slug: "people-development",
    title: "People Development (CapSkills)",
    subtitle: "Management & Leadership, Développement personnel, Efficacité professionnelle",
    heroDescription: "L'offre CapSkills couvre trois axes — Management & Leadership, Développement personnel, Efficacité professionnelle — avec des programmes structurés pour transformer durablement les compétences. Pas de formation catalogue générique : chaque programme est construit à partir d'un diagnostic des besoins.",
    heroImage: `${CDN}/expertise-formation_8b10c911.jpg`,
    approach: {
      title: "Notre approche",
      text: "La transformation avec des process de développement des soft skills et compétences managériales : programmes immersifs qui travaillent sur les comportements, pas seulement les connaissances. Les parcours sur-mesure : ingénierie pédagogique adaptée au contexte culturel et sectoriel de chaque organisation. Les programmes phares : Leadership avancé (pour les dirigeants confirmés), Emerging Management (pour les nouveaux managers), Shaping our Leaders (pour les hauts potentiels), Management de projet (méthodologies agiles et classiques). Notre modèle 70-20-10 combine apprentissage par l'expérience, interactions et formation formelle.",
      image: `${CDN}/expertise-workshop_7b2e8e40.jpg`,
    },
    benefits: {
      title: "Bénéfices concrets",
      items: [
        { icon: "01", label: "Montée en compétences", description: "Des programmes qui produisent des résultats mesurables sur le terrain." },
        { icon: "02", label: "Soft skills transformées", description: "Communication, leadership, intelligence émotionnelle — les compétences qui font la différence." },
        { icon: "03", label: "Préparation de la relève", description: "Identification et développement des hauts potentiels pour assurer la continuité." },
        { icon: "04", label: "ROI formation", description: "Chaque programme est évalué sur son impact business, pas seulement la satisfaction." },
      ],
    },
    useCases: {
      title: "Cas d'usage",
      cases: [
        { title: "Leadership avancé", context: "Programme pour 20 directeurs d'un groupe bancaire sur le leadership transformationnel.", result: "6 mois de parcours, 100% de complétion, 8 promotions en 12 mois." },
        { title: "Emerging Management", context: "Formation de 40 nouveaux managers dans le secteur industriel.", result: "Parcours hybride de 4 mois, satisfaction 4.6/5, réduction des conflits d'équipe de 60%." },
        { title: "Shaping our Leaders", context: "Programme hauts potentiels pour un groupe de 500 personnes.", result: "15 HP identifiés et accompagnés, 80% promus dans les 24 mois, culture de leadership renforcée." },
      ],
    },
    quote: {
      text: "Former n'est pas remplir un vase, c'est allumer un feu. Nos programmes visent la transformation durable des comportements.",
      author: "Jamal Belahrach — DEO Conseil",
    },
  },
  {
    slug: "transformation",
    title: "Transformation des hommes et des organisations",
    subtitle: "Alignement stratégique, transformation culturelle et digitale, management de transition",
    heroDescription: "Nous accompagnons les dirigeants et leurs équipes dans les mutations profondes de leur organisation, en alignant la vision stratégique avec les dynamiques humaines. Notre approche repose sur une compréhension fine des enjeux de pouvoir, de culture et de performance pour créer des transformations durables.",
    heroImage: `${CDN}/expertise-strategie-rh_ddbdfe75.jpg`,
    approach: {
      title: "Notre approche",
      text: "Nous intervenons sur trois leviers complémentaires. L'alignement du top management : séminaires de cohésion CODIR, clarification de la vision partagée, définition des rôles et responsabilités. La conduite de stratégie de transformation culturelle et digitale : diagnostic culturel, cartographie des résistances, plan de communication et d'engagement, accompagnement terrain. Le management de transition : mise à disposition de managers expérimentés pour piloter les phases critiques de changement. Chaque intervention est conçue sur mesure, avec des indicateurs de succès définis en amont.",
      image: `${CDN}/expertise-consulting_ed5c6c3e.jpg`,
    },
    benefits: {
      title: "Bénéfices concrets",
      items: [
        { icon: "01", label: "Alignement stratégique", description: "Le top management partage une vision claire et agit de manière cohérente." },
        { icon: "02", label: "Adoption accélérée", description: "Les collaborateurs comprennent le pourquoi du changement et s'approprient les nouvelles pratiques." },
        { icon: "03", label: "Continuité opérationnelle", description: "Le management de transition assure la stabilité pendant les phases critiques." },
        { icon: "04", label: "Culture transformée", description: "Les nouvelles pratiques s'ancrent durablement dans l'ADN de l'organisation." },
      ],
    },
    useCases: {
      title: "Cas d'usage",
      cases: [
        { title: "Groupe industriel marocain", context: "Restructuration complète suite à une fusion de 3 entités — alignement de 3 cultures différentes.", result: "Politique unifiée déployée en 8 mois, réduction du turnover de 35%, CODIR aligné." },
        { title: "Banque panafricaine", context: "Transformation digitale sur 7 filiales en Afrique de l'Ouest.", result: "Taux d'adoption de 89% à J+90, managers relais formés, culture digitale ancrée." },
        { title: "PME technologique", context: "Passage de 50 à 200 collaborateurs en 2 ans, management de transition pour structurer la croissance.", result: "Organisation matricielle déployée, processus structurés, croissance maîtrisée." },
      ],
    },
    quote: {
      text: "La transformation n'est pas un événement, c'est un processus. Et ce processus est avant tout humain.",
      author: "Jamal Belahrach — DEO Conseil",
    },
  },
  {
    slug: "conseil-rh",
    title: "Conseil RH",
    subtitle: "Plateforme de management du capital humain, expérience collaborateur, marque employeur",
    heroDescription: "Une approche intégrée du capital humain pour construire des organisations performantes, attractives et résilientes. Nous concevons des écosystèmes RH complets qui placent le collaborateur au centre de la stratégie d'entreprise.",
    heroImage: `${CDN}/expertise-culture_a8c704ac.jpg`,
    approach: {
      title: "Notre approche",
      text: "Notre offre Conseil RH couvre l'ensemble du cycle de vie du capital humain. La plateforme de management du capital humain : audit organisationnel, schéma directeur RH, GPEC, référentiels de compétences. L'expérience collaborateur : parcours d'intégration, développement de carrière, qualité de vie au travail. La marque employeur et le marketing RH : proposition de valeur employeur, stratégie de communication RH, attractivité. Le baromètre social et Wellbeing@work : enquêtes d'engagement, diagnostic climat social, plans d'action. Les académies d'entreprise : création et animation d'universités internes.",
      image: `${CDN}/expertise-workspace_7345bfc4.jpg`,
    },
    benefits: {
      title: "Bénéfices concrets",
      items: [
        { icon: "01", label: "Attractivité renforcée", description: "Une marque employeur forte qui attire les meilleurs talents du marché." },
        { icon: "02", label: "Engagement durable", description: "Des collaborateurs qui comprennent le sens de leur travail et se sentent partie prenante." },
        { icon: "03", label: "Performance RH", description: "Des processus RH optimisés qui servent la performance globale de l'organisation." },
        { icon: "04", label: "Bien-être au travail", description: "Un environnement de travail qui favorise la santé, la motivation et la productivité." },
      ],
    },
    useCases: {
      title: "Cas d'usage",
      cases: [
        { title: "Marque employeur", context: "Construction de la proposition de valeur employeur pour un acteur tech en forte croissance.", result: "EVP définie, campagne de communication employeur, réduction du délai de recrutement de 45 à 22 jours." },
        { title: "Baromètre social", context: "Déploiement d'une enquête d'engagement pour un groupe de 5 000 collaborateurs.", result: "Taux de participation de 87%, plan d'action par entité, suivi trimestriel." },
        { title: "Académie d'entreprise", context: "Création d'une université interne pour un groupe bancaire de 3 000 collaborateurs.", result: "Programme de 18 mois, 120 managers formés, taux de promotion interne passé de 40% à 68%." },
      ],
    },
    quote: {
      text: "Le collaborateur est un client dont il faut s'occuper, qu'il faut écouter et impliquer. Nous entrons dans l'ère du capital humain comme facteur clé de compétitivité.",
      author: "Jamal Belahrach — DEO Conseil",
    },
  },
];

const allExpertises = expertisesData.map((e) => ({
  slug: e.slug,
  title: e.title,
  subtitle: e.subtitle,
}));

export default function ExpertiseDetail() {
  const params = useParams<{ slug: string }>();
  const expertise = expertisesData.find((e) => e.slug === params.slug);

  if (!expertise) {
    return (
      <>
        <div className="page-expertises">
          <div className="page-hero">
            <h1>Expertise non trouvée</h1>
            <p>Cette expertise n'existe pas.</p>
          </div>
          <div className="page-content" style={{ textAlign: "center", padding: "80px 20px" }}>
            <Link href="/expertises" className="btn-red">Retour aux expertises</Link>
          </div>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <div className="expertise-detail">
        {/* HERO */}
        <section className="ed-hero">
          <div className="ed-hero-content">
            <div className="ed-hero-breadcrumb">
              <Link href="/expertises">Expertises</Link> / {expertise.title}
            </div>
            <h1 className="ed-hero-title">{expertise.title}</h1>
            <p className="ed-hero-subtitle">{expertise.subtitle}</p>
            <a href="#contact" className="ed-hero-cta">Parlons-en</a>
          </div>
          <div className="ed-hero-image">
            <img src={expertise.heroImage} alt={expertise.title} />
          </div>
        </section>

        {/* INTRO — fond cream, style FabrikRH */}
        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">NOTRE EXPERTISE</span>
            <h2 className="pi-title">{expertise.title.split(' ').slice(0, -1).join(' ')} <span className="pi-red">{expertise.title.split(' ').slice(-1)[0]}</span></h2>
            <p className="pi-text">{expertise.heroDescription}</p>
          </div>
        </section>

        {/* APPROACH */}
        <section className="ed-approach">
          <div className="ed-approach-image">
            <img src={expertise.approach.image} alt={expertise.approach.title} />
          </div>
          <div className="ed-approach-content">
            <h2>{expertise.approach.title}</h2>
            <p>{expertise.approach.text}</p>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="ed-benefits">
          <h2>{expertise.benefits.title}</h2>
          <div className="ed-benefits-grid">
            {expertise.benefits.items.map((item, idx) => (
              <div key={idx} className="ed-benefit-card">
                <div className="ed-benefit-icon">{item.icon}</div>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* USE CASES */}
        <section className="ed-cases">
          <h2>{expertise.useCases.title}</h2>
          <div className="ed-cases-grid">
            {expertise.useCases.cases.map((c, idx) => (
              <div key={idx} className="ed-case-card">
                <div className="ed-case-num">{(idx + 1).toString().padStart(2, "0")}</div>
                <h3>{c.title}</h3>
                <div className="ed-case-context">
                  <span>Contexte</span>
                  <p>{c.context}</p>
                </div>
                <div className="ed-case-result">
                  <span>Résultat</span>
                  <p>{c.result}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUOTE */}
        <section className="ed-quote">
          <blockquote>
            <p>{expertise.quote.text}</p>
            <cite>{expertise.quote.author}</cite>
          </blockquote>
        </section>

        {/* NOS 4 PÔLES — identique à la page Expertises */}
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
      </div>
      <SiteFooter />
    </>
  );
}
