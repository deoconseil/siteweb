import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import SiteFooter from "@/components/SiteFooter";
import { gasGet } from "@/lib/gas";

interface GasActualite {
  id: string; slug: string; titre: string; date: string;
  categorie: string; extrait: string; contenu: string; image: string; publie: boolean;
}

/* ─────────────────────────────────────────────
   STATIC ACTUALITÉS DATA
───────────────────────────────────────────── */
const ACTUALITES: Record<string, {
  slug: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: React.ReactNode;
}> = {
  "lengagement": {
    slug: "lengagement",
    title: "L'engagement",
    author: "Kenza Belghiti",
    authorRole: "Consultante DEO Conseil",
    date: "11 avril 2022",
    category: "Réflexion",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-engagement_7d24ef29.jpg",
    excerpt: "S'investir dans la réussite d'une entreprise ou d'un projet de vie — qu'est-ce que l'engagement, et comment favoriser cet élan intérieur ?",
    content: (
      <>
        <p>
          S'investir dans la réussite d'une entreprise ou d'un projet associatif, d'un projet de vie, d'un couple, d'une transformation personnelle est l'enjeu de toute personne engagée. Comment favoriser cet engagement ? Comment faire naître le désir et la volonté de prendre pleinement part à ce défi ? Et qu'est-ce que l'engagement ?
        </p>
        <p>
          S'engager n'est pas uniquement le respect de certaines règles ou d'un cadre contractuel. De même, s'engager ne consiste pas uniquement en du militantisme et de l'activisme, dont les manifestations peuvent renvoyer parfois à des enjeux de pouvoir et à du rapport de force.
        </p>
        <h2>Un choix libre et conscient</h2>
        <p>
          L'engagement est un choix libre et conscient. Il s'agit d'un mouvement, d'un élan intérieur, d'un appel pour une cause qui nous anime. Une cause dont les enjeux éveillent notre désir de changement, d'évolution, de contribution à rendre les choses meilleures. On peut être touché par une idée, un projet, mais rester sur la berge et ne jamais plonger. Être embarqué dans l'aventure ne veut pas dire qu'on s'y engage.
        </p>
        <p>
          L'engagement nous met face à notre responsabilité par rapport aux situations que nous vivons et à nos devoirs vis-à-vis d'autrui. Il nous interpelle sur nos choix, nos actes, nos valeurs et notre cohérence.
        </p>
        <h2>La responsabilité comme fondement</h2>
        <p>
          Est-ce que nous sommes prêts à plonger dans les profondeurs de nous-mêmes ? Des profondeurs qui se révèlent au fur et à mesure que l'engagement s'affirme et s'assume.
        </p>
        <p>
          Un engagement — comme son étymologie l'indique « mettre en gage » — n'est pas gratuit. Il coûte. Il coûte peut-être le prix de notre indifférence, de notre individualisme, de notre égocentrisme.
        </p>
        <p>
          Il implique que nous ayons conscience du monde avec lequel nous interagissons, de notre impact, de notre inter-dépendance et du miroir que constitue notre réalité.
        </p>
        <h2>Le courage d'avancer</h2>
        <p>
          Il est toujours possible d'accuser l'autre, la situation, l'entreprise, se considérer impuissant face à ce que nous vivons. Mais soyons vigilants à ce que cette bonne conscience ne soit pas une belle planque pour se réfugier dans la non-action.
        </p>
        <p>
          Avons-nous le courage de prendre acte de notre responsabilité face à ce que nous vivons ? Avons-nous le courage d'accepter de voir le miroir de nous-même qui nous est présenté par l'extérieur ? Avons-nous le courage de nous laisser heurter, toucher, percuter et de décider en toute conscience de faire bouger les lignes ?
        </p>
        <p>
          Nous avons toujours le choix, celui de devenir acteur et co-créateur de notre réalité plutôt que de la subir. C'est notre libre-arbitre, faire le choix de la responsabilité, dont le sens premier est l'habilité à répondre et donc la capacité à agir.
        </p>
        <h2>Une opportunité de transformation</h2>
        <p>
          Chacun d'entre nous a été bousculé ces deux dernières années. Cette crise est venue nous confronter au sens que l'on souhaite donner à notre vie, à la notion de liberté, aux choix que nous devons opérer pour être plus cohérents avec nos valeurs et nos aspirations. Cette crise est une opportunité pour nous redéfinir — c'est une invitation à nous engager dans notre propre transformation intérieure.
        </p>
        <p>
          Je considère personnellement que l'enjeu de cette crise civilisationnelle, qui nous a arrêtés en pleine course effrénée, est de nous permettre de prendre conscience de notre interdépendance et d'œuvrer pour un vivre ensemble harmonieux et durable.
        </p>
        <h2>L'engagement comme puissance</h2>
        <p>
          La volonté et le désir de nous engager — cette mobilisation de soi, comme la nomme la philosophe Marie Robert — est une véritable puissance qui grandit petit à petit et qui vient rompre l'ordre établi, bousculer nos certitudes autant que nos habitudes.
        </p>
        <p>
          L'engagement nous offre le cadeau de devenir meilleur, pour soi, pour les autres et pour les causes qui nous animent. Être meilleurs en œuvrant à faire les 4 B comme les appelle Arouna Lipschitz, philosophe de la relation : le Bon, le Bien, le Beau de Platon, auxquels elle rajoute le Bio, dans le sens du vivifiant pour l'autre.
        </p>
        <blockquote>
          « Un engagement lorsqu'il est libre et conscient devient léger. Il nous met dans la joie, le plaisir et la créativité pour être meilleur. Meilleur pour soi, pour les autres, pour les organisations pour lesquelles nous œuvrons, et par conséquent pour le monde. »
        </blockquote>
      </>
    )
  },
  "transformation-leadership-authentique": {
    slug: "transformation-leadership-authentique",
    title: "Edito : Pas de transformation durable sans leadership authentique",
    author: "Jamal Belahrach",
    authorRole: "CEO & Co-Fondateur — DEO Conseil",
    date: "1er mars 2022",
    category: "Édito",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-leadership-authentique_5b1c9803.jpg",
    excerpt: "Le monde a changé, les modèles économiques ont évolué. Nos organisations ont besoin d'un leadership authentique, avec du cœur, à la fois fort et stimulant.",
    content: (
      <>
        <p>
          Le monde a changé, les modèles économiques ont évolué, les citoyens ont de nouvelles attentes et de nouvelles manières d'exprimer leurs colères. La tendance est aux discours populistes, devenus un cadre de référence pour servir les obscurantismes de tous bords.
        </p>
        <p>
          La pandémie a eu un impact plus qu'économique. Elle a modifié les rapports sociaux et nos priorités. Naïvement, j'ai cru que les dirigeants allaient repenser leurs façons de penser et d'agir ; être plus à l'écoute de ce qu'ont vécu leurs collaborateurs. Que nenni. Le business a repris « as usual ».
        </p>
        <p>
          Or, le besoin de se transformer, de se réinventer et la vitesse des changements que nous observons à travers le monde et au sein de notre propre pays nous commandent une révolution culturelle et un changement de paradigme imminents.
        </p>
        <h2>Un leadership avec du cœur</h2>
        <p>
          Pour ce faire, il faut à nos organisations — qu'elles soient publiques ou privées, partis politiques ou partenaires sociaux — un style de leadership authentique, avec du cœur, à la fois fort et stimulant, afin d'initier les transformations nécessaires et nous assurer un avenir dans ce monde incertain.
        </p>
        <p>
          La motivation et l'engagement à changer viennent des personnes que l'on a envie de suivre. Une organisation est forte lorsque le « nous » l'emporte sur le « je », lorsque le regard se porte vers le futur plutôt que vers le passé.
        </p>
        <h2>Le monde VUCA exige de nouveaux leaders</h2>
        <p>
          Dans ce nouveau monde VUCA (Volatile, Uncertain, Complex & Ambiguous), il faut à notre pays des hommes et des femmes aptes à bien comprendre ces enjeux et à nous conduire vers ce monde inclusif où chacun aura sa place. Ne pas craindre de bousculer les habitudes, de questionner l'histoire ainsi que le présent, pour mieux inventer le futur.
        </p>
        <p>
          Un leader doit être cette boussole pour l'entreprise, pour l'administration, pour toutes les organisations. Il prend des risques et agit en véritable entrepreneur.
        </p>
        <p>
          Car, faire la différence dans des marchés compétitifs, nécessite des talents dotés de la capacité de disrupter ces modèles économiques. C'est avec ce capital humain que l'on peut donner une impulsion de croissance réelle pour créer la richesse attendue.
        </p>
        <h2>Inspirer, entraîner, libérer</h2>
        <p>
          Ce leadership authentique, nous en avons besoin pour mener de véritables transformations qui combinent court terme et attentes de nos citoyens, de nos clients et de nos collaborateurs afin de voir loin, et surtout de voir juste.
        </p>
        <p>
          Ce leadership doit être inspirant, éclairant pour entraîner les personnes, stimuler leur créativité et les impliquer à tous les stades de l'évolution, quel que soit leur type d'organisation.
        </p>
        <p>
          Si chaque organisation était portée par des hommes et des femmes en capacité de réinitialiser la confiance, d'agir en tant que missionnaire, de faire briller les yeux de leurs équipes, alors nous ferions ce saut de croissance dont notre pays a besoin.
        </p>
        <h2>La fabrique de la nouvelle génération</h2>
        <p>
          Le défi de taille à relever sera que les dirigeants actuels acceptent d'être challengés par cette nouvelle famille d'hommes et de femmes qui vont inventer le Maroc de demain.
        </p>
        <p>
          Nos écoles, nos universités, nos associations, nos entreprises, notre administration, nos partenaires sociaux et nos partis politiques doivent être la fabrique de cette nouvelle génération.
        </p>
        <p>
          Les transformations nécessitent du courage car elles empruntent un chemin sans en connaître la destination finale.
        </p>
        <p>
          Pour cela, il nous faut plus de dirigeants visionnaires, capables de défricher de nouveaux espaces, de développer la créativité des hommes et des femmes, de libérer leurs énergies. Des dirigeants capables de créer des espaces d'expression et d'épanouissement avec des valeurs fortes, pour créer une société commune moins individualiste et davantage tournée vers le partage.
        </p>
        <blockquote>
          « Il n'y a pas de mauvaises herbes ou de mauvais hommes, il n'y a que de mauvais cultivateurs. » — Victor Hugo
        </blockquote>
      </>
    )
  }
};

const OTHER_ACTUALITES = [
  { slug: "lengagement", title: "L'engagement", category: "RÉFLEXION", date: "11 avril 2022", image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-engagement_7d24ef29.jpg" },
  { slug: "transformation-leadership-authentique", title: "Pas de transformation durable sans leadership authentique", category: "ÉDITO", date: "1er mars 2022", image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-leadership-authentique_5b1c9803.jpg" },
];

export default function ActualiteDetail() {
  const [, params] = useRoute("/actualites/:slug");
  const slug = params?.slug ?? "";

  const [gasArticle, setGasArticle] = useState<GasActualite | null>(null);
  const [allGasArticles, setAllGasArticles] = useState<GasActualite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await gasGet<GasActualite[]>({ action: "getActualites" });
        if (res.ok && res.data && res.data.length > 0) {
          const published = res.data.filter((a: GasActualite) => a.publie);
          setAllGasArticles(published);
          const found = published.find((a: GasActualite) => a.slug === slug);
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
        <div style={{ color: "#888", fontSize: "1.1rem" }}>Chargement...</div>
      </div>
    );
  }

  if (gasArticle) {
    const relatedGas = allGasArticles.filter(a => a.slug !== slug).slice(0, 2);
    return (
      <>
        <div className="bd-hero" style={gasArticle.image ? { backgroundImage: `url(${gasArticle.image})` } : {}}>
          <div className="bd-hero__overlay"></div>
          <div className="bd-hero__content">
            <span className="bd-hero__cat">{gasArticle.categorie}</span>
            <span className="bd-hero__sep"> · </span>
            <span className="bd-hero__date">{gasArticle.date}</span>
            <h1 className="bd-hero__title">{gasArticle.titre}</h1>
            <div className="bd-hero__author">
              <div className="bd-hero__avatar">D</div>
              <div>
                <div className="bd-hero__author-name">DEO Conseil</div>
                <div className="bd-hero__author-role">Cabinet de conseil RH</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bd-body">
          <div className="bd-main">
            <Link href="/actualites" className="bd-back">← Retour aux actualités</Link>
            <div
              className="bd-content bd-content--html"
              dangerouslySetInnerHTML={{ __html: gasArticle.contenu }}
            />
            <div className="bd-cta-block">
              <a href="/#contact" className="bd-cta-btn">PARLONS-EN →</a>
            </div>
          </div>
          <aside className="bd-sidebar">
            {relatedGas.length > 0 && (
              <div className="bd-sidebar__block">
                <h3 className="bd-sidebar__title">AUTRES ACTUALITÉS</h3>
                {relatedGas.map(r => (
                  <Link key={r.slug} href={`/actualites/${r.slug}`} className="bd-sidebar__card">
                    {r.image && <img src={r.image} alt={r.titre} className="bd-sidebar__img" />}
                    <div>
                      <span className="bd-sidebar__cat">{r.categorie}</span>
                      <p className="bd-sidebar__card-title">{r.titre}</p>
                      <span className="bd-sidebar__card-date">{r.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div className="bd-sidebar__block bd-sidebar__contact">
              <h3 className="bd-sidebar__title">PARLONS DE VOTRE PROJET</h3>
              <p>Nos consultants sont disponibles pour échanger sur vos enjeux RH.</p>
              <a href="/#contact" className="bd-sidebar__cta">PRENDRE CONTACT →</a>
            </div>
          </aside>
        </div>
        <SiteFooter />
      </>
    );
  }

  const article = ACTUALITES[slug];
  if (!article) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Article introuvable</h1>
        <p style={{ color: "#888", marginBottom: "1rem" }}>Cet article n'existe pas ou a été supprimé.</p>
        <Link href="/actualites" style={{ color: "var(--red)" }}>← Retour aux actualités</Link>
      </div>
    );
  }

  const related = OTHER_ACTUALITES.filter(a => a.slug !== slug);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <div className="bd-hero" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="bd-hero__overlay"></div>
        <div className="bd-hero__content">
          <span className="bd-hero__cat">{article.category}</span>
          <span className="bd-hero__sep"> · </span>
          <span className="bd-hero__date">{article.date}</span>
          <h1 className="bd-hero__title">{article.title}</h1>
          <div className="bd-hero__author">
            <div className="bd-hero__avatar">{article.author[0]}</div>
            <div>
              <div className="bd-hero__author-name">{article.author}</div>
              <div className="bd-hero__author-role">{article.authorRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BODY ═══ */}
      <div className="bd-body">
        <div className="bd-main">
          <Link href="/actualites" className="bd-back">← Retour aux actualités</Link>
          <div className="bd-content">
            {article.content}
          </div>
          <div className="bd-author-box">
            <div className="bd-author-box__avatar">{article.author[0]}</div>
            <div>
              <div className="bd-author-box__name">{article.author}</div>
              <div className="bd-author-box__role">{article.authorRole}</div>
              <p className="bd-author-box__bio">
                {article.author === "Jamal Belahrach"
                  ? "CEO de DEO Conseil International. Ses principales ambitions : connecter les dirigeants à l'évolution des enjeux du monde VUCA et de ses conséquences sur l'organisation en initiant des transformations écologiques, dont la principale ressource créatrice de valeur est le Capital Humain."
                  : "Consultante DEO Conseil, spécialisée dans l'accompagnement des transformations organisationnelles et le développement du leadership."}
              </p>
            </div>
          </div>
          <div className="bd-cta-block">
            <a href="#contact" className="bd-cta-btn">PARLONS-EN →</a>
          </div>
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <aside className="bd-sidebar">
          <div className="bd-sidebar__block">
            <h3 className="bd-sidebar__title">AUTRES ACTUALITÉS</h3>
            {related.map(r => (
              <Link key={r.slug} href={`/actualites/${r.slug}`} className="bd-sidebar__card">
                <img src={r.image} alt={r.title} className="bd-sidebar__img" />
                <div>
                  <span className="bd-sidebar__cat">{r.category}</span>
                  <p className="bd-sidebar__card-title">{r.title}</p>
                  <span className="bd-sidebar__card-date">{r.date}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="bd-sidebar__block bd-sidebar__contact">
            <h3 className="bd-sidebar__title">PARLONS DE VOTRE PROJET</h3>
            <p>Nos consultants sont disponibles pour échanger sur vos enjeux RH et de transformation.</p>
            <a href="#contact" className="bd-sidebar__cta">PRENDRE CONTACT →</a>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </>
  );
}
