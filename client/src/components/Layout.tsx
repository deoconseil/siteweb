import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "wouter";
import { gasPost } from "@/lib/gas";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-open catalogue modal when visiting /programmes-sur-mesure
  useEffect(() => {
    if (location === "/programmes-sur-mesure") {
      const timer = setTimeout(() => {
        setShowModal(true);
        setModalSubmitted(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`nav-fixed${scrolled ? " scrolled" : ""}`}>
        <div className="nav-topbar">
          <div className="topbar-socials">
            <a href="https://www.linkedin.com/company/deoconseil/" target="_blank" rel="noreferrer" className="s-li" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/deo_conseil/" target="_blank" rel="noreferrer" className="s-ig" title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://web.facebook.com/deoconseilrh/?_rdc=1&_rdr" target="_blank" rel="noreferrer" className="s-fb" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <div className="topbar-sep"></div>
          <a href="tel:+212522944274">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +212 (0)5 22 94 42 74
          </a>
          <span className="sep">|</span>
          <a href="https://wa.me/212664022630" target="_blank" rel="noreferrer" className="topbar-whatsapp">
            <svg viewBox="0 0 24 24" fill="#25D366" style={{width:14,height:14}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +212 6 64 02 26 30
          </a>
          <span className="sep">|</span>
          <a href="mailto:contact@deoconseil.com">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            contact@deoconseil.com
          </a>
        </div>
        <div className="nav-main">
          <a href="/" className="nav-logo">
            <img src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png" alt="DEO Conseil" />
          </a>
          <ul className="nav-links">
            <li><a href="/notre-adn" className={location === '/notre-adn' ? 'nav-active' : ''}>Notre ADN</a></li>
            <li><a href="/expertises" className={location.startsWith('/expertises') ? 'nav-active' : ''}>Expertises</a></li>
            <li><a href="/programmes-sur-mesure" className={location === '/programmes-sur-mesure' ? 'nav-active' : ''}>Programmes</a></li>
            <li><a href="/fabrik-rh" className={location === '/fabrik-rh' ? 'nav-active' : ''}>La Fabrik RH</a></li>
            <li><a href="/blog" className={location === '/blog' ? 'nav-active' : ''}>Blog DEO</a></li>
          </ul>
          <div className="nav-right">
            <button className="nav-cta-outline" onClick={(e) => { e.preventDefault(); setShowModal(true); setModalSubmitted(false); }}>↓ Catalogue</button>
            <a href="#contact" className="nav-cta">Parlons-en</a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <a href="/notre-adn" className={location === '/notre-adn' ? 'nav-active' : ''} onClick={() => setMobileOpen(false)}>Notre ADN</a>
            <a href="/expertises" className={location.startsWith('/expertises') ? 'nav-active' : ''} onClick={() => setMobileOpen(false)}>Expertises</a>
            <a href="/programmes-sur-mesure" className={location === '/programmes-sur-mesure' ? 'nav-active' : ''} onClick={() => setMobileOpen(false)}>Programmes</a>
            <a href="/fabrik-rh" className={location === '/fabrik-rh' ? 'nav-active' : ''} onClick={() => setMobileOpen(false)}>La Fabrik RH</a>
            <a href="/blog" className={location === '/blog' ? 'nav-active' : ''} onClick={() => setMobileOpen(false)}>Blog DEO</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
            <button className="nav-cta-outline" style={{width:'100%',textAlign:'center',marginTop:'8px'}} onClick={() => { setMobileOpen(false); setShowModal(true); setModalSubmitted(false); }}>↓ Catalogue</button>
          </div>
        )}
      </nav>
      <div className="nav-spacer"></div>

      {/* ── MAIN CONTENT ── */}
      {children}

      {/* ── CATALOGUE MODAL ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setModalSubmitted(false); }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setShowModal(false); setModalSubmitted(false); }}>×</button>
            <h2 className="modal-title">Télécharger notre catalogue</h2>
            {modalSubmitted ? (
              <div className="form-success">
                <p>✓ Merci ! Votre téléchargement démarre automatiquement.</p>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const payload = {
                  action: "submitCatalogue",
                  nom: fd.get("nom") as string,
                  prenom: fd.get("prenom") as string,
                  email: fd.get("email") as string,
                  telephone: fd.get("telephone") as string,
                  entreprise: fd.get("entreprise") as string,
                  fonction: fd.get("fonction") as string,
                };
                // Envoyer au GAS (sans bloquer le téléchargement)
                gasPost(payload).catch(() => {});
                setModalSubmitted(true);
                // Déclencher le téléchargement du PDF
                const link = document.createElement('a');
                link.href = 'https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/DEO-CONSEIL-Catalogue-CapSkills-2024-2025_8798a621.pdf';
                link.download = 'DEO-CONSEIL-Catalogue-CapSkills-2024-2025.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
                <div className="modal-row-2">
                  <input type="text" name="nom" required placeholder="Nom" className="modal-input" />
                  <input type="text" name="prenom" required placeholder="Prénom" className="modal-input" />
                </div>
                <input type="tel" name="telephone" placeholder="Téléphone" className="modal-input" />
                <input type="email" name="email" required placeholder="E-mail" className="modal-input" />
                <input type="text" name="entreprise" placeholder="Entreprise" className="modal-input" />
                <input type="text" name="fonction" placeholder="Fonction" className="modal-input" />
                <button type="submit" className="modal-submit">Télécharger le catalogue ↓</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── SCROLL TO TOP ── */}
      {scrollTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}
    </>
  );
}
