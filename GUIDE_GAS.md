# Guide d'installation Google Apps Script — DEO Conseil

## Ce que fait le GAS

Le fichier `GAS_CODE.gs` est le **backend de votre site**. Il remplace une base de données MySQL par Google Sheets. Toutes les données (formulaires, blog, actualités, références, newsletter) sont stockées dans un Google Spreadsheet que vous contrôlez.

---

## Étape 1 — Créer le Google Spreadsheet

1. Allez sur [sheets.google.com](https://sheets.google.com) avec le compte **deoconseilrh@gmail.com**
2. Créez un nouveau classeur, nommez-le **"DEO Conseil — Base de données"**
3. Copiez l'**ID du classeur** depuis l'URL : `https://docs.google.com/spreadsheets/d/**VOTRE_ID**/edit`

---

## Étape 2 — Créer le projet Apps Script

1. Dans le classeur, cliquez sur **Extensions → Apps Script**
2. Supprimez le code par défaut
3. Copiez-collez **tout le contenu** du fichier `GAS_CODE.gs`
4. Remplacez la ligne `const SPREADSHEET_ID = "VOTRE_SPREADSHEET_ID_ICI";` par votre ID réel
5. Vérifiez que `const ADMIN_EMAIL = "deoconseilrh@gmail.com";` est correct
6. Cliquez sur **Enregistrer** (icône disquette)

---

## Étape 3 — Initialiser les feuilles

1. Dans Apps Script, sélectionnez la fonction `initSheets` dans le menu déroulant
2. Cliquez sur **Exécuter**
3. Autorisez les permissions demandées (accès au Spreadsheet, envoi d'emails)
4. Vérifiez dans votre Spreadsheet que les feuilles suivantes ont été créées :
   - `Contacts`
   - `FabrikRH`
   - `Catalogue`
   - `Newsletter`
   - `Blog`
   - `Actualites`
   - `References`

---

## Étape 4 — Déployer comme Web App

1. Cliquez sur **Déployer → Nouveau déploiement**
2. Type : **Application Web**
3. Exécuter en tant que : **Moi (deoconseilrh@gmail.com)**
4. Qui a accès : **Tout le monde**
5. Cliquez sur **Déployer**
6. Copiez l'**URL de déploiement** (elle ressemble à `https://script.google.com/macros/s/XXXXXXX/exec`)

---

## Étape 5 — Configurer le site

1. Dans le Dashboard Admin de votre site (https://deoconseil-kg3mr7aj.manus.space/admin)
2. Allez dans **Paramètres** (ou contactez votre développeur)
3. Ajoutez la variable d'environnement `VITE_GAS_URL` avec l'URL copiée à l'étape 4

**Via Manus** : dans le panneau de gestion du projet, allez dans **Settings → Secrets** et ajoutez :
- Clé : `VITE_GAS_URL`
- Valeur : votre URL de déploiement GAS

---

## Feuilles Google Sheets — Structure

### Contacts
| ID | Date | Nom | Email | Telephone | Entreprise | Sujet | Message | Stat
ut |

### FabrikRH
| ID | Date | Prenom | Nom | Email | Telephone | Entreprise | Fonction | Interet | Statut |

### Catalogue
| ID | Date | Nom | Prenom | Email | Telephone | Entreprise | Fonction | Statut |

### Newsletter
| ID | Date | Email | Statut |

### Blog
| ID | Date | Titre | Slug | Auteur | Categorie | Tags | Extrait | Contenu | Image | Publie |

### Actualites
| ID | Date | Titre | Slug | Categorie | Tags | Extrait | Contenu | Image | Publie |

### References
| ID | Nom | Logo | Rangee | Actif |

---

## Fonctionnalités automatiques

Dès qu'un visiteur remplit un formulaire, le GAS :
1. **Enregistre** les données dans la feuille correspondante
2. **Envoie un email** à `deoconseilrh@gmail.com` avec les détails
3. **Envoie un email de confirmation** au visiteur (pour les formulaires Contact et FabrikRH)

---

## Gestion des références (logos défilants)

Pour ajouter un logo dans la bande défilante :
1. Ouvrez la feuille **References** dans votre Spreadsheet
2. Ajoutez une ligne avec : Nom, URL du logo (optionnel), Rangee (1 ou 2), Actif (TRUE)
3. Les logos s'affichent automatiquement sur le site

---

## Dashboard Admin

Accédez au Dashboard sur : `https://deoconseil-kg3mr7aj.manus.space/admin`

Le Dashboard vous permet de :
- **Blog** : créer, modifier, supprimer des articles
- **Actualités** : gérer les actualités
- **Références** : gérer les logos défilants
- **Contacts** : voir tous les messages reçus
- **FabrikRH** : voir les demandes d'inscription
- **Catalogue** : voir les téléchargements
- **Newsletter** : voir les abonnés

> **Note** : Le Dashboard nécessite que `VITE_GAS_URL` soit configuré pour fonctionner.

---

## Cloudinary (images blog/actualités)

Pour uploader des images dans le blog et les actualités, configurez Cloudinary :

1. Créez un compte gratuit sur [cloudinary.com](https://cloudinary.com)
2. Créez un **upload preset non signé** nommé `deo_conseil_unsigned`
3. Dans Manus Settings → Secrets, ajoutez :
   - `VITE_CLOUDINARY_CLOUD_NAME` : votre nom de cloud Cloudinary
   - `VITE_CLOUDINARY_UPLOAD_PRESET` : `deo_conseil_unsigned`

---

## Support

Pour toute question technique, contactez votre développeur ou consultez la documentation Manus.
