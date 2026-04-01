---
name: GSAP dans React — bonnes pratiques
description: Comment utiliser GSAP correctement dans des composants React
type: feedback
---

Ne jamais utiliser React.StrictMode avec GSAP — les useEffect s'exécutent deux fois et les animations restent bloquées à opacity:0.

**Why:** StrictMode double les useEffect en dev, GSAP set l'état initial (opacity:0) au 1er mount, puis le cleanup reverte, laissant les éléments invisibles.

**How to apply:**
- Supprimer `<React.StrictMode>` dans main.jsx
- Toujours utiliser `gsap.context()` avec un ref sur le container parent : `const ctx = gsap.context(() => { ... }, ref)` + `return () => ctx.revert()`
- Utiliser `sectionRef.current.querySelectorAll()` au lieu de `document.querySelectorAll()` pour scoper les animations
- Appeler `ScrollTrigger.refresh()` à la fin du contexte GSAP
