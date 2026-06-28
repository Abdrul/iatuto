# NOTES MÉDIAS — images & vidéos dans les articles

Aide-mémoire pour insérer des médias dans le blog (iatuto.fr, Astro 5 + Cloudflare Pages).
Priorité : **SEO & performance**. On garde le site le plus léger possible.

## Où ranger les images

- **Toujours dans `src/assets/images/`** (PAS dans `public/`).
  - Dans `src/` → l'image passe par le pipeline d'optimisation Astro (compression,
    formats modernes, dimensions, lazy natif).
  - Dans `public/` → servie brute, **non optimisée**. À éviter pour les visuels d'article.
- **Un sous-dossier par thème** : `src/assets/images/elevenlabs/`, `src/assets/images/fish-audio/`, etc.

## Syntaxe IMAGE (fonctionne en `.md` ET `.mdx`)

Depuis un article situé dans `src/content/blog/`, chemin **relatif** (remonter de 2 niveaux) :

```markdown
![texte alt descriptif](../../assets/images/elevenlabs/fichier.png)
```

- `../../` = on remonte `blog/` → `content/` → `src/`.
- Cette image **sera optimisée automatiquement**.
- ⚠️ Une URL absolue type `/images/fichier.png` (= dossier `public/`) n'est **pas** optimisée.

### RÈGLE : le texte alt est OBLIGATOIRE (SEO + accessibilité)

- Jamais de `![]()` vide. Toujours un alt **descriptif** (décris l'image, place un mot-clé
  naturellement, pas de bourrage).
- ✅ `![Interface de génération de voix d'ElevenLabs en français](../../assets/images/elevenlabs/interface.png)`
- ❌ `![image](../../assets/images/elevenlabs/interface.png)`

## Syntaxe VIDÉO YouTube (nécessite un fichier `.mdx`, PAS `.md`)

Les composants ne marchent que dans `.mdx`. Pour une vidéo, l'article doit être en `.mdx`.

```mdx
---
title: "..."
description: "..."
pubDate: 2026-06-28
category: "tutoriel"
---

import { YouTube } from 'astro-embed';

<YouTube id="ID_DE_LA_VIDEO" />
```

- `id` = ce qui suit `watch?v=` dans l'URL YouTube (ou colle l'URL complète).
- Chargement **lazy** : seule une vignette légère s'affiche ; l'iframe YouTube ne se
  charge qu'au **clic** de l'utilisateur. Aucun script YouTube avant le clic.

## Règles d'or

1. **1 vidéo YouTube par article maximum** (perf + focus du contenu).
2. **alt obligatoire** sur chaque image (voir ci-dessus).
3. **Ne JAMAIS héberger de `.mp4` soi-même** → toujours un embed YouTube.
   (Pas de vidéo dans `public/`, pas de fichier vidéo dans le repo : poids, bande passante,
   pas d'optimisation, mauvais pour le SEO/perf.)
4. Images → `src/assets/images/<theme>/`. Jamais dans `public/` pour les visuels d'article.
5. Article **avec vidéo** = extension `.mdx`. Article texte + images seules = `.md` suffit.

## Rappel technique (config)

- `src/content.config.ts` : le glob loader scanne `**/*.{md,mdx}` — ne pas le rétrécir à `.md`,
  sinon les fichiers `.mdx` deviennent invisibles pour la collection.
- Intégration MDX : `@astrojs/mdx` **ligne 4.x** (compatible Astro 5). Ne pas installer la 7.x
  (elle cible un futur Astro 7 en alpha → casse).
