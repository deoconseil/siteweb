import { useState, useEffect, useRef } from "react";
import { gasGet, gasPost, uploadToCloudinary, slugify } from "@/lib/gas";

interface BlogPost {
  id: string;
  date: string;
  titre: string;
  slug: string;
  auteur: string;
  categorie: string;
  tags: string[];
  extrait: string;
  contenu: string;
  image: string;
  publie: boolean;
}

const EMPTY: Omit<BlogPost, "id" | "date"> = {
  titre: "",
  slug: "",
  auteur: "Jamal Belahrach",
  categorie: "",
  tags: [],
  extrait: "",
  contenu: "",
  image: "",
  publie: true,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Omit<BlogPost, "id" | "date">>(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await gasGet({ action: "getBlog" });
      if (res.ok) setPosts((res.data as BlogPost[]) || []);
      else setError(res.error || "Erreur GAS");
    } catch {
      setError("Impossible de charger les articles. Vérifiez la connexion GAS.");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setImageFile(null);
    setImagePreview("");
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      titre: post.titre,
      slug: post.slug,
      auteur: post.auteur,
      categorie: post.categorie,
      tags: post.tags,
      extrait: post.extrait,
      contenu: post.contenu,
      image: post.image,
      publie: post.publie,
    });
    setImagePreview(post.image);
    setImageFile(null);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.titre.trim()) { alert("Le titre est requis."); return; }
    setSaving(true);
    try {
      let imageUrl = form.image;
      if (imageFile) {
        setUploadingImg(true);
        const result = await uploadToCloudinary(imageFile, "blog");
        imageUrl = result.url;
        setUploadingImg(false);
      }
      const payload = {
        action: "saveBlog",
        ...(editing ? { id: editing.id } : {}),
        ...form,
        image: imageUrl,
        slug: form.slug || slugify(form.titre),
      };
      const res = await gasPost(payload);
      if (!res.ok) throw new Error(res.error);
      await fetchPosts();
      setShowForm(false);
    } catch (e: unknown) {
      alert("Erreur: " + (e instanceof Error ? e.message : "Vérifiez la connexion GAS."));
    } finally {
      setSaving(false);
      setUploadingImg(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Supprimer "${post.titre}" ?`)) return;
    try {
      const res = await gasGet({ action: "deleteBlog", id: post.id });
      if (res.ok) setPosts(prev => prev.filter(p => p.id !== post.id));
      else alert("Erreur: " + res.error);
    } catch {
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div className="admin-section__info">
          <h2>Articles Blog</h2>
          <span className="admin-badge">{posts.length} article(s)</span>
        </div>
        <div className="admin-section__actions">
          <button className="admin-btn admin-btn--primary" onClick={openCreate}>+ Nouvel article</button>
          <button className="admin-btn admin-btn--ghost" onClick={fetchPosts}>↺ Actualiser</button>
        </div>
      </div>

      {loading && <div className="admin-loading">Chargement…</div>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <p className="admin-hint">⚠️ Aucun article — créez le premier ou vérifiez VITE_GAS_URL.</p>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3>{editing ? "Modifier l'article" : "Nouvel article"}</h3>
              <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-form-grid">
                <div className="admin-field admin-field--full">
                  <label>Titre *</label>
                  <input type="text" value={form.titre}
                    onChange={e => setForm(f => ({ ...f, titre: e.target.value, slug: editing ? f.slug : slugify(e.target.value) }))}
                    placeholder="Titre de l'article" />
                </div>
                <div className="admin-field admin-field--full">
                  <label>Slug (URL)</label>
                  <input type="text" value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="titre-de-l-article" />
                </div>
                <div className="admin-field">
                  <label>Auteur</label>
                  <input type="text" value={form.auteur}
                    onChange={e => setForm(f => ({ ...f, auteur: e.target.value }))} />
                </div>
                <div className="admin-field">
                  <label>Catégorie</label>
                  <input type="text" value={form.categorie}
                    onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}
                    placeholder="Leadership, RH…" />
                </div>
                <div className="admin-field">
                  <label>Tags (séparés par des virgules)</label>
                  <input type="text" value={form.tags.join(", ")}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))}
                    placeholder="RH, Leadership, Talent" />
                </div>
                <div className="admin-field">
                  <label>Publié</label>
                  <select value={form.publie ? "oui" : "non"}
                    onChange={e => setForm(f => ({ ...f, publie: e.target.value === "oui" }))}>
                    <option value="oui">Publié</option>
                    <option value="non">Brouillon</option>
                  </select>
                </div>
                <div className="admin-field admin-field--full">
                  <label>Image hero</label>
                  <div className="admin-image-upload">
                    {imagePreview && <img src={imagePreview} alt="Aperçu" className="admin-image-preview" />}
                    <button type="button" className="admin-btn admin-btn--outline" onClick={() => fileRef.current?.click()}>
                      {uploadingImg ? "Upload en cours…" : "Choisir une image"}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                    {imageFile && <span className="admin-filename">{imageFile.name}</span>}
                  </div>
                </div>
                <div className="admin-field admin-field--full">
                  <label>Extrait</label>
                  <textarea rows={2} value={form.extrait}
                    onChange={e => setForm(f => ({ ...f, extrait: e.target.value }))}
                    placeholder="Résumé affiché dans les cartes…" />
                </div>
                <div className="admin-field admin-field--full">
                  <label>Contenu complet (HTML ou texte)</label>
                  <textarea rows={12} value={form.contenu}
                    onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
                    placeholder="Contenu de l'article…"
                    className="admin-textarea--code" />
                </div>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--ghost" onClick={() => setShowForm(false)}>Annuler</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? "Sauvegarde…" : editing ? "Enregistrer" : "Publier"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan={6} className="admin-empty">Aucun article — créez le premier !</td></tr>
              ) : (
                posts.map(p => (
                  <tr key={p.id}>
                    <td>
                      {p.image
                        ? <img src={p.image} alt={p.titre} className="admin-thumb" />
                        : <div className="admin-thumb admin-thumb--empty">📷</div>}
                    </td>
                    <td>
                      <strong>{p.titre}</strong><br />
                      <small className="admin-slug">/blog/{p.slug}</small>
                    </td>
                    <td>{p.categorie || "—"}</td>
                    <td className="admin-td--date">{p.date}</td>
                    <td>
                      <span className={`admin-status admin-status--${p.publie ? "green" : "grey"}`}>
                        {p.publie ? "Publié" : "Brouillon"}
                      </span>
                    </td>
                    <td className="admin-td--actions">
                      <button className="admin-action-btn" onClick={() => openEdit(p)} title="Modifier">✏️</button>
                      <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDelete(p)} title="Supprimer">🗑️</button>
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
