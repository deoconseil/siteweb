import { useState, FormEvent } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        setLocation("/admin");
      } else {
        setError("Email ou mot de passe incorrect.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img
            src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png"
            alt="DEO Conseil"
          />
        </div>
        <h1 className="admin-login-title">Espace Administration</h1>
        <p className="admin-login-sub">Connectez-vous pour accéder au tableau de bord</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="deoconseilrh@gmail.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
