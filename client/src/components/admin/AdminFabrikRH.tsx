import { useEffect, useState } from "react";
import { exportToXlsx, gasGet, gasPost } from "@/lib/gas";

interface FabrikEntry {
  ID: string;
  Date: string;
  Prenom: string;
  Nom: string;
  Email: string;
  Telephone: string;
  Ville?: string;
  Entreprise?: string;
  Fonction?: string;
  Interet?: string;
  FonctionActuelle?: string;
  ExperienceRH?: string;
  SecteurActivite?: string;
  DomainesExpertise?: string;
  RoleSouhaite?: string;
  Motivation?: string;
  SujetsInteret?: string;
  ContenuRH?: string;
  LienReference?: string;
  LinkedIn?: string;
  CVUrl?: string;
  Consentement?: string;
  ValidationDate?: string;
  Statut: string;
}

const STATUS_OPTIONS = [
  "Nouveau",
  "Profil validé",
  "À recontacter",
  "Non retenu",
] as const;

export default function AdminFabrikRH() {
  const [entries, setEntries] = useState<FabrikEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
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
      if (res.ok) {
        setEntries((res.data as FabrikEntry[]) || []);
      } else {
        setError(res.error || "Erreur GAS");
      }
    } catch {
      setError("Impossible de charger les données Fabrik RH. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (entryId: string, statut: string) => {
    setSavingId(entryId);
    setError("");
    try {
      const res = await gasPost({ action: "updateFabrikStatus", id: entryId, statut });
      if (!res.ok) {
        throw new Error(res.error || "Mise à jour impossible.");
      }
      await fetchEntries();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de la validation du profil.");
    } finally {
      setSavingId(null);
    }
  };

  const filtered = entries.filter((e) =>
    [
      e.Nom, e.Prenom, e.Email, e.Telephone, e.Ville,
      e.Entreprise, e.Fonction, e.Interet,
      e.FonctionActuelle, e.ExperienceRH, e.SecteurActivite, e.DomainesExpertise,
      e.RoleSouhaite, e.Motivation, e.SujetsInteret, e.ContenuRH, e.LienReference,
      e.LinkedIn, e.CVUrl, e.Consentement, e.Statut,
    ].some((v) => String(v || "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Demandes La Fabrik RH</h2>
          <span className="admin-badge admin-badge--red">{filtered.length} demande(s)</span>
        </div>
        <div className="admin-section__actions">
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search"
          />
          <button
            className="admin-btn admin-btn--outline"
            onClick={() => exportToXlsx(filtered as unknown as Record<string, unknown>[], "fabrik-rh-deo")}
          >
            ↓ Exporter XLSX
          </button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchEntries}>↻ Actualiser</button>
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
                <th>Identité</th>
                <th>Contact</th>
                <th>Profil RH</th>
                <th>Motivation & sujets</th>
                <th>Liens</th>
                <th>Consentement</th>
                <th>Statut</th>
                <th>Validation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="admin-empty">Aucune demande trouvée</td></tr>
              ) : (
                filtered.map((e) => {
                  const status = e.Statut || "Nouveau";
                  const profileSummary = [
                    e.FonctionActuelle || e.Fonction,
                    e.ExperienceRH,
                    e.SecteurActivite || e.Entreprise,
                    e.DomainesExpertise || e.Interet,
                  ].filter(Boolean).join(" • ");

                  return (
                    <tr key={e.ID}>
                      <td className="admin-td--date">{formatDate(e.Date)}</td>
                      <td>
                        <strong>{`${e.Prenom || ""} ${e.Nom || ""}`.trim() || "—"}</strong>
                        <div>{e.Ville || "—"}</div>
                      </td>
                      <td>
                        <div><a href={`mailto:${e.Email}`}>{e.Email || "—"}</a></div>
                        <div>{e.Telephone || "—"}</div>
                      </td>
                      <td>{profileSummary || "—"}</td>
                      <td>
                        <div><strong>Rôle:</strong> {e.RoleSouhaite || "—"}</div>
                        <div><strong>Motivation:</strong> {e.Motivation || "—"}</div>
                        <div><strong>Sujets:</strong> {e.SujetsInteret || "—"}</div>
                        <div><strong>Contenu RH:</strong> {e.ContenuRH || "—"}</div>
                      </td>
                      <td>
                        <div>{e.LinkedIn ? <a href={e.LinkedIn} target="_blank" rel="noreferrer">LinkedIn</a> : "LinkedIn: —"}</div>
                        <div>{e.CVUrl ? <a href={e.CVUrl} target="_blank" rel="noreferrer">CV</a> : "CV: —"}</div>
                        <div>{e.LienReference ? <a href={e.LienReference} target="_blank" rel="noreferrer">Référence</a> : "Référence: —"}</div>
                      </td>
                      <td>{e.Consentement || "—"}</td>
                      <td>
                        <span className={`admin-badge ${status === "Nouveau" ? "admin-badge--red" : "admin-badge--green"}`}>
                          {status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="admin-select"
                          value={status}
                          disabled={savingId === e.ID}
                          onChange={(event) => updateStatus(e.ID, event.target.value)}
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <div className="admin-muted-small">{e.ValidationDate ? formatDate(e.ValidationDate) : "—"}</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

