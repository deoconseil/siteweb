/**
 * ═══════════════════════════════════════════════════════════════════
 *  DEO CONSEIL — Google Apps Script (GAS) Backend
 *  Version: 1.0 — Avril 2026
 *
 *  INSTALLATION :
 *  1. Ouvrir script.google.com → Nouveau projet → coller ce code
 *  2. Remplacer SPREADSHEET_ID par l'ID de votre Google Sheet
 *  3. Remplacer ADMIN_EMAIL si besoin
 *  4. Déployer → Nouvelle déploiement → Application Web
 *     - Exécuter en tant que : Moi
 *     - Accès : Tout le monde (anonyme)
 *  5. Copier l'URL de déploiement → mettre dans VITE_GAS_URL du site
 *
 *  FEUILLES GOOGLE SHEETS REQUISES (créer dans l'ordre) :
 *  - Contacts
 *  - FabrikRH
 *  - Catalogue
 *  - Newsletter
 *  - Blog
 *  - Actualites
 *  - References
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Configuration ──────────────────────────────────────────────────
const SPREADSHEET_ID = "1KX1Zpr064oZ7TEjzgcgsEmbqWiZub7WAIohVFjhhnIs";
const ADMIN_EMAIL    = "deoconseilrh@gmail.com";
const SITE_NAME      = "DEO Conseil";
const SITE_URL       = "https://deo-conseil.com";
const CATALOGUE_PDF  = "https://d2xsxph8kpxj0f.cloudfront.net/89599327/Kg3MR7aJ6wLfgVCatcFEoP/DEO-CONSEIL-Catalogue-CapSkills-2024-2025_8798a621.pdf";

// ── Couleurs email ──
const RED   = "#C8102E";
const DARK  = "#1a1a1a";
const LIGHT = "#f5f5f5";

// ══════════════════════════════════════════════════════════════════
//  POINT D'ENTRÉE HTTP
// ══════════════════════════════════════════════════════════════════

function doGet(e) {
  const action = e.parameter.action || "";
  const params = e.parameter;

  try {
    switch (action) {
      case "getBlog":        return jsonOk(getBlog());
      case "getActualites":  return jsonOk(getActualites());
      case "getReferences":  return jsonOk(getReferences());
      case "getContacts":    return jsonOk(getContacts());
      case "getFabrikRH":    return jsonOk(getFabrikRH());
      case "getCatalogue":   return jsonOk(getCatalogue());
      case "getNewsletter":  return jsonOk(getNewsletter());
      case "deleteBlog":     return jsonOk(deleteBlog(params.id));
      case "deleteActualite":return jsonOk(deleteActualite(params.id));
      case "deleteReference":return jsonOk(deleteReference(params.id));
      case "toggleReference":return jsonOk(toggleReference(params.id));
      case "deleteContact":  return jsonOk(deleteContact(params.id));
      case "deleteFabrik":   return jsonOk(deleteFabrik(params.id));
      case "deleteCatalogue":return jsonOk(deleteCatalogue(params.id));
      case "deleteNewsletter":return jsonOk(deleteNewsletter(params.id));
      default:               return jsonError("Action inconnue: " + action);
    }
  } catch (err) {
    return jsonError(err.message);
  }
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonError("JSON invalide");
  }

  const action = body.action || "";

  try {
    switch (action) {
      case "submitContact":   return jsonOk(submitContact(body));
      case "submitFabrikRH":  return jsonOk(submitFabrikRH(body));
      case "submitCatalogue": return jsonOk(submitCatalogue(body));
      case "subscribeNewsletter": return jsonOk(subscribeNewsletter(body));
      case "saveBlog":        return jsonOk(saveBlog(body));
      case "saveActualite":   return jsonOk(saveActualite(body));
      case "saveReference":   return jsonOk(saveReference(body));
      default:                return jsonError("Action inconnue: " + action);
    }
  } catch (err) {
    return jsonError(err.message);
  }
}

// ══════════════════════════════════════════════════════════════════
//  HELPERS SHEETS
// ══════════════════════════════════════════════════════════════════

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    initSheet(sheet, name);
  }
  return sheet;
}

function initSheet(sheet, name) {
  const headers = {
    Contacts:   ["ID","Date","Nom","Email","Telephone","Sujet","Message","Statut"],
    FabrikRH:   ["ID","Date","Prenom","Nom","Email","Telephone","Entreprise","Fonction","Interet","Statut"],
    Catalogue:  ["ID","Date","Nom","Prenom","Email","Telephone","Entreprise","Fonction","Statut"],
    Newsletter: ["ID","Date","Email","Statut"],
    Blog:       ["ID","Date","Titre","Slug","Auteur","Categorie","Tags","Extrait","Contenu","Image","Publie"],
    Actualites: ["ID","Date","Titre","Slug","Categorie","Tags","Extrait","Contenu","Image","Publie"],
    References: ["ID","Date","Nom","Logo","Actif"],
  };
  if (headers[name]) {
    sheet.appendRow(headers[name]);
    sheet.getRange(1, 1, 1, headers[name].length)
      .setBackground("#C8102E")
      .setFontColor("#ffffff")
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0];
  return data.slice(1).map((row, idx) => {
    const obj = { _row: idx + 2 };
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function nowStr() {
  return Utilities.formatDate(new Date(), "Africa/Casablanca", "dd/MM/yyyy HH:mm");
}

// ══════════════════════════════════════════════════════════════════
//  CONTACTS
// ══════════════════════════════════════════════════════════════════

function submitContact(body) {
  const sheet = getSheet("Contacts");
  const id = generateId();
  // Support prenom+nom (website form) or just nom
  const fullNom = body.prenom ? `${body.prenom} ${body.nom || ""}`.trim() : (body.nom || "");
  const sujet = body.sujet || body.entreprise || "";
  const row = [
    id,
    nowStr(),
    fullNom,
    body.email || "",
    body.telephone || "",
    sujet,
    body.message || "",
    "Nouveau"
  ];
  sheet.appendRow(row);

  // Email à l'admin
  sendEmail(ADMIN_EMAIL, `📋 Nouveau contact — ${fullNom}`, emailContactAdmin({...body, nom: fullNom}));
  // Email de confirmation à l'utilisateur
  if (body.email) {
    sendEmail(body.email, `Votre message a bien été reçu — ${SITE_NAME}`, emailContactUser({...body, nom: fullNom}));
  }

  return { success: true, id };
}

function getContacts() {
  return sheetToObjects(getSheet("Contacts"));
}

function deleteContact(id) {
  return deleteRowById("Contacts", id);
}

// ══════════════════════════════════════════════════════════════════
//  FABRIK RH
// ══════════════════════════════════════════════════════════════════

function submitFabrikRH(body) {
  const sheet = getSheet("FabrikRH");
  const id = generateId();
  const row = [
    id,
    nowStr(),
    body.prenom || "",
    body.nom || "",
    body.email || "",
    body.telephone || "",
    body.entreprise || "",
    body.fonction || "",
    body.interet || "",
    "Nouveau"
  ];
  sheet.appendRow(row);

  sendEmail(ADMIN_EMAIL, `🏭 Nouvelle demande Fabrik RH — ${body.prenom} ${body.nom}`, emailFabrikAdmin(body));
  if (body.email) {
    sendEmail(body.email, `Votre demande Fabrik RH — ${SITE_NAME}`, emailFabrikUser(body));
  }

  return { success: true, id };
}

function getFabrikRH() {
  return sheetToObjects(getSheet("FabrikRH"));
}

function deleteFabrik(id) {
  return deleteRowById("FabrikRH", id);
}

// ══════════════════════════════════════════════════════════════════
//  CATALOGUE
// ══════════════════════════════════════════════════════════════════

function submitCatalogue(body) {
  const sheet = getSheet("Catalogue");
  const id = generateId();
  const row = [
    id,
    nowStr(),
    body.nom || "",
    body.prenom || "",
    body.email || "",
    body.telephone || "",
    body.entreprise || "",
    body.fonction || "",
    "Nouveau"
  ];
  sheet.appendRow(row);

  sendEmail(ADMIN_EMAIL, `📚 Téléchargement catalogue — ${body.prenom || ""} ${body.nom || ""}`, emailCatalogueAdmin(body));
  if (body.email) {
    sendEmail(body.email, `Votre catalogue DEO Conseil`, emailCatalogueUser(body));
  }

  return { success: true, id };
}

function getCatalogue() {
  return sheetToObjects(getSheet("Catalogue"));
}

function deleteCatalogue(id) {
  return deleteRowById("Catalogue", id);
}

// ══════════════════════════════════════════════════════════════════
//  NEWSLETTER
// ══════════════════════════════════════════════════════════════════

function subscribeNewsletter(body) {
  const sheet = getSheet("Newsletter");
  const email = (body.email || "").toLowerCase().trim();
  if (!email) return { success: false, error: "Email requis" };

  // Vérifier doublon
  const rows = sheetToObjects(sheet);
  const exists = rows.find(r => (r.Email || "").toLowerCase() === email);
  if (exists) return { success: false, error: "Déjà inscrit" };

  const id = generateId();
  sheet.appendRow([id, nowStr(), email, "Actif"]);

  sendEmail(ADMIN_EMAIL, `📧 Nouvelle inscription newsletter — ${email}`, emailNewsletterAdmin(email));
  sendEmail(email, `Bienvenue dans la newsletter DEO Conseil`, emailNewsletterUser(email));

  return { success: true, id };
}

function getNewsletter() {
  return sheetToObjects(getSheet("Newsletter"));
}

function deleteNewsletter(id) {
  return deleteRowById("Newsletter", id);
}

// ══════════════════════════════════════════════════════════════════
//  BLOG
// ══════════════════════════════════════════════════════════════════

function saveBlog(body) {
  const sheet = getSheet("Blog");
  const id = body.id || generateId();
  const rows = sheetToObjects(sheet);
  const existing = rows.find(r => r.ID === id);

  const rowData = [
    id,
    nowStr(),
    body.titre || "",
    body.slug || slugify(body.titre || ""),
    body.auteur || "DEO Conseil",
    body.categorie || "",
    (body.tags || []).join(", "),
    body.extrait || "",
    body.contenu || "",
    body.image || "",
    body.publie ? "OUI" : "NON"
  ];

  if (existing) {
    const range = sheet.getRange(existing._row, 1, 1, rowData.length);
    range.setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { success: true, id };
}

function getBlog() {
  const rows = sheetToObjects(getSheet("Blog"));
  return rows.map(r => ({
    id: r.ID,
    date: r.Date,
    titre: r.Titre,
    slug: r.Slug,
    auteur: r.Auteur,
    categorie: r.Categorie,
    tags: r.Tags ? r.Tags.split(", ").filter(Boolean) : [],
    extrait: r.Extrait,
    contenu: r.Contenu,
    image: r.Image,
    publie: r.Publie === "OUI"
  }));
}

function deleteBlog(id) {
  return deleteRowById("Blog", id);
}

// ══════════════════════════════════════════════════════════════════
//  ACTUALITES
// ══════════════════════════════════════════════════════════════════

function saveActualite(body) {
  const sheet = getSheet("Actualites");
  const id = body.id || generateId();
  const rows = sheetToObjects(sheet);
  const existing = rows.find(r => r.ID === id);

  const rowData = [
    id,
    nowStr(),
    body.titre || "",
    body.slug || slugify(body.titre || ""),
    body.categorie || "",
    (body.tags || []).join(", "),
    body.extrait || "",
    body.contenu || "",
    body.image || "",
    body.publie ? "OUI" : "NON"
  ];

  if (existing) {
    const range = sheet.getRange(existing._row, 1, 1, rowData.length);
    range.setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { success: true, id };
}

function getActualites() {
  const rows = sheetToObjects(getSheet("Actualites"));
  return rows.map(r => ({
    id: r.ID,
    date: r.Date,
    titre: r.Titre,
    slug: r.Slug,
    categorie: r.Categorie,
    tags: r.Tags ? r.Tags.split(", ").filter(Boolean) : [],
    extrait: r.Extrait,
    contenu: r.Contenu,
    image: r.Image,
    publie: r.Publie === "OUI"
  }));
}

function deleteActualite(id) {
  return deleteRowById("Actualites", id);
}

// ══════════════════════════════════════════════════════════════════
//  REFERENCES
// ══════════════════════════════════════════════════════════════════

function saveReference(body) {
  const sheet = getSheet("References");
  const id = body.id || generateId();
  const rows = sheetToObjects(sheet);
  const existing = rows.find(r => r.ID === id);

  const rowData = [
    id,
    nowStr(),
    body.nom || "",
    body.logo || "",
    body.actif !== false ? "OUI" : "NON"
  ];

  if (existing) {
    sheet.getRange(existing._row, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { success: true, id };
}

function getReferences() {
  const rows = sheetToObjects(getSheet("References"));
  return rows.map(r => ({
    id: r.ID,
    date: r.Date,
    nom: r.Nom,
    logo: r.Logo,
    actif: r.Actif === "OUI"
  }));
}

function deleteReference(id) {
  return deleteRowById("References", id);
}

function toggleReference(id) {
  const sheet = getSheet("References");
  const rows = sheetToObjects(sheet);
  const row = rows.find(r => r.ID === id);
  if (!row) return { success: false, error: "Non trouvé" };
  const newVal = row.Actif === "OUI" ? "NON" : "OUI";
  sheet.getRange(row._row, 5).setValue(newVal);
  return { success: true, actif: newVal === "OUI" };
}

// ══════════════════════════════════════════════════════════════════
//  HELPERS GÉNÉRIQUES
// ══════════════════════════════════════════════════════════════════

function deleteRowById(sheetName, id) {
  const sheet = getSheet(sheetName);
  const rows = sheetToObjects(sheet);
  const row = rows.find(r => r.ID === id);
  if (!row) return { success: false, error: "Non trouvé" };
  sheet.deleteRow(row._row);
  return { success: true };
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sendEmail(to, subject, htmlBody) {
  try {
    GmailApp.sendEmail(to, subject, "", {
      htmlBody: htmlBody,
      name: SITE_NAME,
      replyTo: ADMIN_EMAIL
    });
  } catch (e) {
    Logger.log("Email error: " + e.message);
  }
}

function jsonOk(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════════════════════════════════
//  TEMPLATES EMAIL HTML
// ══════════════════════════════════════════════════════════════════

function emailWrapper(title, content) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:28px 40px;text-align:center;">
            <img src="https://deoconseil.com/wp-content/uploads/elementor/thumbs/logo-footer-polc7w0k54rgr9jtz50itm1m0b0eowuwjefg79qsoa.png" alt="DEO Conseil" height="40" style="filter:brightness(0) invert(1);">
            <p style="color:#C8102E;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:8px 0 0;">People First.</p>
          </td>
        </tr>
        <!-- Red bar -->
        <tr><td style="background:#C8102E;height:4px;"></td></tr>
        <!-- Title -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <h1 style="color:#1a1a1a;font-size:22px;font-weight:700;margin:0;">${title}</h1>
          </td>
        </tr>
        <!-- Content -->
        <tr>
          <td style="padding:24px 40px 32px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:20px 40px;border-top:1px solid #eee;text-align:center;">
            <p style="color:#999;font-size:12px;margin:0;">
              © ${new Date().getFullYear()} DEO Conseil — Tous droits réservés<br>
              <a href="${SITE_URL}" style="color:#C8102E;text-decoration:none;">${SITE_URL}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function fieldRow(label, value) {
  if (!value) return "";
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">
      <span style="color:#888;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${label}</span><br>
      <span style="color:#1a1a1a;font-size:15px;">${value}</span>
    </td>
  </tr>`;
}

// ── Contact ──

function emailContactAdmin(b) {
  const content = `
    <p style="color:#555;font-size:15px;margin:0 0 20px;">Nouveau message reçu via le formulaire de contact.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${fieldRow("Nom", b.nom)}
      ${fieldRow("Email", b.email)}
      ${fieldRow("Téléphone", b.telephone)}
      ${fieldRow("Sujet", b.sujet)}
      ${fieldRow("Message", b.message)}
    </table>
    <div style="margin-top:24px;text-align:center;">
      <a href="mailto:${b.email}" style="background:#C8102E;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Répondre</a>
    </div>`;
  return emailWrapper("Nouveau contact — " + (b.nom || ""), content);
}

function emailContactUser(b) {
  const content = `
    <p style="color:#555;font-size:15px;line-height:1.6;">Bonjour <strong>${b.nom || ""}</strong>,</p>
    <p style="color:#555;font-size:15px;line-height:1.6;">Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
    <div style="background:#f8f8f8;border-left:4px solid #C8102E;padding:16px 20px;margin:20px 0;border-radius:0 6px 6px 0;">
      <p style="color:#888;font-size:13px;margin:0 0 4px;font-weight:600;">Votre message :</p>
      <p style="color:#555;font-size:14px;margin:0;font-style:italic;">"${b.message || ""}"</p>
    </div>
    <p style="color:#555;font-size:15px;line-height:1.6;">À très bientôt,<br><strong>L'équipe DEO Conseil</strong></p>`;
  return emailWrapper("Votre message a bien été reçu", content);
}

// ── Fabrik RH ──

function emailFabrikAdmin(b) {
  const content = `
    <p style="color:#555;font-size:15px;margin:0 0 20px;">Nouvelle demande Fabrik RH reçue.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${fieldRow("Prénom", b.prenom)}
      ${fieldRow("Nom", b.nom)}
      ${fieldRow("Email", b.email)}
      ${fieldRow("Téléphone", b.telephone)}
      ${fieldRow("Entreprise", b.entreprise)}
      ${fieldRow("Fonction", b.fonction)}
      ${fieldRow("Centre d'intérêt", b.interet)}
    </table>
    <div style="margin-top:24px;text-align:center;">
      <a href="mailto:${b.email}" style="background:#C8102E;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Répondre</a>
    </div>`;
  return emailWrapper("Nouvelle demande Fabrik RH — " + (b.prenom || "") + " " + (b.nom || ""), content);
}

function emailFabrikUser(b) {
  const content = `
    <p style="color:#555;font-size:15px;line-height:1.6;">Bonjour <strong>${b.prenom || ""} ${b.nom || ""}</strong>,</p>
    <p style="color:#555;font-size:15px;line-height:1.6;">Merci pour votre intérêt pour la Fabrik RH. Notre équipe a bien reçu votre demande et vous contactera très prochainement.</p>
    <div style="background:#f8f8f8;border:1px solid #eee;border-radius:8px;padding:20px;margin:20px 0;">
      <p style="color:#C8102E;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px;">Votre inscription</p>
      <p style="color:#555;font-size:14px;margin:4px 0;"><strong>Entreprise :</strong> ${b.entreprise || "—"}</p>
      <p style="color:#555;font-size:14px;margin:4px 0;"><strong>Fonction :</strong> ${b.fonction || "—"}</p>
      <p style="color:#555;font-size:14px;margin:4px 0;"><strong>Centre d'intérêt :</strong> ${b.interet || "—"}</p>
    </div>
    <p style="color:#555;font-size:15px;line-height:1.6;">À très bientôt,<br><strong>L'équipe DEO Conseil</strong></p>`;
  return emailWrapper("Votre demande Fabrik RH a bien été reçue", content);
}

// ── Catalogue ──

function emailCatalogueAdmin(b) {
  const content = `
    <p style="color:#555;font-size:15px;margin:0 0 20px;">Quelqu'un a téléchargé le catalogue CapSkills.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${fieldRow("Prénom", b.prenom)}
      ${fieldRow("Nom", b.nom)}
      ${fieldRow("Email", b.email)}
      ${fieldRow("Téléphone", b.telephone)}
      ${fieldRow("Entreprise", b.entreprise)}
      ${fieldRow("Fonction", b.fonction)}
    </table>`;
  return emailWrapper("Téléchargement catalogue — " + (b.prenom || "") + " " + (b.nom || ""), content);
}

function emailCatalogueUser(b) {
  const prenom = b.prenom || b.nom || "";
  const content = `
    <p style="color:#555;font-size:15px;line-height:1.6;">Bonjour <strong>${prenom}</strong>,</p>
    <p style="color:#555;font-size:15px;line-height:1.6;">Merci pour votre intérêt pour nos programmes de formation. Voici votre catalogue CapSkills 2024-2025.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${CATALOGUE_PDF}"
         style="background:#C8102E;color:#fff;padding:16px 36px;border-radius:6px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">
        Telecharger le catalogue
      </a>
    </div>
    <p style="color:#555;font-size:15px;line-height:1.6;">Pour toute question, contactez-nous :<br>
    Tel : +212 (0)5 22 94 42 74<br>
    Email : <a href="mailto:contact@deo-conseil.com" style="color:#C8102E;">contact@deo-conseil.com</a></p>
    <p style="color:#555;font-size:15px;line-height:1.6;">A tres bientot,<br><strong>L'equipe DEO Conseil</strong></p>`;
  return emailWrapper("Votre catalogue DEO Conseil", content);
}

// ── Newsletter ──

function emailNewsletterAdmin(email) {
  const content = `<p style="color:#555;font-size:15px;">Nouvelle inscription newsletter : <strong>${email}</strong></p>`;
  return emailWrapper("Nouvelle inscription newsletter", content);
}

function emailNewsletterUser(email) {
  const content = `
    <p style="color:#555;font-size:15px;line-height:1.6;">Bonjour,</p>
    <p style="color:#555;font-size:15px;line-height:1.6;">Vous êtes maintenant inscrit(e) à la newsletter DEO Conseil. Vous recevrez nos dernières actualités, articles et insights RH directement dans votre boîte mail.</p>
    <p style="color:#555;font-size:15px;line-height:1.6;">À très bientôt,<br><strong>L'équipe DEO Conseil</strong></p>`;
  return emailWrapper("Bienvenue dans la newsletter DEO Conseil", content);
}
