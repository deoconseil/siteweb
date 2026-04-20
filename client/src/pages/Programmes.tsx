import { useEffect, useRef } from "react";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";

/* ── CDN Images ── */
const IMAGES = {
  leadership: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/leadership_ff61a7ab.jpg",
  equipe: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/engagement_93d9ac1f.jpeg",
  coaching: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/coaching_71ad9ed5.jpeg",
  management: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/managementdecomplexite_34135de5.jpeg", // photo engrenages — Management de la Complexité
  bienetre: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/bienetre_e984b8df.jpg",
};

const PROGRAMMES = [
  {
    id: 1,
    num: "01",
    title: "LEADERSHIP & TRANSFORMATION",
    tag: "MANAGEMENT & LEADERSHIP",
    image: IMAGES.leadership,
    intro: "Préparer les dirigeants et managers à piloter les grands chantiers marocains et à inspirer leurs équipes dans un monde en mutation.",
    impact: "Prépare les dirigeants et managers à piloter les grands chantiers marocains et à inspirer leurs équipes.",
    programmes: [
      { name: "Programme Leadership avancé", desc: "Donner du sens, conduire le changement, développer la gouvernance." },
      { name: "Leadership & affirmation de soi", desc: "Renforcer l'influence personnelle, gérer son stress, améliorer la performance collective." },
      { name: "Manager coach", desc: "Adopter la posture de coach, développer l'autonomie et la responsabilisation des équipes." },
    ],
    outcomes: [
      "Vision stratégique clarifiée et partagée",
      "Capacité à conduire le changement",
      "Gouvernance et prise de décision renforcées",
      "Équipes plus autonomes et responsabilisées",
    ],
    bg: "dark", // fond noir
  },
  {
    id: 2,
    num: "02",
    title: "ENGAGEMENT & PERFORMANCE COLLECTIVE",
    tag: "PERFORMANCE & ENGAGEMENT",
    image: IMAGES.equipe,
    intro: "Répondre directement au défi de l'engagement et de la productivité dans les organisations marocaines.",
    impact: "Répond directement au défi de l'engagement et de la productivité.",
    programmes: [
      { name: "Management positif", desc: "Développer la confiance, l'empowerment et la responsabilisation." },
      { name: "Motiver son équipe au quotidien", desc: "Donner du sens, reconnaître, casser la routine." },
      { name: "Mobiliser son équipe autour d'objectifs", desc: "Objectifs clairs, indicateurs de performance, communication d'alignement." },
    ],
    outcomes: [
      "Engagement des collaborateurs mesuré et amélioré",
      "Réduction du turnover",
      "Performance collective accrue",
      "Culture de la reconnaissance installée",
    ],
    bg: "light", // fond blanc
  },
  {
    id: 3,
    num: "03",
    title: "SOFT SKILLS CRITIQUES",
    tag: "DÉVELOPPEMENT PERSONNEL",
    image: IMAGES.coaching,
    intro: "Aligner les collaborateurs aux compétences du 21e siècle — les compétences qui font la différence dans un monde VUCA.",
    impact: "Aligne les collaborateurs aux compétences du 21e siècle.",
    programmes: [
      { name: "Intelligence émotionnelle & leadership authentique", desc: "Développer la conscience de soi et l'empathie comme leviers de leadership." },
      { name: "Assertivité & communication bienveillante", desc: "Fluidifier les relations, limiter les conflits." },
      { name: "Créativité et pensée critique", desc: "Renforcer l'innovation et la prise de décision." },
    ],
    outcomes: [
      "Communication interpersonnelle améliorée",
      "Réduction des conflits",
      "Innovation et créativité stimulées",
      "Prise de décision plus éclairée",
    ],
    bg: "gray", // fond gris foncé
  },
  {
    id: 4,
    num: "04",
    title: "MANAGEMENT DE LA COMPLEXITÉ",
    tag: "MANAGEMENT AVANCÉ",
    image: IMAGES.management,
    intro: "Indispensable pour les projets complexes, souvent transverses et pluri-acteurs dans les grandes organisations marocaines.",
    impact: "Indispensable pour les projets complexes, souvent transverses et pluri-acteurs.",
    programmes: [
      { name: "Management transversal", desc: "Travailler sans lien hiérarchique, mobiliser des parties prenantes multiples." },
      { name: "Conduite du changement & transversalité", desc: "Accompagner les transformations organisationnelles." },
      { name: "Management interculturel", desc: "Travailler efficacement avec des équipes et partenaires de cultures différentes." },
    ],
    outcomes: [
      "Capacité à piloter des projets transverses",
      "Gestion des résistances au changement",
      "Collaboration interculturelle renforcée",
      "Influence sans autorité développée",
    ],
    bg: "light", // fond blanc
  },
  {
    id: 5,
    num: "05",
    title: "BIEN-ÊTRE & QUALITÉ DE VIE AU TRAVAIL",
    tag: "WELLBEING & RÉSILIENCE",
    image: IMAGES.bienetre,
    intro: "Réduire le turnover et soutenir la performance durable en plaçant le bien-être au cœur de la stratégie RH.",
    impact: "Réduit le turnover et soutient la performance durable.",
    programmes: [
      { name: "Santé & bien-être au travail", desc: "Intégrer le bien-être comme levier de performance et non comme contrainte." },
      { name: "Gérer son stress efficacement", desc: "Prévenir le burn-out, développer la résilience." },
      { name: "Estime de soi et équilibre émotionnel", desc: "Construire une base solide pour un leadership authentique." },
    ],
    outcomes: [
      "Réduction du stress et de l'absentéisme",
      "Prévention du burn-out",
      "Engagement des jeunes générations renforcé",
      "Performance durable dans le temps",
    ],
    bg: "dark", // fond noir
  },
];

export default function Programmes() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Scroll vers l'ancre hash après navigation depuis Home
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Attendre que le DOM soit rendu
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pm-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="page-programmes-v2">
        {/* ═══ HERO ═══ */}
        <section className="pm-hero">
          <div className="pm-hero__bg-num">DEO</div>
          <div className="pm-hero__inner">
            <div className="pm-hero__line" />
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/capskills-dark_9ff573c7.png"
              alt="CapSkills — Empowering People"
              className="pm-hero__capskills-logo"
            />
            <h1 className="pm-hero__title">
              PROGRAMMES<br />
              <span className="pm-hero__title-accent">SUR MESURE</span>
            </h1>
            <p className="pm-hero__subtitle">
              Des programmes cibles adaptés à vos besoins — ancrés dans la réalité des organisations marocaines et africaines.
            </p>
            <div className="pm-hero__stats">
              <div className="pm-hero__stat">
                <span className="pm-hero__stat-num">5</span>
                <span className="pm-hero__stat-lbl">Axes thématiques</span>
              </div>
              <div className="pm-hero__stat">
                <span className="pm-hero__stat-num">15+</span>
                <span className="pm-hero__stat-lbl">Programmes phares</span>
              </div>
              <div className="pm-hero__stat">
                <span className="pm-hero__stat-num">20+</span>
                <span className="pm-hero__stat-lbl">Ans d'expertise</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROGRAMMES MAGAZINE ═══ */}
        {PROGRAMMES.map((prog, index) => {
          const isReversed = index % 2 !== 0;
          const bgClass =
            prog.bg === "dark"
              ? "pm-section--dark"
              : prog.bg === "gray"
              ? "pm-section--gray"
              : "pm-section--light";

          return (
            <section
              key={prog.id}
              id={`prog-${prog.num}`}
              className={`pm-section ${bgClass} pm-animate`}
              ref={(el) => { sectionsRef.current[index] = el; }}
            >
              {/* Numéro géant en arrière-plan */}
              <div className="pm-section__bg-num">{prog.num}</div>

              <div className={`pm-section__inner ${isReversed ? "pm-section__inner--reversed" : ""}`}>
                {/* Colonne image */}
                <div className="pm-section__image-col">
                  <div className="pm-section__image-wrapper">
                    <img src={prog.image} alt={prog.title} className="pm-section__image" loading="lazy" />
                    <div className="pm-section__image-overlay" />
                    <div className="pm-section__image-num">{prog.num}</div>
                  </div>
                </div>

                {/* Colonne texte */}
                <div className="pm-section__text-col">
                  <span className="pm-section__tag">{prog.tag}</span>
                  <h2 className="pm-section__title">{prog.title}</h2>
                  <p className="pm-section__intro">{prog.intro}</p>

                  {/* Programmes */}
                  <div className="pm-section__programmes">
                    {prog.programmes.map((p, i) => (
                      <div key={i} className="pm-section__prog-item">
                        <span className="pm-section__prog-bullet">—</span>
                        <div>
                          <div className="pm-section__prog-name">{p.name}</div>
                          <p className="pm-section__prog-desc">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Encadré Impact */}
                  <div className="pm-section__impact">
                    <span className="pm-section__impact-label">IMPACT</span>
                    <p className="pm-section__impact-text">{prog.impact}</p>
                  </div>

                  {/* Outcomes */}
                  <div className="pm-section__outcomes">
                    {prog.outcomes.map((o, i) => (
                      <div key={i} className="pm-section__outcome-item">
                        <span className="pm-section__outcome-check">&#10003;</span>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ═══ CTA FINAL ═══ */}
        <section className="pm-cta">
          <div className="pm-cta__inner">
            <div className="pm-cta__line" />
            <h2 className="pm-cta__title">
              CONSTRUISONS VOTRE PROGRAMME <span className="pm-cta__title-accent">SUR MESURE</span>
            </h2>
            <a href="/#contact" className="pm-cta__btn">
              Parlons-en <span className="pm-cta__btn-arrow">→</span>
            </a>
          </div>
        </section>
      </div>
      <NewsletterSection />
      <SiteFooter />
    </>
  );
}
