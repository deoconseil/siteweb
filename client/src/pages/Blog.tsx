import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";
import { gasGet } from "@/lib/gas";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-blog_f636c7e4.jpg";

interface BlogPost {
  id: string;
  slug: string;
  titre: string;
  auteur: string;
  date: string;
  categorie: string;
  extrait: string;
  image: string;
  publie: boolean;
}

// Articles statiques de secours (affichés si GAS non configuré)
const STATIC_ARTICLES: BlogPost[] = [
  {
    id: "static-1",
    slug: "engagement-collaborateurs",
    titre: "L'engagement des collaborateurs : quels leviers ?",
    auteur: "Jamal Belahrach",
    date: "11 avril 2022",
    categorie: "LEADERSHIP & RH",
    extrait: "Dans le cadre de la Fabrik RH pour les VUCA Talks, nous abordons le thème de l'engagement des collaborateurs. Stratégie claire, marque employeur, expérience collaborateurs et culture d'entreprise.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-engagement_2d636bf9.jpg",
    publie: true
  },
  {
    id: "static-2",
    slug: "leadership-management-proximite",
    titre: "Un leadership inspirant et un management de proximité pour créer de la valeur",
    auteur: "Jamal Belahrach",
    date: "11 avril 2022",
    categorie: "LEADERSHIP & MANAGEMENT",
    extrait: "Ce sont les hommes et les femmes qui créent de la valeur, pas les institutions. Pour accélérer cette création de valeur, ils ont besoin d'être stimulés et de suivre quelqu'un qui leur donne le CAP.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-leadership_6c3c804e.jpg",
    publie: true
  },
  {
    id: "static-3",
    slug: "monde-vuca",
    titre: "Le monde VUCA, de quoi parle-t-on ?",
    auteur: "Jamal Belahrach",
    date: "30 mai 2022",
    categorie: "TRANSFORMATION & STRATÉGIE",
    extrait: "Volatile, Incertain, Complexe et Ambigu — Jamal Belahrach aborde les enjeux de ce monde auquel nous devons faire face et comment les organisations peuvent y répondre.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/blog-vuca_a3541a4a.png",
    publie: true
  },
];

export default function Blog() {
  const [articles, setArticles] = useState<BlogPost[]>(STATIC_ARTICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await gasGet<BlogPost[]>({ action: "getBlog" });
        if (res.ok && res.data && res.data.length > 0) {
          // Filtrer uniquement les articles publiés
          const published = res.data.filter(a => a.publie);
          if (published.length > 0) {
            setArticles(published);
          }
          // Si aucun article publié dans GAS, garder les statiques
        }
      } catch {
        // En cas d'erreur, garder les articles statiques
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
    <div className="page-blog-v2">
      {/* ═══ HERO BANNER ═══ */}
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="page-hero__overlay"></div>
        <div className="page-hero__content">
          <span className="page-hero__tag">RÉFLEXIONS & INSIGHTS</span>
          <h1>Le Blog <em>DEO</em></h1>
          <p>Réflexions et insights sur le leadership, la RH et la transformation organisationnelle.</p>
          <div className="page-hero__accent"></div>
        </div>
      </div>

      {/* ═══ INTRO — fond cream ═══ */}
      <section className="pi-section pi-section--cream">
        <div className="pi-inner">
          <span className="pi-tag">NOS ACTUALITÉS</span>
          <h2 className="pi-title">Les réflexions de <span className="pi-red">Jamal Belahrach</span></h2>
          <p className="pi-text" style={{textAlign: 'justify'}}>Retrouvez les articles, analyses et éditos de notre expert sur les enjeux actuels du monde du travail, du leadership et de la transformation organisationnelle.</p>
        </div>
      </section>

      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--olive"></div>
      </div>

      {/* ═══ ARTICLES — fond dark ═══ */}
      <section className="pi-section pi-section--dark">
        <div className="pi-inner">
          {loading ? (
            <div className="blog-loading">
              <div className="blog-v2-grid">
                {[1,2,3].map(i => (
                  <div key={i} className="blog-v2-card blog-v2-card--skeleton">
                    <div className="blog-v2-image blog-skeleton-img"></div>
                    <div className="blog-v2-body">
                      <div className="blog-skeleton-line blog-skeleton-line--title"></div>
                      <div className="blog-skeleton-line"></div>
                      <div className="blog-skeleton-line blog-skeleton-line--short"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="blog-v2-grid">
              {articles.map((article) => (
                <article key={article.id} className="blog-v2-card">
                  <div className="blog-v2-image">
                    <img src={article.image} alt={article.titre} />
                    <span className="blog-v2-category">{article.categorie}</span>
                  </div>
                  <div className="blog-v2-body">
                    <h3 className="blog-v2-title">{article.titre}</h3>
                    <p className="blog-v2-excerpt">{article.extrait}</p>
                    <div className="blog-v2-footer">
                      <span className="blog-v2-author">{article.auteur}</span>
                      <span className="blog-v2-date">{article.date}</span>
                    </div>
                    <a
                      href={article.slug ? `/blog/${article.slug}` : '#'}
                      className="blog-v2-link"
                    >
                      Lire l'article →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--olive"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--red"></div>
      </div>

      {/* ═══ NEWSLETTER CTA — fond rouge ═══ */}
      <section className="pi-section pi-section--red">
        <div className="pi-inner pi-center">
          <h2 className="pi-title pi-title--white">Restez connecté aux <span style={{color: '#fff', textDecoration: 'underline', textUnderlineOffset: '6px'}}>insights</span> DEO</h2>
          <p className="pi-text pi-text--white" style={{textAlign: 'center'}}>Recevez nos dernières analyses et réflexions directement dans votre boîte mail.</p>
          <a href="#contact" className="pi-btn pi-btn--white">S'abonner →</a>
        </div>
      </section>
    </div>
    <NewsletterSection />
    <ActualitesSection />
    <SiteFooter />
    </>
  );
}
