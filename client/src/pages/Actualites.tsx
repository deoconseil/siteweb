import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { gasGet } from "@/lib/gas";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-blog_f636c7e4.jpg";

interface ActualitePost {
  id: string;
  slug: string;
  titre: string;
  auteur?: string;
  date: string;
  categorie: string;
  extrait: string;
  image: string;
  publie: boolean;
}

// Articles statiques de secours
const STATIC_ACTUALITES: ActualitePost[] = [
  {
    id: "static-1",
    slug: "transformation-leadership-authentique",
    titre: "Edito : Pas de transformation durable sans leadership authentique",
    auteur: "Jamal Belahrach",
    date: "1er mars 2022",
    categorie: "ÉDITO",
    extrait: "Le monde a changé, les modèles économiques ont évolué. Nos organisations ont besoin d'un leadership authentique, avec du cœur, à la fois fort et stimulant, afin d'initier les transformations nécessaires.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-leadership-authentique_5b1c9803.jpg",
    publie: true
  },
  {
    id: "static-2",
    slug: "lengagement",
    titre: "L'engagement",
    auteur: "Kenza Belghiti",
    date: "11 avril 2022",
    categorie: "RÉFLEXION",
    extrait: "S'investir dans la réussite d'une entreprise ou d'un projet de vie — qu'est-ce que l'engagement, et comment favoriser cet élan intérieur libre et conscient ?",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/actu-engagement_7d24ef29.jpg",
    publie: true
  },
];

export default function Actualites() {
  const [articles, setArticles] = useState<ActualitePost[]>(STATIC_ACTUALITES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const res = await gasGet<ActualitePost[]>({ action: "getActualites" });
        if (res.ok && res.data && res.data.length > 0) {
          const published = res.data.filter(a => a.publie);
          if (published.length > 0) {
            setArticles(published);
          }
        }
      } catch {
        // Garder les articles statiques en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    fetchActualites();
  }, []);

  return (
    <>
      <div className="page-blog-v2">
        {/* ═══ HERO BANNER ═══ */}
        <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
          <div className="page-hero__overlay"></div>
          <div className="page-hero__content">
            <span className="page-hero__tag">ACTUALITÉS & ÉDITOS</span>
            <h1>Nos <em>Actualités</em></h1>
            <p>Éditos, réflexions et prises de position de l'équipe DEO Conseil sur les enjeux du monde du travail.</p>
            <div className="page-hero__accent"></div>
          </div>
        </div>

        {/* ═══ INTRO ═══ */}
        <section className="pi-section pi-section--cream">
          <div className="pi-inner">
            <span className="pi-tag">RÉFLEXIONS DEO</span>
            <h2 className="pi-title">Les prises de position de <span className="pi-red">l'équipe DEO</span></h2>
            <p className="pi-text" style={{ textAlign: 'justify' }}>
              Retrouvez les éditos, analyses et réflexions de nos experts sur les enjeux actuels du leadership, de la transformation et du capital humain.
            </p>
          </div>
        </section>

        {/* Séparateur */}
        <div className="section-separator">
          <div className="sep-line sep-line--red"></div>
          <div className="sep-line sep-line--lime"></div>
          <div className="sep-line sep-line--olive"></div>
        </div>

        {/* ═══ ARTICLES ═══ */}
        <section className="pi-section pi-section--dark">
          <div className="pi-inner">
            {loading ? (
              <div className="blog-v2-grid">
                {[1,2].map(i => (
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
                        {article.auteur && <span className="blog-v2-author">{article.auteur}</span>}
                        <span className="blog-v2-date">{article.date}</span>
                      </div>
                      <a href={`/actualites/${article.slug}`} className="blog-v2-link">Lire l'article →</a>
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

        {/* ═══ NEWSLETTER CTA ═══ */}
        <section className="pi-section pi-section--red">
          <div className="pi-inner pi-center">
            <h2 className="pi-title pi-title--white">Restez connecté aux <span style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '6px' }}>insights</span> DEO</h2>
            <p className="pi-text pi-text--white" style={{ textAlign: 'center' }}>Recevez nos dernières analyses et réflexions directement dans votre boîte mail.</p>
            <a href="#contact" className="pi-btn pi-btn--white">S'abonner →</a>
          </div>
        </section>
      </div>
      <NewsletterSection />
      <SiteFooter />
    </>
  );
}
