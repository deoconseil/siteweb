const actualites = [
  {
    id: 1,
    slug: "transformation-leadership-authentique",
    category: "ÉDITO",
    date: "1er mars 2022",
    title: "Pas de transformation durable sans leadership authentique",
    excerpt: "Le monde a changé, les modèles économiques ont évolué. Nos organisations ont besoin d'un leadership authentique, avec du cœur, à la fois fort et stimulant.",
    readTime: "5 min",
  },
  {
    id: 2,
    slug: "lengagement",
    category: "RÉFLEXION",
    date: "11 avril 2022",
    title: "L'engagement",
    excerpt: "S'investir dans la réussite d'une entreprise ou d'un projet de vie — qu'est-ce que l'engagement, et comment favoriser cet élan intérieur libre et conscient ?",
    readTime: "4 min",
  },
  {
    id: 3,
    slug: null,
    category: "RH & STRATÉGIE",
    date: "02 Mars 2025",
    title: "Assessment center : pourquoi les entreprises marocaines l'adoptent massivement",
    excerpt: "L'évaluation des talents par mise en situation devient un standard. Retour sur les bonnes pratiques et les résultats observés chez nos clients.",
    readTime: "6 min",
  },
];

export default function ActualitesSection() {
  return (
    <>
      {/* Séparateur */}
      <div className="section-separator">
        <div className="sep-line sep-line--olive"></div>
        <div className="sep-line sep-line--lime"></div>
        <div className="sep-line sep-line--red"></div>
      </div>

      <section className="pi-section pi-section--dark">
        <div className="pi-inner">
          <span className="pi-tag">ACTUALITÉS</span>
          <h2 className="pi-title pi-title--white">
            Dernières <span className="pi-red">nouvelles</span>
          </h2>
          <div className="pi-grid pi-grid--3">
            {actualites.map((article) => (
              <div key={article.id} className="actu-card">
                <div className="actu-card-top">
                  <span className="actu-card-cat">{article.category}</span>
                  <span className="actu-card-date">{article.date}</span>
                </div>
                <h3 className="actu-card-title">{article.title}</h3>
                <p className="actu-card-excerpt">{article.excerpt}</p>
                <div className="actu-card-bottom">
                  <span className="actu-card-read">{article.readTime} de lecture</span>
                  <a
                    href={article.slug ? `/actualites/${article.slug}` : '/actualites'}
                    className="actu-card-link"
                  >
                    Lire →
                  </a>
                </div>
                <div className="actu-card-accent"></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="/actualites" className="pi-btn pi-btn--outline">Tous les articles →</a>
          </div>
        </div>
      </section>
    </>
  );
}
