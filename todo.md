# DEO Conseil — TODO

## Fonctionnalités principales
- [x] Hero section avec photo et stats
- [x] Section Jamal (photo gauche, texte droite, barre rouge, fond noir)
- [x] Section VUCA avec fond gris #2a2a2a, texte blanc, compteurs animés
- [x] Section Notre ADN en accordéon dynamique
- [x] Section Missions (5 missions)
- [x] Section Services / Expertises (6 cartes)
- [x] Section Ce qui nous différencie
- [x] Section Fabrik RH (think tank)
- [x] Section Références (marquee logos)
- [x] Section Blog (3 articles statiques)
- [x] Section Newsletter
- [x] Section Contact avec formulaire Formspree
- [x] Footer avec adresse complète + Google Maps
- [x] Modal catalogue PDF
- [x] Chatbot interactif (réponses prédéfinies)
- [x] Chatbot intelligent avec API LLM (invokeLLM) — V18
- [x] Suppression complète de Zineb
- [x] Suppression section témoignages
- [x] SEO enrichi (meta tags, JSON-LD)
- [x] Responsive design (desktop, tablette, mobile)
- [x] Google Analytics et Hotjar intégrés
- [x] Pages internes (Notre ADN, Missions, Expertises, Fabrik RH, Blog)
- [x] Navigation multi-pages

## Déploiements
- [x] V17 déployé en mode public sur deoconseil-kg3mr7aj.manus.space
- [x] V18 — Chatbot IA avec invokeLLM — à déployer

## En cours
- [x] Corriger lisibilité boutons "Prendre RDV" et "Catalogue" (texte noir sur fond sombre)
- [x] Compteurs animés au scroll sur tous les chiffres clés (hero, différenciation, références)

## Corrections demandées
- [x] Bouton Catalogue — appliquer le même style rouge que "Nos Expertises" (fond rouge, texte blanc)
- [x] Vérifier que les compteurs hero (20+, 200+, 1K+) s'animent bien au scroll/chargement

## Refonte section Jamal
- [x] Réduire la taille de la section Jamal Belahrach, alléger la mise en page, photo plus compacte et proportionnée

## Ajout numéro de téléphone
- [x] Ajouter +212 (0)5 22 94 42 77 dans le footer et la section contact, sous le premier numéro

## Refonte visuelle sections
- [x] Refonte visuelle section Notre ADN — mise en page percutante, éléments visuels forts
- [x] Refonte visuelle section Missions — numéros géants, séparateurs, animations
- [x] Refonte visuelle section Ce qui nous différencie — grille asymétrique, chiffres animés, effets hover

## Refonte section Notre ADN (design collage)
- [x] Rechercher et uploader 3 photos professionnelles (coaching/RH/réunion)
- [x] Refaire le JSX/CSS de la section ADN : collage photos + bloc rouge "NOS ADN" + liste valeurs avec coches rouges et descriptions enrichies

## Modifications section Notre ADN
- [x] Remplacer les 3 photos du collage ADN par les photos fournies par le client
- [x] Créer une page dédiée /notre-adn avec le même contenu et design
- [x] Mettre à jour le lien "Notre ADN" dans la navigation pour pointer vers /notre-adn

## Footer réutilisable
- [x] Extraire le footer (newsletter + contact) en composant réutilisable
- [x] Intégrer le Footer sur toutes les pages (homepage, /notre-adn, /missions, /expertises, /la-fabrik-rh, /blog, /contact)

## Correction footer SiteFooter
- [x] Corriger la grille 5 colonnes du SiteFooter (CSS repeat(4,1fr) → 2fr 1fr 1fr 1fr 1fr)
- [x] Supprimer le footer inline de Layout.tsx (double footer sur toutes les pages sous-pages)
- [x] Footer unifié et aligné sur toutes les pages : Home, /missions, /notre-adn, /expertises, /blog, /fabrik-rh

## Audit et corrections responsive
- [x] Audit responsive sur 375px, 768px, 1440px
- [x] Ajouter media query @media (max-width: 480px)
- [x] Footer 1 colonne à 375px
- [x] Formulaire responsive à 375px
- [x] Section VUCA 1 colonne à 375px
- [x] Grilles de cartes 1 colonne à 375px

## Correction boutons CTA hero
- [x] Centrer les boutons CTA horizontalement dans le hero
- [x] Ajouter marge droite (60px min) pour éviter chevauchement chatbot
- [x] Vérifier que les boutons ne débordent pas sur les côtés
- [x] Tester le rendu sur tous les breakpoints

## Repositionnement boutons CTA hero (v2)
- [x] Déplacer les boutons CTA sous les stats dans le CSS
- [x] Positionner à gauche avec marge droite 100px minimum
- [x] Colonne verticale centrée sur mobile
- [x] Vérifier absence de chevauchement avec chatbot

## Corrections topbar et section VUCA
- [x] Supprimer les tirets "-" dans la topbar noire (topbar-sep et span.sep supprimés)
- [x] Remplir le côté droit de la section VUCA avec les 4 lettres V-U-C-A en grand format stylisé + citation Jamal
- [x] Vérifier le responsive du nouveau visuel VUCA (1024px et 768px)

## Pages dédiées expertises
- [x] Créer /expertises/conseil-strategie-rh avec contenu développé + photos
- [x] Créer /expertises/coaching-dirigeants avec contenu développé + photos
- [x] Créer /expertises/formation-developpement avec contenu développé + photos
- [x] Créer /expertises/conduite-changement avec contenu développé + photos
- [x] Créer /expertises/assessment-talents avec contenu développé + photos
- [x] Créer /expertises/culture-engagement avec contenu développé + photos
- [x] Ajouter grille de navigation inter-expertises avant le footer sur chaque page
- [x] Mettre à jour les boutons "Découvrir" sur la page Expertises principale
- [x] Enregistrer les routes dans App.tsx
- [x] Vérifier le responsive et la cohérence visuelle

## Vérification pages expertise + note stationnement
- [x] Vérifier les 6 pages d'expertise (contenu, photos, grille navigation) — toutes complètes
- [x] Ajouter note stationnement dans section Contact (SiteFooter.tsx — section coordonnées)
- [x] Ajouter note stationnement dans le footer noir (colonne Contact du footer)

## Corrections textes et liens
- [x] Remplacer "Discutez" par "Parlons-en" sur tout le site (ExpertiseDetail.tsx)
- [x] Corriger tous les liens vers les expertises (home: service-cta transformé en <a>, footer: 6 liens dédiés)
- [x] Vérifier l'accessibilité des 6 pages d'expertise (toutes 200 OK, toutes dans expertisesData)

## Popup livre "Réinventons-nous !"
- [x] Uploader l'image du livre sur le CDN (CDN: livre-reinventons-nous_1b68acd5.png)
- [x] Créer composant BookPopup (modal auto après 5s, sessionStorage, responsive)
- [x] Intégrer dans App.tsx (toutes les pages)
- [x] Tester la compilation (200 OK, 0 erreurs TypeScript)

## Topbar et boutons CTA hero
- [x] Ajouter +212 (0)5 22 94 42 77 dans la topbar
- [x] Harmoniser la taille des boutons CTA du hero (height: 44px, padding identique)

## Section Articles + Harmonisation architecture
- [x] Ajouter sous-section Articles dans la section ADN (Home.tsx)
- [x] Auditer l'architecture visuelle de toutes les sections
- [x] Harmoniser padding/margin entre sections (96px top, 52px bottom standard)
- [x] Harmoniser titres et sous-titres (section-tag 9px/0.26em, vuca-eyebrow aligné)
- [x] Harmoniser boutons CTA (height: 44px, box-sizing: border-box sur btn-red, btn-outline-dark, btn-outline-light)
- [x] Harmoniser grilles et colonnes (gap: 3px pour les grilles de cartes)
- [x] Harmoniser typographie (section-tag 9px, section-title Playfair, vuca-eyebrow aligné sur section-tag)

## Valorisation graphique Missions et Expertises
- [x] Refonte visuelle section Missions (typographie XXL, layout 2 colonnes, fond noir #1a1a1a, grandes lettres arrière-plan, hover effects)
- [x] Refonte visuelle section Expertises/Services (grille 3 colonnes, hover dark, numéros géants, accents colorés, fond cream)
- [x] Vérifier le responsive des nouvelles sections (1024px: 1 colonne missions / 2 colonnes services, 768px: 1 colonne partout)

## Texte réel Jamal Belahrach — Section VUCA
- [x] Remplacer le texte provisoire VUCA par le texte réel de Jamal Belahrach (monde VUCA, CapSkills, empowerment)
- [x] Structurer le texte en blocs graphiques distincts (bloc éditorial 2 colonnes, bloc 4C rouge, band CapSkills, citation Jamal)
- [x] Mettre en valeur graphiquement : fond rouge pour bloc 4C, fond blanc pour CapSkills, Playfair pour citation, Inter 900 pour titre

## Photo Jamal depuis catalogue PDF
- [x] Extraire la photo de Jamal Belahrach depuis le catalogue PDF (page 3, recadrage portrait)
- [x] Uploader sur CDN et remplacer l'image actuelle dans la section Fondateur (CDN: jamal-belahrach-photo_64f80888.jpg)
- [x] Redéployer en mode public

## Suppression section VUCA
- [x] Supprimer intégralement le JSX de la section VUCA dans Home.tsx
- [x] Supprimer tous les styles CSS vuca-* dans index.css (0 occurrence restante, accolades équilibrées)
- [x] Vérifier compilation et tests (14/14 passés, 0 erreur TypeScript)
- [x] Redéployer en mode public

## Refonte section Jamal Belahrach (design maquette)
- [x] Supprimer l'arrière-plan de la photo de Jamal (fond transparent, via AI generation)
- [x] Uploader la photo sans fond sur CDN (jamal-transparent_be9709dc.png)
- [x] Refaire le JSX de la section Jamal : layout 2 colonnes asymétrique, titre XXL Bebas Neue, texte complet, CapSkills en évidence
- [x] Créer les styles CSS : fond gris #E8E8E8, photo grande taille, lignes déco tricolores, numéro 21 géant, accent lime/rouge
- [x] Vérifier rendu responsive et tests (16/16 passés)
- [x] Redéployer en mode public

## Suppression section Articles & Publications
- [x] Supprimer intégralement le JSX de la section Articles & Publications dans Home.tsx
- [x] Supprimer tous les styles CSS articles-* dans index.css (0 occurrence restante)
- [x] Mettre à jour les tests, vérifier compilation et redéployer en mode public

## Remplacement photo Jamal (nouvelle photo officielle)
- [x] Supprimer l'arrière-plan de la nouvelle photo (rembg) → jamal-new-nobg_df5fa0bf.png
- [x] Uploader sur CDN et remplacer dans Home.tsx section Jamal V2
- [x] Redéployer en mode public

## Correction alignement CTA hero
- [x] Corriger align-items: center + line-height: 1 sur .hero-btns pour aligner les boutons CTA

## Refonte section "Ce qui nous différencie"
- [x] Refaire le JSX : fond var(--dark), grille 3 colonnes, 6 cartes avec numéros Bebas Neue 100px, subtitles colorés
- [x] Créer les styles CSS : hover translateY + border-bottom, stats Bebas Neue 56px, tag lime

## Harmonisation polices sur tout le site
- [x] Titres de section → Bebas Neue partout (0 Playfair restant)
- [x] Sous-titres et corps → Space Grotesk partout (0 Inter restant)
- [x] Labels/tags de section → Space Grotesk 9px uniformément
- [x] Google Fonts mis à jour : Bebas Neue + Space Grotesk uniquement

## Refonte globale — Design moderne et innovant
### Rythme visuel clair/sombre
- [x] Auditer l'ordre des sections et leurs fonds actuels
- [x] Créer un rythme intentionnel clair/sombre/clair entre les sections
- [x] Ajouter des séparateurs graphiques (lignes, formes, angles) entre sections

### Section Fondateur Jamal — Design premium
- [x] Layout plus ambitieux : grande photo, citation XXL, titre signature
- [x] Plus d'espace et de mise en scène — section la plus premium du site

### Section Contact — Design audacieux
- [x] Fond sombre, grand titre impactant, split layout (implémenté dans SiteFooter.tsx contact-v2)
- [x] Formulaire élégant et engageant (implémenté dans SiteFooter.tsx cv2-form)
- [x] Éléments graphiques décoratifs (implémenté dans SiteFooter.tsx cv2-deco-*)

### Images et reliefs
- [ ] Rechercher et uploader des images de contexte (bureaux, réunions, leadership)
- [ ] Ajouter des effets de relief (ombres portées, overlays colorés, gradients subtils)

### Titres impactants
- [x] Mélange de tailles, mots en couleur lime/rouge, italique
- [x] Effets de soulignement graphique sur les titres

### Micro-animations
- [x] Animations d'entrée fade-in/slide-up au scroll (IntersectionObserver)
- [x] Appliquer sur les éléments importants de chaque section

### Responsive
- [x] Vérifier typographie XXL qui déborde (media queries ajoutées pour toutes les sections)
- [x] Vérifier grilles qui cassent (grid-template-columns: 1fr sur mobile)
- [x] Vérifier images mal cadrées (max-width ajusté sur mobile)
- [x] Media queries ajoutées : Jamal V3, Contact V2, Footer V2 (1024px, 768px, 480px)

## Audit polices complet (avril 2026)
- [ ] Auditer toutes les font-family dans index.css
- [ ] Auditer expertise-detail.css (h2 encore en Space Grotesk au lieu de Bebas Neue)
- [ ] Auditer tous les composants TSX pour inline fontFamily
- [ ] Corriger h1/h2/h3 → Bebas Neue partout
- [ ] Corriger body/p/labels/buttons → Space Grotesk partout
- [ ] Supprimer toute police parasite
- [ ] Harmoniser font-weight, line-height, letter-spacing

## Refonte Jamal premium (design éditorial)
- [x] Supprimer ou remplacer le label "FONDATEUR & DIRIGEANT" → remplacé par "LE MOT DU FONDATEUR" en lime
- [x] Photo intégrée graphiquement (débordement, overlay coloré, fond sombre #111)
- [x] Texte structuré visuellement (citations extraites XXL, accents typo lime, séparateurs)
- [x] Éléments décoratifs (lignes, formes, numéros, corner lime, bg text PEOPLE FIRST)
- [x] Signature grande et stylisée (Bebas Neue 28px, ligne gradient rouge-olive)

## Bannières hero avec images d'ambiance (pages internes)
- [x] Rechercher et télécharger 5 images professionnelles (Unsplash)
- [x] Uploader les 5 images sur le CDN via manus-upload-file --webdev
- [x] Intégrer bannière hero avec image + overlay sur /notre-adn (équipe, collaboration)
- [x] Intégrer bannière hero avec image + overlay sur /missions (transformation, leadership)
- [x] Intégrer bannière hero avec image + overlay sur /expertises (conseil, stratégie)
- [x] Intégrer bannière hero avec image + overlay sur /fabrik-rh (formation, développement)
- [x] Intégrer bannière hero avec image + overlay sur /blog (lecture, innovation)
- [x] Créer les styles CSS pour les bannières hero (overlay sombre, gradient, charte DEO)
- [x] Responsive des bannières hero (tablette 1024px + mobile 768px)
- [x] Redéployer en mode public (v77ffae91)

## Suppression section Jamal CEO (fond sombre avec LinkedIn/globe)
- [x] Localiser le JSX de la section "JAMAL BELAHRACH / CEO & Co-Fondateur" dans Home.tsx (bloc jv3-signature, lignes 390-405)
- [x] Supprimer intégralement le JSX de cette section
- [x] Supprimer tous les styles CSS associés dans index.css (.jv3-signature, .jv3-sig-line, .jv3-sig-content, .jv3-sig-name, .jv3-sig-role, .jv3-sig-links)
- [x] Vérifier que rien n'est cassé (61 tests passés, 0 erreur TypeScript)
- [x] Redéployer en mode public (vca78c6e9)


## Harmonisation design pages internes (charte accueil)
- [x] Page Missions : fonds cream/dark alternés, accents lime/rouge, Bebas Neue, séparateurs tricolores, stats, CTA rouge
- [x] Page Fabrik RH : fonds cream/dark alternés, piliers en cartes dark, publications, communauté, CTA
- [x] Page ADN : collage photos + intro cream, valeurs en cartes dark, CTA rouge
- [x] Page Blog : intro cream, articles en cartes dark avec images, newsletter CTA rouge
- [x] Page Expertises : harmonisée avec le système pi-* (cream/dark, cartes, pourquoi DEO)
- [x] Styles CSS communs pi-* (sections, tags, titres, cartes, grilles, boutons, blog-v2, stats, mini-cards)
- [x] Responsive pi-* (tablette 1024px, mobile 768px, small 480px)
- [x] Redéployer en mode public (v167388aa)

## Améliorations contenu et fonctionnalité (sans changer le design)
- [x] Alléger le texte des 6 cartes "Ce qui nous différencie" (moins de mots, plus d'impact)
- [x] Ajouter logos clients réels (12 logos : OCP, Attijariwafa, Bank of Africa, Maroc Telecom, RAM, ONCF, Lydec, CIH, BP, Renault, TotalEnergies, Holcim)
- [x] Formulaire de contact fonctionnel (notifyOwner + mailto fallback) sans changer le design
- [x] Enrichir contenu Missions (textes professionnels : séminaires, ateliers CODIR, GPEC, cartographie talents, digitalisation RH)
- [x] Enrichir contenu Expertises (textes professionnels : CapSkills, assessment center, coaching ICF/EMCC, marque employeur)
- [x] Redéployer en mode public (vee1a5785)

## Corrections footer + section Actualités
- [x] Footer : corriger lisibilité (texte 0.65-0.7 opacité, titres h4 en lime Bebas Neue, liens hover lime, bottom 0.5)
- [x] Section Actualités : ajouter sur page d'accueil
- [x] Section Actualités : ajouter sur page Missions
- [x] Section Actualités : ajouter sur page Expertises
- [x] Section Actualités : ajouter sur page ADN
- [x] Section Actualités : ajouter sur page Fabrik RH
- [x] Section Actualités : ajouter sur page Blog
- [x] Redéployer en mode public (v893e2a91)

## Section Newsletter réutilisable
- [x] Créer composant NewsletterSection (fond sombre/rouge, titre Bebas Neue, champ email + CTA)
- [x] Styles CSS newsletter (design impactant, accents lime, responsive)
- [x] Formulaire fonctionnel (notifyOwner + mailto fallback)
- [x] Intégrer sur page d'accueil (juste avant SiteFooter)
- [x] Intégrer sur page Missions
- [x] Intégrer sur page Expertises
- [x] Intégrer sur page ADN
- [x] Intégrer sur page Fabrik RH
- [x] Intégrer sur page Blog
- [x] Redéployer en mode public (v56280291)

## Correction alignement boutons hero
- [x] Corriger align-items: center sur .hero-btns (ajout justify-content: flex-start + margin: 0 sur boutons)
- [x] Redéployer en mode public (v2d013d8b)

## Refonte premium du site
### Newsletter premium
- [x] Fond sombre #1a1a1a avec fine bande rouge accent (gradient 40%)
- [x] Max-width 680px centré, espacement généreux (72px vertical)
- [x] Supprimer décoratifs grossiers (NL, 01 supprimés)
- [x] Titre Bebas Neue taille raisonnée (clamp 32-44px), sous-titre Space Grotesk 15px
- [x] Champ email + bouton sur une ligne, design épuré (max-width 460px)
- [x] Bouton rouge sobre avec hover élégant (#a00d24, transition 0.3s)

### Harmonisation branding
- [x] Vérifier header/navbar identique sur chaque page (SiteHeader partagé)
- [x] Harmoniser padding/typo/hiérarchie des sections intro de chaque page (110px vertical)
- [x] Séparateurs cohérents partout (tricolores)
- [x] Cartes même style sur toutes les pages (transitions cubic-bezier)
- [x] CTA/boutons même style partout (.btn-red, .btn-outline-dark)
- [x] Tags/labels même style partout (.section-tag, .diff-v2-tag)

### Qualité premium générale
- [x] Réduire tailles de police excessives (hero 120px, section-title 52px, diff-v2 72px, stats 48px)
- [x] Augmenter espacements pour rendu aéré et luxueux (sections 110px)
- [x] Padding vertical suffisant sur chaque section (110px)
- [x] Transitions et hover subtils et élégants (cubic-bezier .4s)
- [x] Redéployer en mode public

## Refonte section piliers Fabrik RH (style VUCA)
- [x] Fond sombre #111, typo XXL Bebas Neue, texte FABRIK géant en arrière-plan
- [x] Numéros géants (01-03) 96px, accents lime/rouge/cyan par carte
- [x] Grille 3 colonnes avec fort contraste, barre de stats en bas
- [x] Hover effects percutants (translateY, border-color, corner reveal, line expand)
- [x] Éléments décoratifs (ligne gradient top, losange bottom, corner triangles)
- [x] Contenu textuel existant conservé (titres + descriptions)
- [x] Autres sections Fabrik RH non touchées
- [x] Redéployer en mode public (v5951960d)

## Refonte section Références premium
- [x] Titre accrocheur + sous-titre (200+ organisations depuis 2002)
- [x] Marquee/carousel automatique avec logos (double rangée, sens opposés)
- [x] Effet grayscale → couleur au hover
- [x] Logos taille cohérente et bien visibles
- [x] Chiffres clés (200+ structures, 15 pays, 21 ans) avec animation scroll
- [x] Fond sombre #111, design cohérent charte DEO
- [x] Ne pas toucher aux autres sections
- [x] Redéployer en mode public (v68900b18)

## Suppression popup livre "Réinventons-nous !"
- [x] Supprimer le composant BookPopup.tsx
- [x] Supprimer l'import et l'utilisation dans App.tsx
- [x] Supprimer tous les styles CSS book-popup-* (0 occurrence restante)
- [x] Supprimer le test qui vérifiait la présence de BookPopup
- [x] Vérifier qu'il n'y a plus de référence au localStorage deo_book_popup_seen
- [x] Tests : 98/98 passés
- [x] Redéployer en mode public (v16f09bc0)

## Intégration des vrais logos clients officiels
- [x] Recherche des URLs officielles des 20 logos clients
- [x] Intégration dans Home.tsx (rangée 1 : 6 logos, rangée 2 : 14 logos)
- [x] Conservation du design premium (marquee, grayscale→couleur, fond sombre)
- [x] Tests : 98/98 passés
- [x] Redéploiement en mode public (v26cb90c7)

## Corrections urgentes logos et footer
- [x] Logos : cartes fond blanc (#fff) avec padding, sans grayscale, opacity 0.85 → 1 au hover, box-shadow
- [x] Footer : fond #1a1a1a, texte rgba(255,255,255,0.85), titres lime, liens hover rouge, copyright #999
- [x] Redéployer en mode public (v16f09bc0)

## Revue globale premium du site
- [x] Vérifier logos clients visibles (cartes fond blanc sur fond sombre)
- [x] Vérifier footer lisible (texte blanc sur fond sombre)
- [x] Vérifier alignement boutons CTA hero (flex-wrap:nowrap, white-space:nowrap, même height 44px)
- [x] Vérifier homogénéité polices (119 occurrences Bebas Neue + Space Grotesk, 0 police étrangère)
- [x] Vérifier responsive mobile toutes pages (breakpoints 1024/768/480)
- [x] Améliorer section "Ce qui nous différencie" (icônes visuelles, texte court, séparateurs stats)
- [x] Vérifier section newsletter (fond #1a1a1a, accent rouge, responsive OK)
- [x] Vérifier branding cohérent inter-pages (Layout.tsx + SiteFooter + NewsletterSection partagés)
- [x] Corriger tout défaut d'alignement ou cassé
- [x] Redéployer en mode public (v16f09bc0)

## Corrections responsive + logos texte
- [x] Audit responsive mobile/tablette complet
- [x] Corriger hero responsive (textes, boutons, image)
- [x] Corriger navigation mobile (menu hamburger ajouté, taille réduite)
- [x] Corriger sections cartes responsive (missions-v2, services-v2, diff-v2, VUCA)
- [x] Corriger footer responsive (480px ajouté)
- [x] Corriger Jamal section responsive (déjà OK)
- [x] Corriger Fabrik RH responsive (VUCA 480px ajouté)
- [x] Corriger Blog section responsive (480px ajouté)
- [x] Corriger Contact section responsive (480px ajouté)
- [x] Remplacer logos par noms texte dans le marquee (20 noms en 2 rangées)
- [x] Ajouter effet hover couleur (blanc → rouge au hover, lime au clic) sur les noms
- [x] Redéployer en mode public (v06b48932)

## Mention parking footer + alignement pages
- [x] Ajouter mention parking dans SiteFooter.tsx (toutes les pages)
- [x] Corriger alignement FabrikRH et pages internes (pi-inner text-align center, pi-text margin auto)
- [x] Vérifier centrage/alignement sur toutes les pages (diff-v2, jamal-v3, services-v2)
- [x] Vérifier centrage mobile (fv2-top, fv2-bottom, fv2-parking responsive)
- [x] Redéployer en mode public (v04185243)

## Suppression lime/vert + justification textes
- [x] Remplacer --lime CSS variable par #AAAAAA (non utilisée, toutes les références remplacées)
- [x] Remplacer 52 occurrences var(--lime) dans CSS par var(--red), #888, #444
- [x] Remplacer toutes les occurrences lime dans TSX (Home, ADN, Missions, Expertises, FabrikRH, Blog, ActualitesSection, NotFound)
- [x] Hover noms clients marquee : lime → rouge #C8102E
- [x] Justifier tous les textes de corps : pi-text, jv3-para, jv3-pullquote-text, diff-v2-subtitle, diff-v2-card-text, mission-desc, service-desc, pi-card-text, nl-desc, blog-card-excerpt, blog-featured-excerpt, actu-card-excerpt, cv2-subtitle, fabrik-vuca__card-text, adn-v2-intro
- [x] Titres restent centrés (Bebas Neue)
- [x] Redéployer en mode public (v7e4c862a)

## Uniformisation pages internes style FabrikRH
- [x] Auditer le pattern FabrikRH (tag centré bordure rouge, titre Bebas Neue mot-clé rouge, paragraphes justifiés centrés, fond crème)- [x] Appliquer le pattern à la page Notre ADN (tag NOTRE IDENTITÉ, titre centré, 2 paragraphes)
- [x] Appliquer le pattern à la page Missions (tag NOS MISSIONS, pi-lime→pi-red)
- [x] Appliquer le pattern à la page Expertises (tag NOS COMPÉTENCES, pi-lime→pi-red)
- [x] Appliquer le pattern à la page Blog Déo (tag NOS ACTUALITÉS, retiré pi-center)
- [x] Appliquer le pattern aux pages d'expertise détail (section pi-section--cream ajoutée après hero)
- [x] Supprimer toutes les classes pi-lime et pi-tag--lime restantes (FabrikRH, ActualitesSection, CSS)
- [x] Redéployer en mode public (v493bbb0f)utes les pages
- [x] Redéployer en mode public (v493bbb0f)

## Remettre section photo dirigeant/équipe sur page ADN
- [x] Remettre la section collage photos (adn-v2-layout, adn-collage) après l'intro uniforme
- [x] Conserver l'en-tête uniforme (tag NOTRE IDENTITÉ + titre) en haut
- [x] Vérifier que les images CDN sont toujours accessibles (HTTP 200)
- [x] Redéployer en mode public (vd98bad49)

## Alignement boutons CTA hero
- [ ] Corriger hero-btns : flex, align-items center, même hauteur pour les deux boutons
- [ ] Redéployer en mode public

## Corrections CTA hero + hero Missions
- [x] Aligner boutons CTA hero (flex-direction row, align-items center, flex-wrap nowrap, min-height 44px)
- [x] Fond hero Missions : linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #111111 100%)
- [ ] Redéployer en mode public

## Accordéon FabrikRH + harmonisation polices/couleurs
- [ ] Transformer les 4 cartes FabrikRH en accordéon interactif (clic = déploie/ferme)
- [ ] Animation fluide (max-height transition), icône + qui tourne 45° quand ouvert
- [ ] Un seul item ouvert à la fois
- [ ] Harmoniser polices FabrikRH (Bebas Neue titres, Space Grotesk corps)
- [ ] Remplacer bleu/teal par rouge/gris dans les barres de séparation
- [ ] Redéployer en mode public

## Audit et corrections urgentes (avril 2026)
- [x] Alignement DÉFINITIF boutons CTA hero : flex row, align-items center, height 52px, tous breakpoints
- [x] Audit contraste texte sur tout le site : corriger textes invisibles (gris sur noir, blanc sur crème)
- [x] Homogénéité polices : Bebas Neue titres, Space Grotesk corps uniquement
- [x] Couleurs non conformes : remplacer bleu/teal/vert/jaune par rouge #C8102E, blanc, noir ou gris
- [x] Redéployer en mode public (v91be32a9)

## Corrections avril 2026 - batch 2
- [x] Hero Missions : fond blanc cassé (#F8F8F8), textes noir/gris foncé, section missions suivante fond noir (#111)
- [x] Alignement définitif boutons CTA : align-items stretch, height 56px, tous breakpoints
- [x] WhatsApp Business +212 6 64 02 26 30 dans la topbar de toutes les pages (icône verte, lien wa.me)
- [x] Numéros fixes dans tous les formulaires : +212 522 94 42 74 et +212 522 94 42 77
- [x] Bloc Up-skilling / Re-skilling ajouté dans la section Jamal Belahrach
- [x] Expérience Jamal : 21+ → 27+ (3 occurrences mises à jour)
- [x] Redéployer en mode public (v4dd735df)

## Corrections avril 2026 - batch 3
- [x] Supprimer icône WhatsApp du groupe réseaux sociaux (garder uniquement LinkedIn, Instagram, Facebook)
- [x] Deux numéros fixes (+212 522 94 42 74 et +212 522 94 42 77) dans TOUS les formulaires de contact de toutes les pages
- [x] Redéployer en mode public (v47c9007e)

## Corrections avril 2026 - batch 4
- [x] Déplacer bloc Up-skilling AVANT la citation de Jamal
- [x] Reformater en schéma visuel avec cartes numérotées (01-05) en grille
- [x] Redéployer en mode public (v9eb48ebb)

## Corrections avril 2026 - batch 5
- [x] Mettre à jour l'adresse DEO Conseil sur tout le site : 37 Rue Jalal Eddine Sayouti, Résidence Malika, 3ème étage, App. 16, Casablanca
- [x] Mettre à jour le lien Google Maps avec la nouvelle adresse
- [x] Redéployer en mode public (v29d3267e)

## Corrections avril 2026 - batch 6
- [x] Expertises : "Formations" → "Empowerment" (déjà fait), "E-learning hybride" supprimé (déjà fait)
- [x] Différenciation : "Praticiens" → "Partenaires" (déjà fait), "International" → "Accompagnement sur mesure"
- [x] FabrikRH : Recherche & Innovation RH description → "Veille permanente sur les pratiques RH mondiales."
- [x] Photo Jamal : remplacée par la nouvelle photo (CDN JAMAL_f69d8b1b.png)
- [x] Section Jamal : texte restructuré avec "Lire plus/moins" (2 paragraphes visibles, reste masqué)
- [x] Redéployer en mode public (vee9a575c)

## Corrections avril 2026 - batch 7
- [ ] 27 clients dans le marquee (OCP, CDG, SCR, Renault Group, Orange, BMCI-BNP Paribas, etc.)
- [ ] 4 nouveaux compteurs : +250 Entreprises, 1500 Cadres, 25000 Collaborateurs formés, 100000 évalués
- [ ] Refonte complète page ADN (7 sections + section Jamal)
- [ ] Redéployer en mode public

## Corrections avril 2026 - batch 8
- [x] Remplacer les 4 marqueurs ADN (Engagement→Exigence, Expertise→Empathie, Innovation→Disruption, Impact→Authenticité)
- [x] Refonte design section 4 marqueurs : fond blanc, mots XXL Bebas Neue 80-100px, cartes avec numéros rouges, hover fond rouge #C8102E texte blanc
- [x] Vérifier label "JAMAL BELAHRACH" sur page d'accueil (remplace "LE MOT DU FONDATEUR")
- [x] Vérifier compteurs alignés sur une ligne dans section Missions (250+, 1500+, 25000+, 100000+)
- [x] Supprimer bouton "VOIR NOS EXPERTISES" du hero Missions (garder seulement "PARLONS-EN") — déjà absent
- [ ] Redéployer en mode public

## Corrections avril 2026 - batch 9
- [x] Uploader 3 photos équipe DEO sur CDN (equipe_deo_1.png, equipe_deo_2.png, equipe_deo_3.webp)
- [x] Remplacer section "NOTRE CONVICTION FONDATRICE" (raison d'être) dans ADN.tsx par nouveau texte VUCA + capital humain
- [x] Intégrer les 3 photos en mosaïque créative dans la section conviction
- [ ] Redéployer en mode public

## Corrections avril 2026 - batch 9
- [x] Uploader 3 photos équipe DEO sur CDN (equipe_deo_1.png, equipe_deo_2.png, equipe_deo_3.webp)
- [x] Remplacer section "NOTRE CONVICTION FONDATRICE" (raison d'être) dans ADN.tsx par nouveau texte VUCA + capital humain
- [x] Intégrer les 3 photos en mosaïque créative dans la section conviction
- [x] Corriger badges assessment : tous les 10 outils sur une seule ligne (flex-wrap: nowrap, font-size: clamp, padding: clamp)
- [x] Redéployer en mode public (vd90acdd7)

## Enrichissement photos site (batch 10)
- [x] Rechercher et télécharger 10-15 photos libres de droits (leadership, coaching, formation, management, Afrique/Maroc business)
- [x] Uploader toutes les photos sur le CDN webdev
- [x] Intégrer bande photo 4 colonnes dans Home.tsx (Leadership, Formation, Conseil, Diversité)
- [x] Intégrer mosaïque photo 2+2 dans Missions.tsx (entre grille et stats)
- [x] Intégrer section photo split 50/50 dans Expertises.tsx (Coaching + Formation)
- [x] Intégrer section photo immersive dans FabrikRH.tsx (communauté experts)
- [x] Remplacer les 6 images dupliquées dans Blog.tsx par des photos variées du CDN
- [x] Redéployer en mode public (vf5a06797)

## Remplacement expertises par 4 pôles (batch 11)
- [x] Remplacer les 6 expertises par 4 pôles dans Expertises.tsx (Transformation, Conseil RH, Assessment & Coaching, People Development CapSkills)
- [x] Remplacer les 6 expertises par 4 pôles dans Home.tsx (section services-v2)
- [x] Mettre à jour les liens expertises dans le footer (SiteFooter.tsx)
- [x] Routes App.tsx inchangées (route dynamique /expertises/:slug fonctionne avec les nouveaux slugs)
- [x] Mettre à jour ExpertiseDetail.tsx avec les 4 nouveaux pôles
- [x] Mettre à jour le chatbot (chat.ts) avec les 4 pôles
- [x] Mettre à jour les tests (homepage.test.ts, banners.test.ts) — 98/98 passés
- [x] Redéployer en mode public (vd3039379)

## Batch 12 — Blog DEO + Page Programmes sur mesure
- [x] Renommer "Blog Déo" → "Blog DEO" partout (navigation, titres, labels, footer, tests)
- [x] Créer la page /programmes-sur-mesure avec 5 blocs de programmes (pagination 2 par page)
- [x] Ajouter la route dans App.tsx et le lien dans la navigation (entre Expertises et La Fabrik RH)
- [x] Ajouter section aperçu Programmes sur mesure sur la page d'accueil (style section Expertises)
- [x] Tests : 98/98 passés
- [x] Redéployer en mode public (v943a0d7c)

## Corrections compteurs et bouton Missions (batch 12b)
- [x] Corriger compteurs 25 000+ et 100 000+ sur une seule ligne (white-space: nowrap, font-size: clamp)
- [x] Supprimer bouton "VOIR NOS EXPERTISES" du hero Missions (déjà absent)

## Batch 13 — Restructuration expertises + Programmes sur mesure
- [x] Grille 2x2 sur page Expertises (2 cartes par ligne, cliquables vers page détail)
- [x] Pages détail enrichies : hero + approche + méthodologie + services + rappel 3 autres pôles
- [x] Créer page /programmes-sur-mesure avec 5 blocs de programmes
- [x] Ajouter section aperçu Programmes sur la page d'accueil
- [x] Ajouter route + navigation pour Programmes sur mesure
- [x] Renommer Blog Déo → Blog DEO partout
- [x] Corriger compteurs Missions (4 sur une ligne, nowrap)
- [x] Tests : 98/98 passés
- [x] Redéployer en mode public (v943a0d7c)

## Batch 14 — Suppression bloc UP-SKILLING ADN
- [x] Supprimer le bloc "UP-SKILLING · RE-SKILLING" (5 cartes) de la page ADN
- [x] Redéployer en mode public (v943a0d7c)

## Batch 14b — Badges assessment visibles
- [x] Corriger badges assessment (flex-wrap: wrap, 2 lignes max, badge LEARN visible)
- [x] Redéployer en mode public (v943a0d7c)

## Batch 15 — Suppression compteurs et bouton hero Missions
- [x] Supprimer les 4 compteurs (250+, 1 500+, 25 000+, 100 000+) du hero Missions (Home.tsx + Missions.tsx)
- [x] Supprimer le bouton "VOIR NOS EXPERTISES" du hero Missions (garder seulement "PARLONS-EN")
- [x] Redéployer en mode public (v5afec3bb)

## Batch 16 — Suppression section Jamal ADN
- [x] Supprimer la section Jamal Belahrach de la page Notre ADN (photo, label, titre, citation, texte VUCA, badge, bouton)
- [x] Redéployer en mode public (vfd00168e)

## Batch 17 — Audit complet couleurs et contrastes
- [x] Scanner toutes les couleurs parasites (bleu, vert, jaune, cyan, orange) dans CSS et TSX
- [x] Corriger index.css : variables globales, thème, palette stricte blanc/noir/rouge/gris
- [x] Corriger couleurs dans Home.tsx
- [x] Corriger couleurs dans ADN.tsx
- [x] Corriger couleurs dans Missions.tsx
- [x] Corriger couleurs dans Expertises.tsx et ExpertiseDetail.tsx
- [x] Corriger couleurs dans Programmes.tsx
- [x] Corriger couleurs dans FabrikRH.tsx
- [x] Corriger couleurs dans Blog.tsx
- [x] Corriger couleurs dans composants partagés (Layout, SiteFooter, Header)
- [x] Vérifier alternance fond noir/blanc/gris sur toutes les pages
- [x] Vérifier contrastes texte/fond sur toutes les sections
- [x] Redéployer en mode public (v2dce766e)

## Batch 18 — Refonte page Programmes sur mesure (design premium)
- [x] Rechercher et uploader 5 photos thématiques (leadership, équipe, coaching, management, bien-être)
- [x] Réécrire Programmes.tsx : hero sombre Bebas Neue, layout alterné magazine, numéros géants, puces rouges, encadré Impact, CTA final
- [x] Réécrire les styles CSS : alternance fond noir/blanc/gris, transitions, responsive
- [x] Redéployer en mode public (v028bed52)

## Batch 19 — Section citation Home : fond gris clair
- [x] Changer le fond de la section citation (Home.tsx) de noir sombre à gris clair (#f5f5f5 ou #eeeeee)
- [x] Adapter le texte : couleur noire, guillemets rouges, ligne rouge conservée
- [ ] Redéployer en mode public

## Batch 20 — Modifications multiples (pasted_content)
- [ ] Remplacer la liste missions Home par les 6 cartes de la page Missions
- [ ] Expertises Home : grille 2x2 avec CTA "lire plus" vers les pages expertises
- [ ] Expertises Home : ajouter CTA "Parlons-en" sous la grille
- [ ] Pages Expertises : section "Nos 4 pôles" en grille 2x2 avec CTA vers pages
- [ ] Uniformiser les stats (200+ entreprises, 15+ pays, 20+ ans) sur toutes les pages
- [ ] Refondre page Programmes : accordéon interactif (code fourni)
- [ ] Redéployer en mode public


## Batch 21 — 6 Modifications majeures

- [x] Modification 1 : Remplacer liste missions Home par 6 cartes (pi-card--dark)
- [x] Modification 2 : Grilles expertises 2x2 avec CTAs "Lire plus" (Home + pages Expertises)
- [x] Modification 3 : Unifier les stats sur toutes les pages (250+, 1.5K+, 25K+, 100K+)
- [x] Modification 4 : Remplacer Programmes par design accordion interactif (5 panneaux)
- [x] Modification 5 : Ajouter CTA "Parlons-en" sous expertises Home (vers /contact)
- [x] Tests batch 21 (98 tests passés)
- [x] Checkpoint batch 21 (v671f1b8a)
- [x] Redéploiement public (v00a42bdd)

## Batch 22 — Correction modification 4

- [x] Restaurer Programmes.tsx avec le design magazine original (batch 18)
- [x] Ajouter l'accordion interactif dans la section aperçu Programmes de Home.tsx
- [x] Tests batch 22 (98/98 passés)
- [x] Checkpoint batch 22 (v15448462)
- [x] Redéploiement public (v15448462)

## Batch 23 — Sections manquantes Home

- [x] Remplacer section Programmes Home par accordion hover exact (CTAs vers ancres page Programmes)
- [x] Remplacer section Vos Enjeux RH par sliding cards avec prev/next + scroll horizontal
- [x] Tests batch 23 (98/98 passés)
- [x] Checkpoint batch 23 (v74cc646f)
- [x] Redéploiement public (v74cc646f)

## Batch 24 — Corrections ancres + pleine largeur

- [x] Ajouter IDs d'ancres (prog-01 à prog-05) dans Programmes.tsx sur chaque section
- [x] Corriger les CTAs Home accordion vers les bonnes ancres
- [x] Vos Enjeux RH : supprimer padding/box, passer en pleine largeur
- [x] Tests batch 24 (98/98 passés)
- [x] Checkpoint batch 24 (v073ad651)
- [x] Redéploiement public (v073ad651)

## Batch 25 — Fix définitif pleine largeur + ancres hash

- [x] Identifier et supprimer le conteneur parent qui encadre Vos Enjeux RH (jamal-v3 ou autre)
- [x] Corriger la navigation hash dans Programmes.tsx avec useEffect + window.location.hash
- [x] Tests batch 25 (98/98 passés)
- [x] Checkpoint batch 25 (v5e1cac8d)
- [x] Redéploiement public (v5e1cac8d)

## Batch 26 — Cartes missions Home = Missions stratégiques

- [x] Lire les 6 cartes "Nos 6 missions stratégiques" dans Missions.tsx
- [x] Remplacer les 6 cartes pi-card--dark dans Home par les cartes missions stratégiques (contenu + style)
- [x] Supprimer les 4 images sous les cartes missions dans Home
- [x] Tests batch 26 (98/98 passés)
- [x] Checkpoint batch 26 (v6fa34ffe)
- [x] Redéploiement public (v6fa34ffe)

## Batch 27 — 8 modifications client

- [x] Remplacer "Diagnostic gratuit" et "Demander un devis" par "Parlons-en" (lié /contact) sur tout le site
- [x] Ajouter pictogrammes (téléphone, email, adresse) dans section contact du footer
- [x] Page ADN : aligner les chiffres clés, ajuster disposition photos
- [x] Page ADN : remplacer section "NOTRE CONVICTION FONDATRICE" par schéma 01/02/03 (Raison d'être / Vision / Notre ADN)
- [x] Page ADN : ajouter CTA "Parlons-en"
- [x] Page ADN : aligner les outils sur une seule ligne ou défilement dynamique
- [x] Corriger contrastes (rouge sur rouge, noir sur noir) et justifier textes (Fabrik RH, Blog, autres)
- [x] Aligner boutons "Découvrir ce pôle" dans section 4 pôles page Expertises
- [x] Ajouter rappel section 4 pôles sur chaque page expertise individuelle (déjà présente dans ExpertiseDetail.tsx)
- [x] Conserver les chiffres FabrikRH tels quels (20+ années, 50+ publications, 1K+ experts, 15+ pays)
- [x] Tests batch 27 (98/98 passés)
- [x] Checkpoint batch 27 (v6cc57f73)
- [ ] Redéploiement public

## Batch 28 — Corrections page Notre ADN

- [x] Supprimer le pill "QUI NOUS SOMMES" du hero de la page Notre ADN
- [x] Supprimer le bloc "NOTRE VISION" et son texte de la page Notre ADN
- [x] Restaurer les images à côté du schéma 01/02/03 sur la page Notre ADN
- [x] Tests batch 28 (98/98 passés)
- [x] Checkpoint batch 28 (vc2cf7822)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 29 — 4 corrections visuelles

- [x] Page ADN : aligner les 4 stats (250+, 1500+, 25000+, 100000+) sur une ligne horizontale
- [x] Footer : ajouter icônes (téléphone, email, WhatsApp, adresse) dans la section contact
- [x] Page Expertises : aligner les boutons "Découvrir ce pôle" en bas à droite de chaque carte
- [x] Page FabrikRH : rendre le texte des 4 pôles (01-04) blanc sur fond sombre
- [x] Tests batch 29 (98/98 passés)
- [x] Checkpoint batch 29 (v6c9be708)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 30 — Sync expertises + correction Programmes hero

- [x] Expertises.tsx : mettre les 4 pôles dans l'ordre : Assessment & Coaching, People Development (CapSkills), Transformation des Hommes et des Organisations, Conseil RH
- [x] Home.tsx : synchroniser la section expertises avec le même ordre et les mêmes données
- [x] ExpertiseDetail.tsx : réordonné et doublons supprimés (4 entrées uniques dans le bon ordre)
- [x] Programmes.tsx hero : supprimé "— DEO CONSEIL", reste juste "CAPSKILLS"
- [x] Tests batch 30 (98/98 passés)
- [x] Checkpoint batch 30 (v4c76647b)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 31 — Sync section "Nos 4 pôles" dans les pages de détail

- [x] ExpertiseDetail.tsx : section rappel 4 pôles remplace par pi-card identiques (import poles[], même structure, même ordre, même contenu, CTA "Page actuelle" pour le pôle courant)
- [x] Tests batch 31 (98/98 passés)
- [x] Checkpoint batch 31 (vfcc3f8f3)
- [ ] Redéploiement public

## Batch 32 — Cartes 4 pôles identiques visuellement dans ExpertiseDetail

- [x] ExpertiseDetail.tsx : section 4 pôles = JSX identique à Expertises.tsx (mêmes classes, même structure, même CTA "Découvrir ce pôle →" pour toutes les cartes, pi-card--active supprimé)
- [x] Tests batch 32 (98/98 passés)
- [x] Checkpoint batch 32 (v98c6ef0a)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 33 — Home.tsx : 4 cartes pôles fond blanc/texte noir

- [x] Home.tsx : section expertises remplace par pi-card--light (import poles[], fond blanc, texte noir, même structure que Expertises.tsx)
- [x] index.css : variante pi-card--light ajoutée (bg blanc, texte noir, ombres légères, hover avec border rouge)
- [x] Tests batch 33 (98/98 passés)
- [x] Checkpoint batch 33 (v69d25aa7)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 34 — Responsive global

- [x] Navigation : menu mobile hamburger fonctionnel, topbar masquée sur 480px, logo redimensionné
- [x] Hero (Home) : texte et image empilés sur mobile, stats en 2x2 sur 480px
- [x] Sections Home : pi-grid--2 en 1 colonne sur mobile, overflow-x hidden sur toutes les sections
- [x] Pages intérieures : breakpoints 1024/768/480px couverts pour toutes les pages
- [x] Footer fv2 : colonnes empilées sur mobile, icônes contact responsive
- [x] ExpertiseDetail : breakpoint 768px ajouté (manquait entre 1024px et 480px)
- [x] fabrik-accordion : media queries 768px et 480px ajoutées
- [x] pi-card--light : media queries 768px et 480px ajoutées
- [x] overflow-x hidden global sur toutes les sections
- [x] Tests batch 34 (98/98 passés)
- [x] Checkpoint batch 34 (vcfc6312e)
- [ ] Redéploiement public

## Batch 35 — Hero responsive fix

- [x] Hero mobile : image EN HAUT (order: -1), section 100vh, contenu en bas (768px et 480px)
- [x] Tests batch 35 (98/98 passés)
- [x] Checkpoint batch 35 (v8d6047af)
- [ ] Redéploiement public

## Batch 36 — Stats hero 2x2 mobile

- [x] Hero stats : grille 2x2 sur mobile (250+, 1.5K+, 25K+, 100K+ en 2 colonnes) — 768px et 480px
- [x] Checkpoint batch 36 (vb9245116)
- [ ] Redéploiement public

## Batch 37 — 6 corrections UI

- [x] Missions.tsx : section photo-band (3 images) supprimée
- [x] Expertises.tsx : texte "enjeu" en blanc souligné (plus de rouge sur rouge)
- [x] Expertises.tsx : texte "Contactez-nous..." supprimé
- [x] Nav Layout.tsx + Home.tsx : bouton Catalogue redirige vers /#contact
- [x] Programmes.tsx : texte CTA supprimé, lien vers /#contact
- [x] Blog.tsx : blog-v2-link aligné en bas via flex + margin-top auto
- [x] Tests batch 37 (98/98 passés)
- [x] Checkpoint batch 37 (v6dcf178c)
- [ ] Redéploiement public

## Batch 38 — ADN section schéma : schéma gauche, 3 images droite

- [x] ADN.tsx : schéma à gauche (grid 1fr 380px), images à droite
- [x] ADN.tsx : 3 images (EQUIPE_3 grande + EQUIPE_1 + EQUIPE_2 en 2 carrées)
- [x] index.css : adn-schema__layout inversé, adn-schema__images-row ajouté, breakpoints 1024/900/640px
- [x] Tests batch 38 (98/98 passés)
- [x] Checkpoint batch 38 (v517c74f8)
- [x] Redéploiement public (deoconseil-kg3mr7aj.manus.space)

## Batch 39 — VOS ENJEUX RH : cartes -30%, supprimer phrase scroll

- [x] index.css : cartes rh-card réduites de 30% (560px→392px, 430px→301px, padding 28→20, police 28→20px)
- [x] Home.tsx : phrase "Scrollez horizontalement..." supprimée
- [x] Tests batch 39 (98/98 passés)
- [x] Checkpoint batch 39 (ve0acafd7)
- [ ] Redéploiement public

## Batch 40 — Logo CapSkills dans hero Programmes

- [x] Logo capskills.jpeg uplodé en CDN (cloudfront.net)
- [x] Programmes.tsx : logo CapSkills ajouté au-dessus du titre (fond blanc, ombre, 220px)
- [x] Tests batch 40 (98/98 passés)
- [x] Checkpoint batch 39+40 (va4c1649f)
- [ ] Redéploiement public

## Batch 41 — ADN corrections

- [x] index.css : titres cartes valeurs ADN réduits (clamp 48→32px, 80→56px) + word-break + hyphens
- [x] index.css : grille 5x2 pour les outils d'assessment (plus de scroll horizontal)
- [x] Tests batch 41 (98/98 passés)
- [x] Checkpoint batch 41 (v3735db96)
- [ ] Redéploiement public

## Batch 42 — Corrections Home + Footer

- [x] Home.tsx : supprimer le rouge sous la photo Jamal (fond noir direct, pas de bande rouge)
- [x] SiteFooter.tsx : rendre l'email contact@deoconseil.com cliquable (mailto:)
- [x] Tests batch 42 (98/98 passés)
- [x] Checkpoint batch 42 (v4627fe75)
- [ ] Redéploiement public

## Batch 43 — Photo Management de la Complexité (Programmes)

- [x] Uploader managementdecomplexité.jpeg sur le CDN (CDN: managementdecomplexite_34135de5.jpeg)
- [x] Programmes.tsx : intégrer la photo dans la section "Management de la Complexité"
- [x] Tests batch 43 (98/98 passés)
- [x] Checkpoint batch 43 (v3db2f975)
- [ ] Redéploiement public

## Batch 44 — Photo Engagement & Performance Collective (Programmes)

- [x] Uploader engagement.jpeg sur le CDN (CDN: engagement_93d9ac1f.jpeg)
- [x] Programmes.tsx : remplacer l'image de la section "Engagement & Performance Collective" (prog 02)
- [x] Tests batch 44 (98/98 passés)
- [x] Checkpoint + déploiement public

## Batch 45 — Corrections photos Programmes sur mesure

- [x] Prog 02 : image originale equipe restaurée
- [x] Prog 04 : photo engrenages (managementdecomplexite) correctement assignée
- [x] Photos 3/4/5 : threshold IntersectionObserver réduit à 0.05 + rootMargin pour déclencher l'animation plus tôt
- [x] Tests batch 45 (98/98 passés)
- [x] Checkpoint + déploiement public (v7e0d1b59)

## Batch 47 — Section ADN : schéma plus petit, photos plus grandes

- [ ] index.css : modifier grid-template-columns de adn-who__layout (schéma 35% → 28%, photos 65% → 72%)
- [ ] Réduire la taille des éléments du schéma (icônes, numéros, titres)
- [ ] Tests batch 47
- [x] Checkpoint + déploiement public

## Batch 48 — Home page : logo CapSkills + CTA band

- [ ] Uploader cap.png sur le CDN
- [ ] Home.tsx : remplacer la pill "CAPSKILLS — DEO CONSEIL" par l'image cap.png
- [ ] Home.tsx : supprimer le texte "Programmes co-construits, expertises praticiens, impact immédiat." dans la bande CTA
- [ ] Tests batch 48
- [x] Checkpoint + déploiement public

## Batch 50 — Bouton Catalogue → #contact

- [ ] Trouver tous les boutons/liens "Catalogue" dans toutes les pages (nav, home, adn, expertises, missions, programmes, fabrik, blog)
- [ ] Les faire pointer vers #contact (formulaire de contact de la page courante)
- [ ] Tests batch 50
- [x] Checkpoint + déploiement public

## Batch 51 — Catalogue popup + logos CapSkills

- [x] Uploader DEO-CONSEIL-Catalogue-CapSkills-2024-2025.pdf sur CDN
- [x] Uploader logo CapSkills fond noir (capskills-dark_9ff573c7.png) sur CDN
- [x] Layout.tsx : bouton Catalogue → popup formulaire (Nom, Prénom, Tél, Email, Entreprise, Fonction) + téléchargement PDF CDN
- [x] Home.tsx : logo CapSkills dans section Programmes sur mesure → height 100px
- [x] Programmes.tsx : logo CapSkills dans hero → version fond noir (capskills-dark)
- [x] Tests batch 51 (98/98 passés)
- [x] Checkpoint + déploiement public

## Batch 55 — Popup catalogue + logo CapSkills home

- [ ] Réparer le popup catalogue (ne s'ouvre pas sur aucune page)
- [ ] Home.tsx : réduire le logo CapSkills à 80px (moitié de 160px)
- [x] Checkpoint + déploiement public

## Batch 59 — Photo Jamal : supprimer fond marron → PNG transparent
- [ ] Télécharger la photo Jamal depuis le CDN actuel
- [ ] Supprimer le fond marron avec rembg (détourage automatique)
- [ ] Uploader le PNG transparent sur le CDN
- [ ] Home.tsx : remplacer l'URL de la photo Jamal par le PNG transparent
- [x] Checkpoint + déploiement public

## Batch 60 — Dynamisation GAS + Corrections
- [x] GAS_CODE.gs : schéma FabrikRH corrigé (Prenom, Nom, Fonction, Interet)
- [x] GAS_CODE.gs : templates email FabrikRH mis à jour
- [x] AdminFabrikRH.tsx : colonnes alignées avec nouveau schéma
- [x] Blog.tsx : fetch dynamique depuis GAS (getBlog) + fallback statique
- [x] Actualites.tsx : fetch dynamique depuis GAS (getActualites) + fallback statique
- [x] Home.tsx : bandes de logos défilantes dynamiques depuis GAS (getReferences)
- [x] index.css : styles refs-v2__logo-img + blog skeleton loading + admin-badge--green
- [x] NewsletterSection.tsx : bug corrigé (submitNewsletter → subscribeNewsletter)
- [x] Checkpoint + déploiement public

## Corrections session courante
- [x] Fix references logos display (PNG, bigger, currently not appearing at all)
- [x] Create comprehensive French PDF guide for Admin Dashboard (image ratios + step-by-step usage)

## Self-hosting — session courante
- [x] Fix gasPost redirect handling (GAS POST 302 → follow redirect properly)
- [x] Hardcode GAS_URL and Cloudinary values in gas.ts (no VITE_ env required)
- [x] Replace LLM chatbot with static keyword-matching responses (no server dependency)
- [x] Admin login already autonomous (email/password, no Manus OAuth)
- [x] Remove async/await from sendMessage (botReply now synchronous)

## Vercel deployment fix
- [x] Add vercel.json for correct Vercel build/deploy config
- [x] Remove Manus-specific plugins from vite.config.ts
- [x] Simplify main.tsx to remove tRPC/Manus OAuth dependencies
- [x] Verify pnpm build produces correct dist/ output
- [ ] Create final ZIP with Vercel-ready config
