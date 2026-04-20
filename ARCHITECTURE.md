# Architecture DEO Conseil — Site Dynamique

## Stack
- **Frontend** : React (existant) — appels fetch vers GAS_URL
- **Backend** : Google Apps Script (GAS) déployé comme Web App
- **DB** : Google Sheets (7 feuilles)
- **Images** : Cloudinary (blog, actualités, références logos)
- **Emails** : GAS MailApp / GmailApp

## Feuilles Google Sheets

| Feuille | Colonnes |
|---------|----------|
| `contacts` | id, date, nom, prenom, email, telephone, societe, poste, message, page, statut |
| `fabrik_rh` | id, date, nom, prenom, email, telephone, societe, poste, message, statut |
| `catalogue` | id, date, nom, prenom, email, telephone, societe, statut |
| `newsletter` | id, date, email, statut |
| `blog` | id, titre, slug, extrait, contenu, image_url, image_public_id, auteur, date_publication, statut, categorie |
| `actualites` | id, titre, slug, extrait, contenu, image_url, image_public_id, auteur, date_publication, statut, categorie |
| `references` | id, nom, logo_url, logo_public_id, ordre, actif |

## Endpoints GAS (action=...)

### Lecture publique
- `?action=getBlog` → liste articles blog publiés
- `?action=getBlogBySlug&slug=xxx` → article blog par slug
- `?action=getActualites` → liste actualités publiées
- `?action=getActualiteBySlug&slug=xxx` → actualité par slug
- `?action=getReferences` → logos références actifs

### Soumissions publiques (POST)
- `action=submitContact` → contact général
- `action=submitFabrikRH` → contact Fabrik RH
- `action=submitCatalogue` → demande catalogue
- `action=submitNewsletter` → inscription newsletter

### Admin (POST + token)
- `action=adminLogin` → vérif email/password → retourne token JWT-like
- `action=getContacts` → liste contacts
- `action=getFabrikRH` → liste fabrik rh
- `action=getCatalogue` → liste catalogue
- `action=getNewsletter` → liste newsletter
- `action=createBlog` / `updateBlog` / `deleteBlog`
- `action=createActualite` / `updateActualite` / `deleteActualite`
- `action=createReference` / `updateReference` / `deleteReference`
- `action=exportXlsx` → export données (géré côté front via SheetJS)

## Cloudinary
- Upload signé depuis le dashboard admin via l'API Cloudinary
- Dossiers : `deo-conseil/blog`, `deo-conseil/actualites`, `deo-conseil/references`
- Credentials : cloud_name=dywocv2it, api_key=756789917347886

## Auth Admin
- Email : deoconseilrh@gmail.com
- Password : deoconseil1234
- Token stocké en localStorage, envoyé dans chaque requête admin
- Route protégée : /admin (redirect si pas de token valide)
