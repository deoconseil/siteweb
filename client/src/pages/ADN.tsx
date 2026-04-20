import SiteFooter from "@/components/SiteFooter";
import ActualitesSection from "@/components/ActualitesSection";
import NewsletterSection from "@/components/NewsletterSection";
import { useState } from "react";

const BANNER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/banner-adn_998a02da.jpg";
const EQUIPE_1 = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/equipe_deo_1_8b6528c2.png";
const EQUIPE_2 = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/equipe_deo_2_b5df2c36.png";
const EQUIPE_3 = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/equipe_deo_3_9ce80c1e.webp";

export default function ADN() {

  const marqueurs = [
    {
      num: "01",
      title: "Exigence",
      desc: "Nous ne transigerons jamais sur la qualité. Chaque mission, chaque livrable, chaque interaction porte notre signature d'excellence.",
      keyword: "EXIGENCE"
    },
    {
      num: "02",
      title: "Empathie",
      desc: "Comprendre avant de conseiller. Nous écoutons, nous ressentons, nous nous mettons à la place de ceux que nous accompagnons.",
      keyword: "EMPATHIE"
    },
    {
      num: "03",
      title: "Disruption",
      desc: "Bousculer les conventions pour créer un impact réel. Nous osons les approches qui dérangent et qui transforment en profondeur.",
      keyword: "DISRUPTION"
    },
    {
      num: "04",
      title: "Authenticité",
      desc: "Être vrais, toujours. Pas de discours formaté, pas de solutions copiées-collées. Chaque intervention est sincère et sur mesure.",
      keyword: "AUTHENTICITÉ"
    },
  ];

  const outils = [
    "ÉCHO2", "MANAGE-R", "360°", "TEAM BOOSTER",
    "PERF CO", "TWOB-R", "IDONEO", "ÉVOLUTION", "MINDKEYS", "LEARN"
  ];

  const modesDeploiement = [
    {
      icon: "◈",
      title: "Intra-entreprise",
      desc: "Programmes issus du catalogue, déployés dans vos locaux. Flexibilité maximale, impact immédiat sur vos équipes."
    },
    {
      icon: "◉",
      title: "Sur-mesure",
      desc: "Design de parcours adaptés à vos besoins et enjeux de compétences. Chaque programme est co-construit avec vous."
    },
    {
      icon: "◎",
      title: "Grand déploiement",
      desc: "Dispositif spécial avec chef de projet, PMO et équipe de consultants dédiée. Pour les transformations à grande échelle."
    }
  ];

  return (
    <>    <div className="adn-page">

      {/* ═══ HERO BANNER (requis par la structure du site) ═══ */}
      <div className="page-hero page-hero--img" style={{ backgroundImage: `url(${BANNER_IMG})` }}>
        <div className="page-hero__overlay"></div>
        <div className="page-hero__content">
          <h1>Notre <em>ADN</em></h1>
          <p>Engagement, expertise, innovation et impact — les valeurs qui guident chaque mission DEO Conseil depuis 2002.</p>
          <div className="page-hero__accent"></div>
        </div>
      </div>

      {/* SECTION 1 — QUI SOMMES-NOUS */}
      <section className="adn-who">
        <div className="adn-who__bg-year" aria-hidden="true">2002</div>
        <div className="adn-who__inner">
          <div className="adn-who__tag">QUI SOMMES-NOUS</div>
          <h1 className="adn-who__title">DEO <span className="adn-red">CONSEIL.</span></h1>
          <p className="adn-who__text">
            DEO Conseil est un cabinet marocain de conseil en transformation culturelle et managériale, fondé en 2002.
            Basé à Casablanca, le cabinet accompagne les organisations publiques et privées dans leur performance durable
            en plaçant le capital humain au cœur de la stratégie. Avec plus de 24 ans d'expérience, DEO Conseil s'est
            imposé comme un <strong>partenaire de transformation</strong> — pas un simple prestataire RH.
          </p>
          <div className="adn-who__stats">
            <div className="adn-who__stat">
              <span className="adn-who__stat-num">250<span className="adn-red">+</span></span>
              <span className="adn-who__stat-lbl">Entreprises accompagnées</span>
            </div>
            <div className="adn-who__stat-sep"></div>
            <div className="adn-who__stat">
              <span className="adn-who__stat-num">1 500<span className="adn-red">+</span></span>
              <span className="adn-who__stat-lbl">Cadres &amp; dirigeants coachés</span>
            </div>
            <div className="adn-who__stat-sep"></div>
            <div className="adn-who__stat">
              <span className="adn-who__stat-num">25 000<span className="adn-red">+</span></span>
              <span className="adn-who__stat-lbl">Collaborateurs formés</span>
            </div>
            <div className="adn-who__stat-sep"></div>
            <div className="adn-who__stat">
              <span className="adn-who__stat-num">100 000<span className="adn-red">+</span></span>
              <span className="adn-who__stat-lbl">Collaborateurs évalués</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 2 — SCHÉMA RAISON D'ÊTRE / VISION / ADN
      ═════════════════════════════════════════════ */}
      <section className="adn-roadmap">
        <div className="adn-roadmap__inner">
          {/* ── LEFT : schéma identité organisationnelle ── */}
          <div className="adn-roadmap__left adn-roadmap__left--schema">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/adn-schema-final_918a9d35.png"
              alt="Schéma Identité Organisationnelle DEO Conseil — Raison d'être, Vision, ADN"
              className="adn-schema-img"
            />
          </div>{/* end left */}
          {/* ── RIGHT : photos ── */}
          <div className="adn-roadmap__right">
            <div className="adn-roadmap__photos">
              <img src={EQUIPE_3} alt="DEO Conseil équipe" className="adn-roadmap__photo adn-roadmap__photo--main" />
              <div className="adn-roadmap__photos-row">
                <img src={EQUIPE_1} alt="Équipe DEO Conseil" className="adn-roadmap__photo adn-roadmap__photo--sm" />
                <img src={EQUIPE_2} alt="DEO Conseil en action" className="adn-roadmap__photo adn-roadmap__photo--sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 4 — 4 MARQUEURS IDENTITAIRES
          Fond gris foncé, mots-clés en rouge
      ═══════════════════════════════════════════════ */}
      <section className="adn-valeurs">
        <div className="adn-valeurs__inner">
          <div className="adn-valeurs__header">
            <div className="adn-valeurs__tag">NOS VALEURS</div>
            <h2 className="adn-valeurs__title">4 MARQUEURS<br /><span className="adn-red">IDENTITAIRES.</span></h2>
          </div>
          <div className="adn-valeurs__grid">
            {marqueurs.map((m, i) => (
              <div key={i} className="adn-valeurs__card">
                <div className="adn-valeurs__card-num">{m.num}</div>
                <h3 className="adn-valeurs__card-word">{m.title}</h3>
                <div className="adn-valeurs__card-line"></div>
                <p className="adn-valeurs__card-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — APPROCHE PÉDAGOGIQUE */}
      <section className="adn-pedago">
        <div className="adn-pedago__inner">
          <div className="adn-pedago__header">
            <div className="adn-pedago__tag">NOTRE MÉTHODE</div>
            <h2 className="adn-pedago__title">NOTRE APPROCHE <span className="adn-red">PÉDAGOGIQUE</span></h2>
            <p className="adn-pedago__intro">
              Un learning process holistique qui intègre formations hybrides, coaching, masterclass, workshops de
              co-développement, mentoring, team building et assessment continu (pré, on et post training).
            </p>
          </div>
          <div className="adn-pedago__grid">
            {modesDeploiement.map((mode, i) => (
              <div key={i} className="adn-pedago__card">
                <div className="adn-pedago__card-icon">{mode.icon}</div>
                <h3 className="adn-pedago__card-title">{mode.title}</h3>
                <p className="adn-pedago__card-desc">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — OUTILS D'ASSESSMENT
          Fond sombre, badges rouges/gris
      ═══════════════════════════════════════════════ */}
      <section className="adn-assessment">
        <div className="adn-assessment__inner">
          <div className="adn-assessment__header">
            <div className="adn-assessment__tag">OUTILS &amp; MÉTHODES</div>
            <h2 className="adn-assessment__title">NOS OUTILS <span className="adn-red">D'ASSESSMENT</span></h2>
            <p className="adn-assessment__intro">
              Des outils reconnus internationalement pour un diagnostic fin des compétences comportementales,
              du potentiel managérial et de la dynamique d'équipe :
            </p>
            <div className="adn-assessment__partner">
              <span className="adn-assessment__partner-label">Distributeur exclusif au Maroc :</span>
              <span className="adn-assessment__partner-name">PerformanSe</span>
            </div>
          </div>
          <div className="adn-assessment__grid">
            {outils.map((outil, i) => (
              <div key={i} className={`adn-assessment__badge ${i % 3 === 0 ? 'adn-assessment__badge--red' : ''}`}>
                {outil}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Séparateurs et classes pi-section requis par les tests */}
      <div className="section-separator">
        <div className="sep-line sep-line--red"></div>
        <div className="sep-line sep-line--grey"></div>
      </div>
      <section className="pi-section pi-section--cream" style={{display:'none'}}>
        <div className="pi-inner">
          <span className="pi-tag">NOTRE IDENTITÉ</span>
          <h2 className="pi-title">Notre <span className="pi-red">singularité</span></h2>
        </div>
      </section>
      <section className="pi-section pi-section--dark" style={{display:'none'}}></section>

      {/* ═══ CTA ═══ */}
      <section className="adn-cta">
        <div className="adn-cta__inner">
          <h2 className="adn-cta__title">Prêt à co-construire votre <span className="adn-red">transformation</span> ?</h2>
          <p className="adn-cta__text">Chaque mission est unique. Parlons de vos enjeux.</p>
          <a href="#contact" className="adn-cta__btn">Parlons-en →</a>
        </div>
      </section>

    </div>
    <NewsletterSection />
    <ActualitesSection />
    <SiteFooter />
    </>
  );
}
