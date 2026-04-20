import { useState, FormEvent } from "react";
import { gasPost } from "@/lib/gas";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");

    try {
      const res = await gasPost({
        action: "subscribeNewsletter",
        email: email.trim(),
        nom: nom.trim(),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
        setNom("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="nl">
      <div className="nl-accent"></div>
      <div className="nl-inner">
        <span className="nl-label">Newsletter</span>
        <h2 className="nl-title">Restez informé</h2>
        <p className="nl-desc">
          Recevez chaque mois nos analyses et insights sur le leadership, la RH et la transformation organisationnelle.
        </p>

        {status === "sent" ? (
          <div className="nl-success">
            <span>✓</span>
            <p>Merci, votre inscription a bien été enregistrée.</p>
          </div>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <div className="nl-row">
              <input
                type="text"
                className="nl-input"
                placeholder="Votre nom (optionnel)"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                disabled={status === "sending"}
              />
              <input
                type="email"
                className="nl-input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "sending"}
              />
              <button type="submit" className="nl-btn" disabled={status === "sending"}>
                {status === "sending" ? "…" : "S'abonner"}
              </button>
            </div>
            {status === "error" && (
              <p className="nl-error">Une erreur est survenue. Réessayez ou contactez-nous.</p>
            )}
            <p className="nl-privacy">Aucun spam. Désabonnement en un clic.</p>
          </form>
        )}
      </div>
    </section>
  );
}
