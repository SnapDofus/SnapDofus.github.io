---
name: Stack technique du portfolio
description: Technologies et structure du projet portfolio React
type: project
---

Portfolio de Frédéric KOKOU ESSONE converti de vanilla JS vers React + Vite.

**Stack** : React 18, Vite 5, GSAP + ScrollTrigger, Lenis (smooth scroll), Three.js, GLTFLoader, Spline viewer (web component)

**Structure** :
- `src/main.jsx` → entry point (sans StrictMode, incompatible GSAP)
- `src/App.jsx` → state global (popup WhatsApp, menu mobile)
- `src/components/` → CustomCursor, BgCanvas, Loader, Header, MobileNav, WhatsAppPopup, Hero, BottomSection, RobotSection, Services, WorkProcess, Portfolio, Footer
- `public/assets/` → toutes les images, vidéo (loading.mp4), GLB (self_portrait.glb), PDF (CV), logo
- `style.css` + `loader-dev.css` → importés dans main.jsx

**Why:** Migration depuis HTML/CSS/JS vanilla vers React pour mieux structurer le code.
**How to apply:** Toujours vérifier que React.StrictMode est absent (GSAP incompatible). Assets dans public/assets/.
