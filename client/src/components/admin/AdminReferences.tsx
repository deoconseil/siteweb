import { useState, useEffect, useRef } from "react";
import { gasGet, gasPost, uploadToCloudinary } from "@/lib/gas";

interface Reference {
  id: string;
  nom: string;
  logo: string;
  actif: boolean;
}

export default function AdminReferences() {
  const [refs, setRefs] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reference | null>(null);
  const [nom, setNom] = useState("");
  const [actif, setActif] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchRefs(); }, []);

  const fetchRefs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getReferences" });
      if (res.ok) setRefs((res.data as Reference[]) || []);
      else setError(res.error || "Erreur GAS");
    } catch {
      setError("Impossible de charger les références. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setNom("");
    setActif(true);
    setImageFile(null);
    setImagePreview("");
    setShowForm(true);
  };

  const openEdit = (ref: Reference) => {
    setEditing(ref);
    setNom(ref.nom);
    setActif(ref.actif);
    setImagePreview(ref.logo);
    setImageFile(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!nom.trim()) { alert("Le nom est requis."); return; }
    if (!editing && !imageFile) { alert("Veuillez choisir un logo."); return; }
    setSaving(true);
    try {
      let logoUrl = editing?.logo || "";
      if (imageFile) {
        const result = await uploadToCloudinary(imageFile, "references");
        logoUrl = result.url;
      }
      const payload = {
        action: "saveReference",
        ...(editing ? { id: editing.id } : {}),
        nom,
        logo: logoUrl,
        actif,
      };
      const res = await gasPost(payload);
      if (!res.ok) throw new Error(res.error);
      await fetchRefs();
      setShowForm(false);
    } catch (e: unknown) {
      alert("Erreur: " + (e instanceof Error ? e.message : "Vérifiez la connexion GAS."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ref: Reference) => {
    if (!confirm(`Supprimer "${ref.nom}" ?`)) return;
    try {
      const res = await gasGet({ action: "deleteReference", id: ref.id });
      if (res.ok) setRefs(prev => prev.filter(r => r.id !== ref.id));
      else alert("Erreur: " + res.error);
    } catch {
      alert("Erreur de connexion");
    }
  };

  const toggleActif = async (ref: Reference) => {
    try {
      const res = await gasPost({ action: "saveReference", id: ref.id, nom: ref.nom, logo: ref.logo, actif: !ref.actif });
      if (res.ok) setRefs(prev => prev.map(r => r.id === ref.id ? { ...r, actif: !r.actif } : r));
    } catch {
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Logos Références</h2>
          <span className="admin-badge">{refs.length} logo(s)</span>
        </div>
        <div className="admin-section__actions">
          <button className="admin-btn admin-btn--primary" onClick={openCreate}>+ Ajouter un logo</button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchRefs}>↺ Actualiser</button>
        </div>
      </div>

      <p className="admin-hint">Les logos actifs apparaissent dans les bandes défilantes de la page d'accueil.</p>

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && refs.length === 0 && (
        <p className="admin-hint">⚠️ Aucun logo — ajoutez le premier ou vérifiez VITE_GAS_URL.</p>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="admin-modal admin-modal--sm">
            <div className="admin-modal__header">
              <h3>{editing ? "Modifier le logo" : "Nouveau logo"}</h3>
              <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-field">
                <label>Nom de l'entreprise *</label>
                <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex: Maroc Telecom" />
              </div>
              <div className="admin-field">
                <label>Statut</label>
                <select value={actif ? "oui" : "non"} onChange={e => setActif(e.target.value === "oui")}>
                  <option value="oui">Actif (visible)</option>
                  <option value="non">Inactif (masqué)</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Logo (PNG transparent recommandé)</label>
                <div className="admin-image-upload">
                  {imagePreview && <img src={imagePreview} alt="Aperçu" className="admin-image-preview admin-image-preview--logo" />}
                  <button type="button" className="admin-btn admin-btn--outline" onClick={() => fileRef.current?.click()}>
                    Choisir un logo
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                    onChange={e => { const f = e.target.files?.[0]; if (!f) return; setImageFile(f); setImagePreview(URL.createObjectURL(f)); }} />
                  {imageFile && <span className="admin-filename">{imageFile.name}</span>}
                </div>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--ghost" onClick={() => setShowForm(false)}>Annuler</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? "Upload…" : editing ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="admin-refs-grid">
          {refs.length === 0 ? (
            <div className="admin-empty">Aucun logo — ajoutez le premier !</div>
          ) : (
            refs.map(ref => (
              <div key={ref.id} className={`admin-ref-card ${!ref.actif ? "admin-ref-card--inactive" : ""}`}>
                <img src={ref.logo} alt={ref.nom} className="admin-ref-logo" />
                <div className="admin-ref-name">{ref.nom}</div>
                <div className="admin-ref-actions">
                  <button className={`admin-toggle ${ref.actif ? "admin-toggle--on" : "admin-toggle--off"}`}
                    onClick={() => toggleActif(ref)} title={ref.actif ? "Désactiver" : "Activer"}>
                    {ref.actif ? "✓ Actif" : "✗ Inactif"}
                  </button>
                  <button className="admin-action-btn" onClick={() => openEdit(ref)} title="Modifier">✏️</button>
                  <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDelete(ref)} title="Supprimer">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
