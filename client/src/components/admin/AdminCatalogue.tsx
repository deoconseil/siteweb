import { useState, useEffect } from "react";
import { gasGet, exportToXlsx } from "@/lib/gas";

interface CatalogueEntry {
  ID: string;
  Date: string;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  Entreprise: string;
  Fonction: string;
  Statut: string;
}

export default function AdminCatalogue() {
  const [entries, setEntries] = useState<CatalogueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchEntries(); }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getCatalogue" });
      if (res.ok) setEntries((res.data as CatalogueEntry[]) || []);
      else setError(res.error || "Erreur GAS");
    } catch {
      setError("Impossible de charger les données Catalogue. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (val: unknown) => {
    if (!val) return "—";
    const s = String(val);
    if (s.includes("T")) {
      const d = new Date(s);
      return isNaN(d.getTime()) ? s : d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    return s;
  };

  const filtered = entries.filter(e =>
    [e.Nom, e.Prenom, e.Email, e.Entreprise].some(v =>
      String(v || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Téléchargements Catalogue</h2>
          <span className="admin-badge">{filtered.length} téléchargement(s)</span>
        </div>
        <div className="admin-section__actions">
          <input type="text" placeholder="Rechercher…" value={search}
            onChange={e => setSearch(e.target.value)} className="admin-search" />
          <button className="admin-btn admin-btn--outline"
            onClick={() => exportToXlsx(filtered as unknown as Record<string, unknown>[], "catalogue-deo")}>
            ↓ Exporter XLSX
          </button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchEntries}>↺ Actualiser</button>
        </div>
      </div>

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <p className="admin-hint">⚠️ Aucun téléchargement — vérifiez VITE_GAS_URL.</p>
      )}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Entreprise</th>
                <th>Fonction</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="admin-empty">Aucun téléchargement trouvé</td></tr>
              ) : (
                filtered.map(e => (
                  <tr key={e.ID}>
                    <td className="admin-td--date">{formatDate(e.Date)}</td>
                    <td>{e.Nom || "—"}</td>
                    <td>{e.Prenom || "—"}</td>
                    <td><a href={`mailto:${e.Email}`}>{e.Email}</a></td>
                    <td>{e.Telephone || "—"}</td>
                    <td>{e.Entreprise || "—"}</td>
                    <td>{e.Fonction || "—"}</td>
                    <td>
                      <span className={`admin-badge ${e.Statut === "Nouveau" ? "admin-badge--red" : ""}`}>
                        {e.Statut || "—"}
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
