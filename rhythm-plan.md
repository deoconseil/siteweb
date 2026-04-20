# Rythme visuel — Plan final

## Actuel
1. HERO — #fff (CLAIR)
2. JAMAL V3 — #E8E8E8 gris (CLAIR) ← 2 clairs
3. MISSIONS — #1a1a1a (SOMBRE) ✓
4. SERVICES — var(--cream) (CLAIR) ✓
5. DIFF V2 — var(--dark) (SOMBRE) ✓
6. CATALOGUE BAND — rouge (ACCENT)
7. FABRIK — var(--mid) (SOMBRE) ← 2 sombres après diff
8. REFS — #000 (SOMBRE) ← 3 sombres!
9. BLOG — #fff (CLAIR) ✓
10. CONTACT V2 — #0a0a0a (SOMBRE) ✓
11. FOOTER V2 — #050505 (SOMBRE) ← 2 sombres

## Problèmes
- Sections 1-2 : 2 clairs consécutifs
- Sections 5-6-7-8 : diff(sombre) → catalogue(accent) → fabrik(sombre) → refs(sombre) = trop sombre
- Sections 10-11 : contact(sombre) → footer(sombre) = ok car footer est toujours sombre

## Plan optimisé
1. HERO — #fff (CLAIR) — garder
2. JAMAL V3 — #E8E8E8 (GRIS CLAIR) — garder, c'est un gris neutre qui fait transition
3. MISSIONS — #1a1a1a (SOMBRE) ✓ 
4. SERVICES — var(--cream) (CLAIR) ✓
5. DIFF V2 — var(--dark) (SOMBRE) ✓
6. CATALOGUE BAND — rouge (ACCENT) — garder
7. FABRIK — changer en CLAIR (cream) pour casser la séquence sombre
8. REFS — #000 (SOMBRE) ✓
9. BLOG — #fff (CLAIR) ✓
10. CONTACT V2 — #0a0a0a (SOMBRE) ✓
11. FOOTER V2 — #050505 (SOMBRE) — ok, c'est le footer

Rythme: C-G-S-C-S-A-C-S-C-S-S
= alternance quasi parfaite

## Changements CSS à faire
- .fabrik : background var(--mid) → var(--cream), textes noirs
- .fabrik-card : background var(--dark) → #fff, textes noirs
- Ajouter séparateurs SVG entre hero/jamal, services/diff
- Ajouter images de contexte dans missions et services
