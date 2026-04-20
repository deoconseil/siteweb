# Guide d'utilisation — Dashboard Admin DEO Conseil

**Version 1.0 — Avril 2026**  
**Destinataire : Meryem / Équipe DEO Conseil**

---

## Table des matières

1. [Accéder au Dashboard](#1-accéder-au-dashboard)
2. [Vue d'ensemble du Dashboard](#2-vue-densemble-du-dashboard)
3. [Section Contacts](#3-section-contacts)
4. [Section Catalogue](#4-section-catalogue)
5. [Section FabrikRH](#5-section-fabrikrh)
6. [Section Newsletter](#6-section-newsletter)
7. [Section Blog](#7-section-blog)
8. [Section Actualités](#8-section-actualités)
9. [Section Références](#9-section-références)
10. [Guide des formats d'images](#10-guide-des-formats-dimages)
11. [Bonnes pratiques générales](#11-bonnes-pratiques-générales)

---

## 1. Accéder au Dashboard

Le Dashboard Admin est accessible à l'adresse suivante :

```
https://deoconseil-kg3mr7aj.manus.space/admin
```

**Connexion :** Cliquez sur le bouton de connexion et authentifiez-vous avec le compte Google autorisé (`deoconseilrh@gmail.com`). Une fois connecté, vous accédez directement au tableau de bord.

> **Important :** Le Dashboard est protégé. Seul le compte administrateur autorisé peut y accéder. Si vous voyez un écran de connexion, cliquez sur "Se connecter" et utilisez le compte Google DEO Conseil.

---

## 2. Vue d'ensemble du Dashboard

Le Dashboard est organisé en **7 sections** accessibles via la barre latérale gauche :

| Section | Description |
|---|---|
| **Contacts** | Messages reçus via le formulaire de contact du site |
| **Catalogue** | Demandes de téléchargement du catalogue CapSkills |
| **FabrikRH** | Inscriptions au programme La Fabrik RH |
| **Newsletter** | Abonnés à la newsletter DEO Conseil |
| **Blog** | Articles du Blog Déo (création, modification, publication) |
| **Actualités** | Actualités et communiqués de presse |
| **Références** | Logos des entreprises clientes (marquee sur la page d'accueil) |

Chaque section affiche les données en temps réel depuis Google Sheets. Les modifications effectuées dans le Dashboard sont immédiatement enregistrées dans la feuille correspondante.

---

## 3. Section Contacts

### Ce que vous y trouvez

Tous les messages envoyés via le formulaire de contact du site (footer et page de contact). Chaque entrée contient : Date, Nom, Prénom, Email, Téléphone, Entreprise, et le Message.

### Actions disponibles

Le tableau est en **lecture seule** — il n'est pas prévu de modifier les messages reçus. Vous pouvez :

- **Consulter** les messages par ordre chronologique (du plus récent au plus ancien)
- **Répondre** directement en cliquant sur l'adresse email affichée (ouvre votre client mail)
- **Filtrer** visuellement en parcourant le tableau

### Workflow recommandé

1. Consultez la section Contacts chaque matin.
2. Répondez aux demandes dans les 24 heures.
3. Notez les demandes urgentes dans votre agenda.

> **Note :** Un email de notification est automatiquement envoyé à `deoconseilrh@gmail.com` à chaque nouveau message reçu.

---

## 4. Section Catalogue

### Ce que vous y trouvez

Les demandes de téléchargement du catalogue CapSkills. Chaque entrée contient : Date, Nom, Prénom, Email, Téléphone, Entreprise, Fonction, et Statut.

### Statuts disponibles

| Statut | Signification |
|---|---|
| **Nouveau** | Demande reçue, pas encore traitée |
| **Contacté** | Prospect contacté par l'équipe |
| **Qualifié** | Prospect qualifié, potentiel commercial identifié |
| **Converti** | Mission ou contrat signé |

### Actions disponibles

- **Consulter** les demandes avec toutes les informations de contact
- **Changer le statut** : cliquez sur le badge de statut pour le modifier
- **Exporter** : les données sont directement accessibles dans Google Sheets (onglet "Catalogue")

### Workflow recommandé

1. Chaque nouvelle demande reçoit automatiquement le statut "Nouveau".
2. Contactez le prospect dans les 48h.
3. Mettez à jour le statut selon l'avancement.
4. Utilisez les données (Entreprise, Fonction) pour personnaliser votre approche commerciale.

---

## 5. Section FabrikRH

### Ce que vous y trouvez

Les inscriptions au programme **La Fabrik RH** (think tank RH). Chaque entrée contient : ID, Date, Prénom, Nom, Email, Téléphone, Entreprise, Fonction, Intérêt, et Statut.

### Actions disponibles

- **Consulter** les inscriptions
- **Modifier le statut** de chaque inscription
- **Contacter** les inscrits via l'email affiché

### Workflow recommandé

1. Vérifiez les nouvelles inscriptions après chaque événement ou publication.
2. Envoyez un email de bienvenue aux nouveaux inscrits.
3. Utilisez la colonne "Intérêt" pour segmenter les communications.

---

## 6. Section Newsletter

### Ce que vous y trouvez

Tous les abonnés à la newsletter DEO Conseil. Chaque entrée contient : ID, Date d'inscription, Email, et Statut.

### Statuts disponibles

| Statut | Signification |
|---|---|
| **Actif** | Abonné confirmé, reçoit les newsletters |
| **Désabonné** | A demandé à ne plus recevoir les emails |

### Actions disponibles

- **Consulter** la liste des abonnés
- **Modifier le statut** (activer / désactiver un abonné)
- **Exporter** la liste depuis Google Sheets pour l'utiliser dans un outil d'emailing (Mailchimp, Brevo, etc.)

### Workflow recommandé

1. Exportez la liste des abonnés "Actifs" chaque mois depuis Google Sheets.
2. Importez-la dans votre outil d'emailing.
3. Respectez le RGPD : ne contactez jamais les abonnés avec le statut "Désabonné".

---

## 7. Section Blog

### Ce que vous y trouvez

La gestion complète des articles du **Blog Déo**. C'est la section la plus riche du Dashboard.

### Créer un nouvel article

1. Cliquez sur **"+ Nouvel article"**
2. Remplissez les champs :
   - **Titre** : titre de l'article (max. 80 caractères recommandé)
   - **Slug** : identifiant URL (généré automatiquement depuis le titre, ex: `leadership-en-temps-de-crise`)
   - **Auteur** : nom de l'auteur
   - **Catégorie** : choisissez parmi les catégories existantes
   - **Tags** : mots-clés séparés par des virgules
   - **Extrait** : résumé court (2-3 phrases, affiché dans la liste des articles)
   - **Image de couverture** : uploadez une image (voir formats recommandés ci-dessous)
   - **Contenu** : rédigez le corps de l'article en HTML ou texte enrichi
3. Cochez **"Publié"** pour rendre l'article visible sur le site
4. Cliquez sur **"Enregistrer"**

### Modifier un article existant

1. Cliquez sur l'icône crayon à côté de l'article
2. Modifiez les champs souhaités
3. Cliquez sur **"Enregistrer"**

### Dépublier / Supprimer un article

- **Dépublier** : décochez "Publié" et enregistrez — l'article reste dans la base mais n'est plus visible sur le site
- **Supprimer** : cliquez sur l'icône poubelle — action irréversible

### Rédiger le contenu en HTML

Le contenu des articles supporte le **HTML enrichi**. Voici les balises les plus utiles :

```html
<h2>Sous-titre de section</h2>
<h3>Sous-sous-titre</h3>
<p>Paragraphe de texte normal.</p>
<strong>Texte en gras</strong>
<em>Texte en italique</em>
<ul>
  <li>Élément de liste</li>
  <li>Autre élément</li>
</ul>
<ol>
  <li>Étape 1</li>
  <li>Étape 2</li>
</ol>
<blockquote>Citation importante ou mise en avant</blockquote>
<a href="https://exemple.com">Lien cliquable</a>
<img src="URL_DE_IMAGE" alt="Description" style="max-width:100%;height:auto;" />
<hr />  <!-- Séparateur horizontal -->
```

> **Conseil :** Pour insérer des images dans le corps de l'article, uploadez d'abord l'image sur Cloudinary (via le champ image de couverture), copiez l'URL obtenue, puis utilisez la balise `<img>` dans le contenu.

---

## 8. Section Actualités

### Ce que vous y trouvez

La gestion des **actualités et communiqués de presse** de DEO Conseil. Fonctionnement identique à la section Blog.

### Différence avec le Blog

| Blog | Actualités |
|---|---|
| Articles de fond, analyses, conseils RH | Communiqués, événements, annonces |
| Contenu long (500-2000 mots) | Contenu court (200-500 mots) |
| Auteur identifié | Peut être anonyme ("DEO Conseil") |
| Catégories thématiques | Catégories événementielles |

### Créer une actualité

Le processus est identique à la création d'un article Blog (voir section 7 ci-dessus).

---

## 9. Section Références

### Ce que vous y trouvez

Les **logos des entreprises clientes** qui s'affichent dans le bandeau défilant (marquee) de la page d'accueil.

### Ajouter un logo client

1. Cliquez sur **"+ Ajouter une référence"**
2. Remplissez :
   - **Nom** : nom de l'entreprise (ex: "OCP", "Attijariwafa Bank")
   - **Logo** : uploadez le fichier PNG du logo
   - **Actif** : cochez pour afficher le logo sur le site
3. Cliquez sur **"Enregistrer"**

Le logo apparaît immédiatement dans le bandeau défilant de la page d'accueil.

### Modifier ou désactiver un logo

- **Modifier** : cliquez sur le crayon pour changer le nom ou remplacer l'image
- **Désactiver** : décochez "Actif" — le logo ne s'affiche plus sans être supprimé
- **Supprimer** : cliquez sur la poubelle — action irréversible

### Recommandations pour les logos

- Format : **PNG avec fond transparent** (obligatoire pour un rendu propre sur fond sombre)
- Dimensions : **400 × 200 px** minimum (ratio 2:1 ou carré)
- Fond : **transparent** (pas de fond blanc ou coloré)
- Couleur : le site applique automatiquement un filtre blanc — les logos s'affichent en blanc sur fond sombre

> **Astuce :** Si votre logo est sur fond blanc, utilisez un outil comme [remove.bg](https://www.remove.bg) ou Photoshop pour supprimer le fond avant d'uploader.

---

## 10. Guide des formats d'images

Ce guide définit les formats recommandés pour chaque type d'image sur le site DEO Conseil.

### Tableau récapitulatif

| Emplacement | Format | Dimensions recommandées | Poids max | Notes |
|---|---|---|---|---|
| **Image de couverture Blog** | JPG ou WebP | 1200 × 630 px | 300 Ko | Ratio 16:9, affiché en vignette et en haut de l'article |
| **Image de couverture Actualités** | JPG ou WebP | 1200 × 630 px | 300 Ko | Même format que le Blog |
| **Images insérées dans le contenu** | JPG, PNG ou WebP | 800 × 600 px max | 200 Ko | Ratio libre, max-width: 100% dans le HTML |
| **Logos Références** | PNG | 400 × 200 px min | 100 Ko | **Fond transparent obligatoire** |
| **Photo de profil / Portrait** | JPG ou PNG | 600 × 800 px | 200 Ko | Ratio portrait 3:4 |
| **Image Hero (page d'accueil)** | JPG ou WebP | 1920 × 1080 px | 500 Ko | Ratio 16:9, format paysage |
| **Bannières pages internes** | JPG ou WebP | 1920 × 600 px | 400 Ko | Ratio panoramique 16:5 |

### Détail par section

#### Images de couverture — Blog et Actualités

Le format **1200 × 630 px** (ratio 16:9) est le standard universel pour les vignettes d'articles. Il est optimisé pour :
- L'affichage dans la liste des articles sur le site
- Le partage sur les réseaux sociaux (LinkedIn, Facebook, Twitter)
- L'affichage en haut de la page article

**Conseils de composition :**
- Laissez de l'espace pour le titre (évitez de placer du texte important en bas à gauche)
- Utilisez des images lumineuses avec bon contraste
- Évitez les images trop chargées ou confuses

#### Images insérées dans le contenu des articles

Ces images s'insèrent directement dans le corps du texte via la balise HTML `<img>`. Elles peuvent avoir n'importe quel ratio, mais respectez ces règles :
- Largeur maximale : **800 px** (le site adapte automatiquement)
- Toujours inclure l'attribut `alt` pour l'accessibilité
- Compressez les images avant d'uploader (utilisez [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app))

#### Logos Références (marquee page d'accueil)

C'est le format le plus contraignant. Le site applique un filtre CSS qui rend tous les logos en **blanc sur fond sombre**. Pour un rendu optimal :

1. Le logo doit être sur **fond transparent** (fichier PNG uniquement)
2. Le logo lui-même peut être de n'importe quelle couleur — il sera converti en blanc automatiquement
3. Évitez les logos avec des détails très fins qui disparaissent à petite taille
4. Ratio recommandé : **2:1** (paysage) ou **1:1** (carré) — évitez les formats très allongés

**Exemple de bon logo :**
- OCP_logo.png — fond transparent, lettres noires → s'affiche en blanc ✓
- Attijariwafa_logo.png — fond transparent, logo coloré → s'affiche en blanc ✓

**Exemple de mauvais logo :**
- logo_blanc.png — fond blanc → fond visible sur le site ✗
- logo_très_petit.png — moins de 100px de large → flou à l'affichage ✗

---

## 11. Bonnes pratiques générales

### Sauvegardes

Toutes les données sont stockées dans **Google Sheets** (Spreadsheet ID : `1KX1Zpr064oZ7TEjzgcgsEmbqWiZub7WAIohVFjhhnIs`). Vous pouvez à tout moment :
- Ouvrir le fichier Google Sheets directement pour consulter ou exporter les données
- Télécharger les feuilles en format Excel (.xlsx) ou CSV depuis Google Sheets

### Notifications email

Un email automatique est envoyé à `deoconseilrh@gmail.com` pour chaque :
- Nouveau message de contact
- Nouvelle demande de catalogue
- Nouvelle inscription FabrikRH
- Nouvel abonné newsletter

### Gestion des images avec Cloudinary

Toutes les images uploadées via le Dashboard sont stockées sur **Cloudinary** (cloud : `dywocv2it`). Vous pouvez gérer votre médiathèque sur [cloudinary.com](https://cloudinary.com) avec le compte DEO Conseil.

### Résolution des problèmes courants

| Problème | Solution |
|---|---|
| Les données ne se chargent pas | Vérifiez votre connexion internet. Actualisez la page. |
| Le logo ne s'affiche pas sur le site | Vérifiez que le logo est bien "Actif" dans la section Références. |
| L'article n'apparaît pas sur le site | Vérifiez que la case "Publié" est cochée. |
| L'image ne s'affiche pas dans l'article | Vérifiez que l'URL de l'image est correcte et accessible. |
| Erreur lors de l'upload d'image | L'image est peut-être trop lourde (max 10 Mo). Compressez-la d'abord. |
| Je ne peux pas me connecter | Contactez l'équipe technique — vérifiez que vous utilisez le bon compte Google. |

### Contact support technique

Pour toute question technique concernant le site ou le Dashboard, contactez l'équipe de développement via le projet Manus ou par email.

---

*Guide rédigé en avril 2026 — DEO Conseil International*
