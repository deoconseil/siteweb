import { useState, useEffect } from "react";
import { gasGet, exportToXlsx } from "@/lib/gas";

interface FabrikEntry {
  ID: string;
  Date: string;
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone: string;
  Entreprise: string;
  Fonction: string;
  Interet: string;
  Statut: string;
}

export default function AdminFabrikRH() {
  const [entries, setEntries] = useState<FabrikEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => { fetchEntries(); }, []);

  const formatDate = (val: unknown) => {
    if (!val) return "—";
    const s = String(val);
    if (s.includes("T")) {
      const d = new Date(s);
      return isNaN(d.getTime()) ? s : d.toLocaleDateString("fr-FR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
    }
    return s;
  };

  const fetchEntries = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getFabrikRH" });
      if (res.ok) setEntries((res.data as FabrikEntry[]) || []);
      else setError(res.error || "Erreur GAS");
    } catch {
      setError("Impossible de charger les données Fabrik RH. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = entries.filter(e =>
    [e.Nom, e.Prenom, e.Email, e.Entreprise, e.Interet].some(v =>
      String(v || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Demandes La Fabrik RH</h2>
          <span className="admin-badge admin-badge--red">{filtered.length} demande(s)</span>
        </div>
        <div className="admin-section__actions">
          <input type="text" placeholder="Rechercher…" value={search}
            onChange={e => setSearch(e.target.value)} className="admin-search" />
          <button className="admin-btn admin-btn--outline"
            onClick={() => exportToXlsx(filtered as unknown as Record<string, unknown>[], "fabrik-rh-deo")}>
            ↓ Exporter XLSX
          </button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchEntries}>↺ Actualiser</button>
        </div>
      </div>

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <p className="admin-hint">⚠️ Aucune demande — vérifiez VITE_GAS_URL ou attendez les premières soumissions.</p>
      )}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Entreprise</th>
                <th>Fonction</th>
                <th>Intérêt</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="admin-empty">Aucune demande trouvée</td></tr>
              ) : (
                filtered.map(e => (
                  <tr key={e.ID}>
                    <td className="admin-td--date">{formatDate(e.Date)}</td>
                    <td>{e.Prenom || "—"}</td>
                    <td>{e.Nom || "—"}</td>
                    <td><a href={`mailto:${e.Email}`}>{e.Email}</a></td>
                    <td>{e.Telephone || "—"}</td>
                    <td>{e.Entreprise || "—"}</td>
                    <td>{e.Fonction || "—"}</td>
                    <td>{e.Interet || "—"}</td>
                    <td>
                      <span className={`admin-badge ${e.Statut === "Nouveau" ? "admin-badge--red" : "admin-badge--green"}`}>
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
