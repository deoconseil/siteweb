import { useState, useEffect } from "react";
import { gasGet, exportToXlsx } from "@/lib/gas";

// GAS Newsletter sheet columns: ID, Date, Email, Statut
interface NewsletterEntry {
  ID: string;
  Date: string;
  Email: string;
  Statut: string;
  _row?: number;
}

export default function AdminNewsletter() {
  const [entries, setEntries] = useState<NewsletterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchEntries(); }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getNewsletter" });
      if (res.ok) {
        setEntries((res.data as NewsletterEntry[]) || []);
      } else {
        setError(res.error || "Erreur GAS");
      }
    } catch {
      setError("Impossible de charger les abonnés newsletter. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = entries.filter(e =>
    [e.Email, e.Statut].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (d: string) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) {
        return dt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
      }
    } catch {}
    return d;
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Abonnés Newsletter</h2>
          <span className="admin-badge">{entries.length} abonné(s)</span>
        </div>
        <div className="admin-section__actions">
          <input
            type="text"
            placeholder="Rechercher un email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="admin-search"
          />
          <button
            className="admin-btn admin-btn--outline"
            onClick={() => exportToXlsx(entries as unknown as Record<string, unknown>[], "newsletter-deo")}
          >
            ↓ Exporter CSV
          </button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchEntries}>↺ Actualiser</button>
        </div>
      </div>

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <p className="admin-hint">⚠️ Aucun abonné — vérifiez VITE_GAS_URL et que la feuille "Newsletter" existe dans votre Google Sheet.</p>
      )}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date d'inscription</th>
                <th>Email</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="admin-empty">Aucun abonné trouvé</td></tr>
              ) : (
                filtered.map(e => (
                  <tr key={e.ID}>
                    <td className="admin-td--date">{formatDate(String(e.Date))}</td>
                    <td><a href={`mailto:${e.Email}`}>{e.Email}</a></td>
                    <td>
                      <span className={`admin-status ${e.Statut === "Actif" ? "admin-status--green" : "admin-status--grey"}`}>
                        {e.Statut || "Actif"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
