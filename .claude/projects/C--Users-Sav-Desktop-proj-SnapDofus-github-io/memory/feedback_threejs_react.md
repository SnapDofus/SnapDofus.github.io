---
name: Three.js canvas dans React — bonnes pratiques
description: Comment intégrer Three.js correctement dans un composant React
type: feedback
---

Passer le canvas directement à Three.js via un ref au lieu de laisser Three.js créer et appender son propre canvas.

**Why:** Si Three.js crée un canvas et l'append à un div, on perd le contrôle du CSS et les z-index. Avec StrictMode le canvas serait doublé.

**How to apply:**
- `<canvas ref={canvasRef} />` dans le JSX
- `new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })`
- `renderer.setSize(w, h, false)` — le 3ème param `false` empêche Three.js d'écraser le CSS width/height
- Lire les dimensions sur le **container parent** (qui a une hauteur CSS explicite), pas sur le canvas (peut retourner 0)
- Stocker la référence `lenisRaf` dans une variable nommée pour `gsap.ticker.remove(lenisRaf)` (les fonctions anonymes ne peuvent pas être retirées)
