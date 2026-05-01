import { useEffect, useRef, useState } from "react";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_RAW_UPLOAD_PRESET,
  gasGet,
  gasPost,
} from "@/lib/gas";

type PopupState = "ON" | "OFF";

interface FabrikPopupConfig {
  id?: string;
  title: string;
  description: string;
  article: string;
  state: PopupState;
}

const EMPTY_CONFIG: FabrikPopupConfig = {
  title: "",
  description: "",
  article: "",
  state: "OFF",
};

export default function AdminFabrikPopup() {
  const [form, setForm] = useState<FabrikPopupConfig>(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await gasGet({ action: "getFabrikPopupConfig" });
      if (!res.ok) {
        setError(res.error || "Erreur GAS");
        return;
      }
      const data = (res.data || {}) as Partial<FabrikPopupConfig>;
      setForm({
        id: data.id,
        title: String(data.title || ""),
        description: String(data.description || ""),
        article: String(data.article || ""),
        state: String(data.state || "OFF").toUpperCase() === "ON" ? "ON" : "OFF",
      });
    } catch {
      setError("Impossible de charger la configuration du popup.");
    } finally {
      setLoading(false);
    }
  };

  const uploadArticle = async (file: File) => {
    if (file.type !== "application/pdf") {
      throw new Error("Seuls les fichiers PDF sont autorises.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Le fichier depasse 10 Mo.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_RAW_UPLOAD_PRESET);
    formData.append("folder", "deo-conseil/fabrik-rh/articles");
    formData.append("filename_override", file.name.replace(/\.[^.]+$/, ""));

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.error?.message || "Upload Cloudinary impossible.");
    }
    const url = String(data?.secure_url || data?.url || "");
    if (!url) throw new Error("Cloudinary n'a retourne aucune URL.");
    return url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSuccess("");
    setUploading(true);
    try {
      const url = await uploadArticle(file);
      setForm((prev) => ({ ...prev, article: url }));
      setSuccess("Article PDF uploade avec succes.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload PDF impossible.");
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!form.description.trim()) {
      setError("La description est obligatoire.");
      return;
    }
    if (!form.article.trim()) {
      setError("L'article PDF est obligatoire.");
      return;
    }

    setSaving(true);
    try {
      const res = await gasPost({
        action: "saveFabrikPopupConfig",
        id: form.id || "",
        title: form.title.trim(),
        description: form.description.trim(),
        article: form.article.trim(),
        state: form.state,
      });
      if (!res.ok) throw new Error(res.error || "Sauvegarde impossible.");

      const data = (res.data || {}) as { id?: string };
      setForm((prev) => ({ ...prev, id: data.id || prev.id }));
      setSuccess("Configuration du popup enregistree.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Popup Fabrik RH</h2>
          <span className={`admin-badge ${form.state === "ON" ? "admin-badge--green" : "admin-badge--red"}`}>
            {form.state}
          </span>
        </div>
        <div className="admin-section__actions">
          <button className="admin-btn admin-btn--ghost" onClick={fetchConfig}>
            ↻ Actualiser
          </button>
        </div>
      </div>

      {loading && <div className="admin-loading">Chargement...</div>}
      {error && <div className="admin-error">{error}</div>}
      {success && <div className="admin-loading">{success}</div>}

      {!loading && (
        <div className="admin-modal" style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div className="admin-modal__body">
            <div className="admin-form-grid">
              <div className="admin-field admin-field--full">
                <label>Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex : Nouvelle publication Fabrik RH"
                />
              </div>

              <div className="admin-field admin-field--full">
                <label>Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Texte affiche dans le popup."
                />
              </div>

              <div className="admin-field">
                <label>Etat popup</label>
                <select
                  value={form.state}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, state: e.target.value === "ON" ? "ON" : "OFF" }))
                  }
                >
                  <option value="ON">ON</option>
                  <option value="OFF">OFF</option>
                </select>
              </div>

              <div className="admin-field">
                <label>Article PDF *</label>
                <div className="admin-image-upload">
                  <button
                    type="button"
                    className="admin-btn admin-btn--outline"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Upload en cours..." : "Uploader un PDF"}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <small className="admin-muted-small">
                  Le PDF est uploadé automatiquement sur Cloudinary en URL publique.
                </small>
              </div>

              <div className="admin-field admin-field--full">
                <label>URL publique PDF (auto)</label>
                <input
                  type="text"
                  value={form.article}
                  readOnly
                  placeholder="L'URL sera générée automatiquement après upload."
                />
              </div>

              {form.article && (
                <div className="admin-field admin-field--full">
                  <a href={form.article} target="_blank" rel="noreferrer" className="admin-btn admin-btn--outline">
                    Ouvrir le PDF actuel
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="admin-modal__footer">
            <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving || uploading}>
              {saving ? "Sauvegarde..." : "Sauvegarder le popup"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
