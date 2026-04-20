import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import SiteFooter from "@/components/SiteFooter";
import { gasGet } from "@/lib/gas";

interface GasBlogPost {
  id: string;
  slug: string;
  titre: string;
  auteur: string;
  date: string;
  categorie: string;
  extrait: string;
  contenu: string;
  image: string;
  publie: boolean;
}

/* ─────────────────────────────────────────────
   STATIC ARTICLES DATA
───────────────────────────────────────────── */
const ARTICLES: Record<string, {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}> = {
  "engagement-collaborateurs": {
    slug: "engagement-collaborateurs",
    title: "L'engagement des collaborateurs : quels leviers ?",
    author: "Jamal Belahrach",
    date: "11 avril 2022",
    category: "Leadership & RH",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-engagement_2d636bf9.jpg",
    excerpt: "Dans le cadre de la Fabrik RH pour les VUCA Talks, nous abordons ce mois-ci le thème de l'engagement des collaborateurs.",
    content: (
      <>
        <p>
          Dans le cadre de la Fabrik RH pour les VUCA Talks, nous abordons ce mois-ci le thème de l'engagement des collaborateurs. Vaste sujet au sortir de la crise sanitaire mondiale de ces 2 dernières années, qui a mis à mal la sphère professionnelle.
        </p>
        <p>
          Jamal Belahrach nous explique dans cette nouvelle capsule ce qui permet de définir l'engagement du collaborateur : une stratégie d'entreprise claire, une plateforme de marque établie, une expérience collaborateurs et une culture d'entreprise définies ; autant d'éléments matériels et immatériels qui sont les principaux enjeux des organisations pour se réinventer.
        </p>
        <h2>Les leviers de l'engagement</h2>
        <p>
          L'engagement des collaborateurs ne se décrète pas. Il se construit, se cultive et s'entretient au quotidien. Les organisations qui réussissent à maintenir un haut niveau d'engagement partagent des caractéristiques communes :
        </p>
        <ul>
          <li><strong>Une stratégie d'entreprise claire et partagée</strong> — Les collaborateurs ont besoin de comprendre où va l'organisation et quel est leur rôle dans ce projet collectif.</li>
          <li><strong>Une plateforme de marque employeur solide</strong> — L'identité, les valeurs et la promesse employeur doivent être authentiques et vécues au quotidien.</li>
          <li><strong>Une expérience collaborateur soignée</strong> — De l'onboarding à l'offboarding, chaque moment compte pour renforcer ou éroder l'engagement.</li>
          <li><strong>Une culture d'entreprise vivante</strong> — Les rituels, les comportements managériaux et les pratiques RH façonnent la culture réelle, au-delà des valeurs affichées.</li>
        </ul>
        <h2>Le rôle du management de proximité</h2>
        <p>
          Le manager de proximité est le premier vecteur de l'engagement ou du désengagement. C'est lui qui traduit la stratégie en actions concrètes, qui reconnaît les efforts, qui crée les conditions d'un dialogue ouvert. Dans un monde post-pandémique où le travail hybride s'est généralisé, son rôle est plus crucial que jamais.
        </p>
        <p>
          Les études montrent que 70 % de la variance de l'engagement d'une équipe s'explique par le comportement du manager direct. Investir dans le développement des managers, c'est investir directement dans l'engagement des équipes.
        </p>
        <h2>Les enjeux post-Covid</h2>
        <p>
          La crise sanitaire a profondément reconfiguré les attentes des collaborateurs. Le sens au travail, l'équilibre vie professionnelle/vie personnelle, la flexibilité et la qualité des relations humaines sont devenus des critères déterminants. Les organisations qui n'ont pas su s'adapter font face à ce que les Anglo-Saxons appellent la « Great Resignation » — une vague de démissions sans précédent.
        </p>
        <p>
          Pour DEO Conseil, la réponse passe par une approche holistique qui combine transformation culturelle, développement du leadership et refonte des pratiques managériales. C'est le cœur de notre mission depuis plus de 20 ans.
        </p>
        <blockquote>
          « L'engagement n'est pas un programme RH. C'est le résultat d'une organisation qui donne du sens, qui reconnaît et qui fait confiance. » — Jamal Belahrach
        </blockquote>
      </>
    ),
  },

  "leadership-management-proximite": {
    slug: "leadership-management-proximite",
    title: "Un leadership inspirant et un management de proximité pour créer de la valeur",
    author: "Jamal Belahrach",
    date: "11 avril 2022",
    category: "Leadership & Management",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-leadership_6c3c804e.jpg",
    excerpt: "Pour reprendre une citation de Victor Hugo : « Il n'y a pas de mauvaises herbes ou de mauvais hommes, il n'y a que de mauvais cultivateurs ».",
    content: (
      <>
        <blockquote>
          « Il n'y a pas de mauvaises herbes ou de mauvais hommes, il n'y a que de mauvais cultivateurs. » — Victor Hugo
        </blockquote>
        <p>
          En effet, notre incapacité à créer les conditions de faire société ensemble et être dans une logique inclusive, nous entraîne inexorablement dans les abîmes.
        </p>
        <p>
          La vitesse des changements que nous observons à travers le monde et au sein de notre propre pays nous commande une révolution culturelle et un changement de paradigme imminents.
        </p>
        <h2>Un problème de stratégie ou d'hommes ?</h2>
        <p>
          À ISO périmètre de notre économie, nous devons changer notre manière d'appréhender notre développement. Passer de 3 % de croissance à 7 % pour entrer dans la voie de l'émergence est possible si nous posons le véritable problème : avons-nous un problème de stratégie ou d'hommes et de femmes pour les conduire ?
        </p>
        <p>
          En ce qui me concerne, la réponse est claire et ce, quel que soit l'organisation, publique ou privée. Ce sont les hommes et les femmes qui créent de la valeur, pas les institutions.
        </p>
        <p>
          Pour accélérer cette création de valeur, ils ont besoin d'être stimulés et de suivre quelqu'un qui leur donne le CAP et le sens du pourquoi (WHY) faire les choses pour qu'ils puissent, eux, se concentrer sur le quoi (WHAT) et le comment faire (HOW).
        </p>
        <h2>L'intelligence collective comme moteur</h2>
        <p>
          L'avènement de ce nouveau siècle et les évolutions comportementales qui vont avec insiste davantage sur le fait que l'intelligence collective est la base de la créativité et de l'innovation pour changer de modèle, voire de paradigme.
        </p>
        <p>
          Car faire la différence dans des marchés compétitifs nécessite des talents en capacité de « disrupter » les marchés et les modèles économiques et, partant, donne une impulsion de croissance réelle pour créer la richesse attendue.
        </p>
        <p>
          Pour ce faire, il faut à nos organisations, qu'elles soient publiques ou privées, partis politiques ou partenaires sociaux, un style de leadership inspirant, fort, stimulant et entraînant.
        </p>
        <h2>Management vs Leadership</h2>
        <p>
          La motivation et l'engagement à changer vient des personnes que l'on a envie de suivre. Une organisation est forte lorsque le <strong>Nous</strong> l'emporte sur le <strong>Je</strong>.
        </p>
        <p>
          Soyons clairs : je ne parle pas ici de management mais bien de leadership. La différence est de taille. Le management consiste à faire les choses bien. Le leadership, à faire les choses justes. Nos organisations ont besoin des deux.
        </p>
        <p>
          Dans ce nouveau monde VUCA (Volatile, Uncertain, Complexe et Ambiguous), il faut à notre pays des hommes et des femmes en capacité de bien comprendre ces enjeux et de nous conduire vers ce monde inclusif où chacun aura sa place.
        </p>
        <h2>Le courage de transformer</h2>
        <p>
          Ne pas avoir peur de bousculer les habitudes, de questionner l'histoire et le présent, pour mieux inventer le futur. On doit recruter un dirigeant pour ses capacités à inventer un futur possible, non pas pour ses réalisations passées.
        </p>
        <p>
          Un leader doit être cette boussole pour l'entreprise, pour l'administration, pour toutes les organisations. Il prend des risques et agit en véritable entrepreneur.
        </p>
        <p>
          Ce leadership, nous en avons besoin pour mener de véritables transformations qui combinent le court terme et répondre aux attentes des citoyens, des clients et des collaborateurs, mais également de voir loin, pour pouvoir voir juste.
        </p>
        <p>
          Celui-ci doit être inspirant, éclairant pour entraîner les personnes, stimuler leur créativité en les impliquant à tous les stades de l'évolution quel que soit leur type d'organisation.
        </p>
        <blockquote>
          « Si chaque organisation était portée par des hommes et des femmes capables de réinitialiser la confiance, d'agir en tant que missionnaire, de faire briller les yeux de leurs équipes, alors nos entreprises seraient compétitives, créeraient de la valeur durablement et donc, créeraient de l'emploi. » — Jamal Belahrach
        </blockquote>
        <p>
          Aujourd'hui, transformer son organisation, avoir les bonnes personnes à la bonne place n'est plus un choix mais bien une nécessité absolue.
        </p>
      </>
    ),
  },

  "monde-vuca": {
    slug: "monde-vuca",
    title: "Le monde VUCA, de quoi parle-t-on ?",
    author: "Jamal Belahrach",
    date: "30 mai 2022",
    category: "Transformation & Stratégie",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-vuca_a3541a4a.png",
    excerpt: "\"Nous sommes résolument entrés dans une nouvelle ère\" — Jamal Belahrach aborde les enjeux de ce monde Volatile, Incertain, Complexe et Ambigu.",
    content: (
      <>
        <p>
          « Nous sommes résolument entrés dans une nouvelle ère. » Jamal Belahrach, CEO de DEO Conseil, aborde aujourd'hui les enjeux de ce monde Volatile, Incertain (de l'anglais Uncertain), Complexe et Ambigu, auquel nous devons faire face.
        </p>
        <h2>Qu'est-ce que le monde VUCA ?</h2>
        <p>
          Le terme VUCA est un acronyme militaire américain apparu dans les années 1990 pour décrire le contexte géopolitique post-Guerre Froide. Il a depuis été largement adopté par le monde des affaires pour qualifier l'environnement dans lequel évoluent les organisations contemporaines.
        </p>
        <ul>
          <li><strong>V — Volatile</strong> : Les changements sont rapides, imprévisibles et d'une amplitude croissante. Ce qui était vrai hier peut être obsolète demain.</li>
          <li><strong>U — Uncertain (Incertain)</strong> : Le futur est difficile à anticiper. Les certitudes d'hier ne sont plus des garanties pour demain.</li>
          <li><strong>C — Complexe</strong> : Les problèmes sont multidimensionnels. Les causes et les effets sont difficiles à isoler. Les solutions simples ne fonctionnent plus.</li>
          <li><strong>A — Ambigu</strong> : Les signaux sont contradictoires. Les informations disponibles peuvent mener à des interprétations opposées.</li>
        </ul>
        <h2>Pourquoi ce concept est-il central pour les organisations ?</h2>
        <p>
          Le monde VUCA n'est pas une crise passagère. C'est le nouvel état permanent de notre environnement. La pandémie de Covid-19, les disruptions technologiques, les tensions géopolitiques, la transition écologique — autant de forces qui amplifient chacune des dimensions du VUCA.
        </p>
        <p>
          Pour les organisations, cela signifie que les modèles de management traditionnels, fondés sur la planification à long terme, la hiérarchie rigide et la standardisation des processus, montrent leurs limites. Il faut repenser en profondeur la manière de diriger, d'organiser et de développer les talents.
        </p>
        <h2>La réponse VUCA : Vision, Understanding, Clarity, Agility</h2>
        <p>
          Face au monde VUCA, les experts en management ont développé une réponse symétrique, également désignée par l'acronyme VUCA :
        </p>
        <ul>
          <li><strong>V — Vision</strong> : Donner un cap clair, une direction inspirante qui mobilise les équipes malgré l'incertitude.</li>
          <li><strong>U — Understanding (Compréhension)</strong> : Développer la capacité à écouter, analyser et comprendre les signaux faibles de l'environnement.</li>
          <li><strong>C — Clarity (Clarté)</strong> : Simplifier, prioriser et communiquer avec précision pour réduire l'ambiguïté.</li>
          <li><strong>A — Agility (Agilité)</strong> : Développer la capacité à s'adapter rapidement, à expérimenter et à apprendre de ses erreurs.</li>
        </ul>
        <h2>Le rôle du leader dans un monde VUCA</h2>
        <p>
          Dans ce contexte, le leader n'est plus celui qui a toutes les réponses. Il est celui qui pose les bonnes questions, qui crée les conditions de l'intelligence collective, qui maintient le cap tout en restant ouvert à la remise en question.
        </p>
        <p>
          Chez DEO Conseil, nous accompagnons les dirigeants et leurs équipes à développer les compétences nécessaires pour naviguer dans ce monde VUCA : leadership adaptatif, intelligence émotionnelle, pensée systémique, agilité organisationnelle.
        </p>
        <blockquote>
          « Dans un monde VUCA, la seule certitude est que nous devons apprendre à vivre avec l'incertitude. La vraie compétence du leader, c'est de transformer cette incertitude en opportunité. » — Jamal Belahrach
        </blockquote>
        <p>
          La Fabrik RH et les VUCA Talks sont des espaces que DEO Conseil a créés pour permettre aux dirigeants et aux professionnels RH d'explorer ensemble ces enjeux, de partager leurs expériences et de construire collectivement les réponses adaptées à leur contexte.
        </p>
      </>
    ),
  },
};

/* ─────────────────────────────────────────────
   RELATED ARTICLES (sidebar)
───────────────────────────────────────────── */
const ALL_ARTICLES = Object.values(ARTICLES);

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const [gasArticle, setGasArticle] = useState<GasBlogPost | null>(null);
  const [allGasArticles, setAllGasArticles] = useState<GasBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await gasGet<GasBlogPost[]>({ action: "getBlog" });
        if (res.ok && res.data && res.data.length > 0) {
          const published = res.data.filter((a: GasBlogPost) => a.publie);
          setAllGasArticles(published);
          const found = published.find((a: GasBlogPost) => a.slug === slug);
          if (found) setGasArticle(found);
        }
      } catch {
        // fallback to static
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ color: "#888", fontSize: "1.1rem" }}>Chargement de l'article…</div>
      </div>
    );
  }

  // Use GAS article if found
  if (gasArticle) {
    const related = allGasArticles.filter(a => a.slug !== slug).slice(0, 3);
    return (
      <>
        <section className="bd-hero">
          <div className="bd-hero__overlay" />
          {gasArticle.image && <img src={gasArticle.image} alt={gasArticle.titre} className="bd-hero__img" />}
          <div className="bd-hero__content">
            <div className="bd-hero__meta">
              <span className="bd-hero__cat">{gasArticle.categorie}</span>
              <span className="bd-hero__sep">·</span>
              <span className="bd-hero__date">{gasArticle.date}</span>
            </div>
            <h1 className="bd-hero__title">{gasArticle.titre}</h1>
            <div className="bd-hero__author">
              <div className="bd-hero__author-avatar">{(gasArticle.auteur || "D").charAt(0)}</div>
              <span>{gasArticle.auteur || "DEO Conseil"}</span>
            </div>
          </div>
        </section>
        <div className="bd-body">
          <article className="bd-article">
            <div className="bd-article__back">
              <Link href="/blog" className="bd-back-link">← Retour au blog</Link>
            </div>
            <div
              className="bd-article__content bd-article__content--html"
              dangerouslySetInnerHTML={{ __html: gasArticle.contenu }}
            />
            <div className="bd-author-box">
              <div className="bd-author-box__avatar">{(gasArticle.auteur || "D").charAt(0)}</div>
              <div className="bd-author-box__info">
                <div className="bd-author-box__name">{gasArticle.auteur || "DEO Conseil"}</div>
                <p className="bd-author-box__bio">Consultant DEO Conseil — Cabinet de conseil en développement stratégique, RH et management depuis 2002.</p>
              </div>
            </div>
          </article>
          <aside className="bd-sidebar">
            {related.length > 0 && (
              <div className="bd-sidebar__section">
                <div className="bd-sidebar__title">Articles associés</div>
                <div className="bd-sidebar__list">
                  {related.map(rel => (
                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="bd-sidebar__card">
                      {rel.image && <img src={rel.image} alt={rel.titre} className="bd-sidebar__card-img" />}
                      <div className="bd-sidebar__card-body">
                        <div className="bd-sidebar__card-cat">{rel.categorie}</div>
                        <div className="bd-sidebar__card-title">{rel.titre}</div>
                        <div className="bd-sidebar__card-date">{rel.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="bd-sidebar__cta">
              <div className="bd-sidebar__cta-title">Parlons de votre projet</div>
              <p className="bd-sidebar__cta-text">Nos consultants sont disponibles pour échanger sur vos enjeux RH et de transformation.</p>
              <a href="/#contact" className="bd-sidebar__cta-btn">Prendre contact →</a>
            </div>
          </aside>
        </div>
        <SiteFooter />
      </>
    );
  }

  // Fallback to static article
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="blog-detail-notfound">
        <h1>Article introuvable</h1>
        <p style={{ color: "#888", marginBottom: "1rem" }}>Cet article n'existe pas ou a été supprimé.</p>
        <Link href="/blog">← Retour au blog</Link>
      </div>
    );
  }

  const related = ALL_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bd-hero">
        <div className="bd-hero__overlay" />
        <img src={article.image} alt={article.title} className="bd-hero__img" />
        <div className="bd-hero__content">
          <div className="bd-hero__meta">
            <span className="bd-hero__cat">{article.category}</span>
            <span className="bd-hero__sep">·</span>
            <span className="bd-hero__date">{article.date}</span>
          </div>
          <h1 className="bd-hero__title">{article.title}</h1>
          <div className="bd-hero__author">
            <div className="bd-hero__author-avatar">{article.author.charAt(0)}</div>
            <span>{article.author}</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="bd-body">
        {/* Main content */}
        <article className="bd-article">
          <div className="bd-article__back">
            <Link href="/blog" className="bd-back-link">
              ← Retour au blog
            </Link>
          </div>
          <div className="bd-article__content">
            {article.content}
          </div>

          {/* Author box */}
          <div className="bd-author-box">
            <div className="bd-author-box__avatar">{article.author.charAt(0)}</div>
            <div className="bd-author-box__info">
              <div className="bd-author-box__name">{article.author}</div>
              <p className="bd-author-box__bio">
                CEO de DEO Conseil International. Ses principales ambitions : connecter les dirigeants à l'évolution des enjeux du monde VUCA et de ses conséquences sur l'organisation en initiant des transformations écologiques, dont la principale ressource créatrice de valeur est le Capital Humain.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="bd-sidebar">
          <div className="bd-sidebar__section">
            <div className="bd-sidebar__title">Articles associés</div>
            <div className="bd-sidebar__list">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="bd-sidebar__card">
                  <img src={rel.image} alt={rel.title} className="bd-sidebar__card-img" />
                  <div className="bd-sidebar__card-body">
                    <div className="bd-sidebar__card-cat">{rel.category}</div>
                    <div className="bd-sidebar__card-title">{rel.title}</div>
                    <div className="bd-sidebar__card-date">{rel.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA contact */}
          <div className="bd-sidebar__cta">
            <div className="bd-sidebar__cta-title">Parlons de votre projet</div>
            <p className="bd-sidebar__cta-text">Nos consultants sont disponibles pour échanger sur vos enjeux RH et de transformation.</p>
            <a href="/#contact" className="bd-sidebar__cta-btn">Prendre contact →</a>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </>
  );
}
