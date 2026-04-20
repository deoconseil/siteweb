import { useState, FormEvent, useRef } from "react";
import { gasPost } from "@/lib/gas";

export default function SiteFooter() {
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const telephone = formData.get("telephone") as string || "";
    const entreprise = formData.get("entreprise") as string;
    const message = formData.get("message") as string;

    try {
      const res = await gasPost({
        action: "submitContact",
        prenom, nom, email, telephone,
        entreprise: entreprise || "",
        message,
        source: "footer",
      });
      if (res.ok) {
        setContactStatus("sent");
        form.reset();
      } else {
        // Fallback: mailto
        const subject = encodeURIComponent(`[DEO Conseil] Message de ${prenom} ${nom}`);
        const body = encodeURIComponent(`Prénom: ${prenom}\nNom: ${nom}\nEmail: ${email}\nEntreprise: ${entreprise || "Non renseignée"}\n\nMessage:\n${message}`);
        window.open(`mailto:contact@deoconseil.com?subject=${subject}&body=${body}`, "_self");
        setContactStatus("sent");
        form.reset();
      }
    } catch {
      const subject = encodeURIComponent(`[DEO Conseil] Message de ${prenom} ${nom}`);
      const body = encodeURIComponent(`Prénom: ${prenom}\nNom: ${nom}\nEmail: ${email}\nEntreprise: ${entreprise || "Non renseignée"}\n\nMessage:\n${message}`);
      window.open(`mailto:contact@deoconseil.com?subject=${subject}&body=${body}`, "_self");
      setContactStatus("sent");
      form.reset();
    }
  };

  return (
    <>
      {/* ═══ CONTACT V2 — DARK PREMIUM ═══ */}
      <section className="contact-v2" id="contact">
        <div className="cv2-bg-text" aria-hidden="true">CONTACT</div>
        <div className="cv2-deco-lines" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>

        <div className="cv2-inner">
          {/* Left: Info */}
          <div className="cv2-info">
            <div className="cv2-tag">PARLONS-EN</div>
            <h2 className="cv2-title">
              PRÊT À <em>TRANSFORMER</em><br />
              VOTRE ORGANISATION<span className="cv2-title-q">?</span>
            </h2>
            <p className="cv2-subtitle">
              Un projet de transformation organisationnelle, une question sur la stratégie RH, une mission de coaching ou un besoin en assessment ? Notre équipe répond sous 24h.
            </p>

            <div className="cv2-contacts">
              <a href="tel:+212522944274" className="cv2-contact-item">
                <div className="cv2-contact-icon cv2-contact-icon--red">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <span className="cv2-contact-label">Téléphone</span>
                  <span className="cv2-contact-value">+212 (0)5 22 94 42 74</span>
                  <span className="cv2-contact-value">+212 (0)5 22 94 42 77</span>
                </div>
              </a>
              <a href="mailto:contact@deoconseil.com" className="cv2-contact-item">
                <div className="cv2-contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <span className="cv2-contact-label">Email</span>
                  <span className="cv2-contact-value">contact@deoconseil.com</span>
                </div>
              </a>
              <a href="https://wa.me/212664022630" target="_blank" rel="noreferrer" className="cv2-contact-item">
                <div className="cv2-contact-icon cv2-contact-icon--green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <span className="cv2-contact-label">WhatsApp Business</span>
                  <span className="cv2-contact-value">+212 6 64 02 26 30</span>
                </div>
              </a>
              <a href="https://maps.google.com/?q=37+Rue+Jalal+Eddine+Sayouti+R%C3%A9sidence+Malika+Casablanca" target="_blank" rel="noreferrer" className="cv2-contact-item">
                <div className="cv2-contact-icon cv2-contact-icon--muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <span className="cv2-contact-label">37 Rue Jalal Eddine Sayouti, Rés. Malika, 3ème étage, App. 16</span>
                  <span className="cv2-contact-value">Casablanca, Maroc — Voir sur Google Maps</span>
                  <span className="cv2-contact-parking">🅿️ Stationnement disponible dans le parking de l'hôtel Onomo</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="cv2-form-wrap">
            <form className="cv2-form" ref={formRef} onSubmit={handleContactSubmit}>
              <input type="hidden" name="_subject" value="Nouveau message depuis deoconseil.com" />
              <div className="cv2-form-row">
                <div className="cv2-form-group">
                  <label htmlFor="cv2-prenom">Prénom</label>
                  <input id="cv2-prenom" name="prenom" type="text" placeholder="Votre prénom" required />
                </div>
                <div className="cv2-form-group">
                  <label htmlFor="cv2-nom">Nom</label>
                  <input id="cv2-nom" name="nom" type="text" placeholder="Votre nom" required />
                </div>
              </div>
              <div className="cv2-form-group">
                <label htmlFor="cv2-email">Email</label>
                <input id="cv2-email" name="email" type="email" placeholder="votre@entreprise.com" required />
              </div>
              <div className="cv2-form-row">
                <div className="cv2-form-group">
                  <label htmlFor="cv2-telephone">Téléphone</label>
                  <input id="cv2-telephone" name="telephone" type="tel" placeholder="+212 6XX XXX XXX" />
                </div>
                <div className="cv2-form-group">
                  <label htmlFor="cv2-entreprise">Entreprise</label>
                  <input id="cv2-entreprise" name="entreprise" type="text" placeholder="Nom de votre organisation" />
                </div>
              </div>
              <div className="cv2-form-group">
                <label htmlFor="cv2-message">Message</label>
                <textarea id="cv2-message" name="message" placeholder="Décrivez votre projet ou votre besoin..." required></textarea>
              </div>
              <button type="submit" className="cv2-submit" disabled={contactStatus === "sending"}>
                {contactStatus === "sending" ? "Envoi en cours…" : contactStatus === "sent" ? "Message envoyé ✓" : "Envoyer le message"}
                {contactStatus !== "sending" && contactStatus !== "sent" && <span className="cv2-submit-arrow">→</span>}
              </button>
              {contactStatus === "sent" && <p className="cv2-success">Merci ! Nous vous répondrons sous 24h.</p>}
              {contactStatus === "error" && <p className="cv2-error">Erreur. Réessayez ou appelez-nous directement.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer-v2">
        <div className="fv2-inner">
          <div className="fv2-top">
            <div className="fv2-brand">
              <img src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png" alt="DEO Conseil" className="fv2-logo" />
              <p className="fv2-desc">Cabinet de conseil RH spécialisé dans la transformation organisationnelle, le coaching dirigeants et le développement des compétences.</p>
              <div className="fv2-socials">
                <a href="https://www.linkedin.com/company/deo-conseil" target="_blank" rel="noreferrer" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/deoconseil" target="_blank" rel="noreferrer" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/deoconseil" target="_blank" rel="noreferrer" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
            <div className="fv2-links-group">
              <h4>Navigation</h4>
              <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/notre-adn">Notre ADN</a></li>
                <li><a href="/expertises">Expertises</a></li>
                <li><a href="/fabrik-rh">La Fabrik RH</a></li>
              </ul>
            </div>
            <div className="fv2-links-group">
              <h4>Expertises</h4>
              <ul>
                <li><a href="/expertises">Transformation</a></li>
                <li><a href="/expertises">Conseil RH</a></li>
                <li><a href="/expertises">Assessment & Coaching</a></li>
                <li><a href="/expertises">People Development (CapSkills)</a></li>
              </ul>
            </div>
            <div className="fv2-links-group">
              <h4>Contact</h4>
              <ul>
                <li className="fv2-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+212 (0)5 22 94 42 74</span>
                </li>
                <li className="fv2-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+212 (0)5 22 94 42 77</span>
                </li>
                <li className="fv2-contact-item fv2-contact-item--wa">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <a href="https://wa.me/212664022630" target="_blank" rel="noreferrer" style={{color:'#25D366'}}>+212 6 64 02 26 30</a>
                </li>
                <li className="fv2-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:contact@deoconseil.com" style={{color:"inherit",textDecoration:"underline",textUnderlineOffset:"3px"}}>contact@deoconseil.com</a>
                </li>
                <li className="fv2-contact-item fv2-contact-item--addr">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>37 Rue Jalal Eddine Sayouti, Rés. Malika, 3ème étage, Casablanca</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="fv2-bottom">
            <span>&copy; {new Date().getFullYear()} DEO Conseil International. Tous droits réservés.</span>
            <span>Cabinet de Conseil RH — Fondé en 2002</span>
          </div>
        </div>
      </footer>
    </>
  );
}
