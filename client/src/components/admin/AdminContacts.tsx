import { useState, useEffect } from "react";
import { gasGet, exportToXlsx } from "@/lib/gas";

interface Contact {
  ID: string;
  Date: string;
  Nom: string;
  Email: string;
  Telephone: string;
  Message: string;
  Statut: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getContacts" });
      if (res.ok) setContacts((res.data as Contact[]) || []);
      else setError(res.error || "Erreur GAS");
    } catch {
      setError("Impossible de charger les contacts. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce contact ?")) return;
    setDeleting(id);
    try {
      const res = await gasGet({ action: "deleteContact", id });
      if (res.ok) setContacts(prev => prev.filter(c => c.ID !== id));
      else alert("Erreur: " + res.error);
    } catch {
      alert("Erreur de connexion");
    } finally {
      setDeleting(null);
    }
  };

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

  const filtered = contacts.filter(c =>
    [c.Nom, c.Email, c.Message, c.Telephone].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Formulaires de contact</h2>
          <span className="admin-badge">{filtered.length} entrée(s)</span>
        </div>
        <div className="admin-section__actions">
          <input
            type="text"
            placeholder="Rechercher…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="admin-search"
          />
          <button
            className="admin-btn admin-btn--outline"
            onClick={() => exportToXlsx(filtered as unknown as Record<string, unknown>[], "contacts-deo")}
          >
            ↓ Exporter XLSX
          </button>
          <button className="admin-btn admin-btn--primary" onClick={fetchContacts}>
            ↺ Actualiser
          </button>
        </div>
      </div>

      {!loading && !error && contacts.length === 0 && (
        <p className="admin-hint">⚠️ Aucune donnée — vérifiez que VITE_GAS_URL est configuré et que la feuille "Contacts" existe dans votre Google Sheet.</p>
      )}

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Message</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="admin-empty">Aucun contact trouvé</td></tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.ID}>
                    <td className="admin-td--date">{formatDate(c.Date)}</td>
                    <td>{c.Nom || "—"}</td>
                    <td><a href={`mailto:${c.Email}`}>{c.Email}</a></td>
                    <td>{c.Telephone || "—"}</td>
                    <td className="admin-td--msg" title={c.Message}>
                      {c.Message?.length > 60 ? c.Message.slice(0, 60) + "…" : c.Message}
                    </td>
                    <td><span className="admin-status admin-status--green">{c.Statut}</span></td>
                    <td className="admin-td--actions">
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        onClick={() => handleDelete(c.ID)}
                        disabled={deleting === c.ID}
                        title="Supprimer"
                      >
                        {deleting === c.ID ? "…" : "🗑"}
                      </button>
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
