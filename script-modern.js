// ========================================
// CURSEUR PERSONNALISÉ 3D (Désactivé sur mobile/tactile)
// ========================================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursor && cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animation fluide du curseur
        function animateCursor() {
            // Le point suit immédiatement
            cursorX += (mouseX - cursorX) * 0.8;
            cursorY += (mouseY - cursorY) * 0.8;
            
            // Le contour suit avec un léger délai
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Effet sur les éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
} else {
    // Cacher le curseur sur mobile
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.display = 'none';
    }
}

// ========================================
// ARRIÈRE-PLAN 3D AVEC THREE.JS
// ========================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Créer les particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x00ff88,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Géométrie ondulante (tore)
const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ccff,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Animation avec interaction souris
let mouseXNorm = 0, mouseYNorm = 0;

document.addEventListener('mousemove', (e) => {
    mouseXNorm = (e.clientX / window.innerWidth) * 2 - 1;
    mouseYNorm = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateThree() {
    requestAnimationFrame(animateThree);
    
    // Rotation des particules
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0008;
    
    // Rotation du tore avec interaction souris
    torus.rotation.x += 0.005 + mouseYNorm * 0.002;
    torus.rotation.y += 0.003 + mouseXNorm * 0.002;
    torus.rotation.z += 0.001;
    
    // Déplacement selon la souris
    camera.position.x = mouseXNorm * 0.3;
    camera.position.y = mouseYNorm * 0.3;
    
    renderer.render(scene, camera);
}

animateThree();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================================
// ANIMATIONS GSAP AVEC SCROLL TRIGGER
// ========================================
gsap.registerPlugin(ScrollTrigger);

// ========================================
// LOADER DÉVELOPPEUR SIMPLIFIÉ
// ========================================

// Démarrer immédiatement
// ========================================
// GESTION DU LOADER VIDÉO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Page chargée, initialisation du loader vidéo...');
    
    const loaderEl = document.getElementById('loader');
    const videoEl = document.getElementById('loadingVideo');

    console.log('Loader element:', loaderEl);
    console.log('Video element:', videoEl);

    if (!loaderEl) {
        console.error('❌ Loader element non trouvé!');
        return;
    }

    if (!videoEl) {
        console.error('❌ Video element non trouvé!');
        return;
    }

    // Détecter si on est sur mobile ou desktop et charger la bonne vidéo
    const isMobile = window.innerWidth <= 768;
    const videoSource = isMobile ? 'loading1.mp4' : 'loading.mp4';
    console.log(`📱 Appareil détecté: ${isMobile ? 'Mobile' : 'Desktop'} - Vidéo: ${videoSource}`);
    
    // Définir la source de la vidéo
    videoEl.src = videoSource;
    videoEl.load(); // Recharger la vidéo avec la nouvelle source

    // S'assurer que le loader est visible
    loaderEl.style.display = 'flex';
    loaderEl.style.opacity = '1';
    console.log('✅ Loader affiché');

    // Fonction pour cacher le loader
    function hideLoader() {
        console.log('⏱️ Début de masquage du loader...');
        if (loaderEl) {
            loaderEl.style.opacity = '0';
            setTimeout(() => {
                loaderEl.style.display = 'none';
                if (videoEl) {
                    videoEl.pause();
                }
                console.log('✅ Loader masqué');
                
                // Animations d'entrée
                if (typeof gsap !== 'undefined') {
                    gsap.from('h1', {
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        delay: 0.3,
                        ease: 'power3.out'
                    });
                    
                    gsap.from('.hero-content p', {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        delay: 0.5,
                        ease: 'power3.out'
                    });
                }
            }, 500);
        }
    }

    // Événements de la vidéo pour déboguer
    videoEl.addEventListener('loadeddata', () => {
        console.log('✅ Vidéo chargée et prête');
    });

    videoEl.addEventListener('playing', () => {
        console.log('▶️ Vidéo en cours de lecture');
    });

    videoEl.addEventListener('error', (e) => {
        console.error('❌ Erreur de chargement vidéo:', e);
    });

    // Lancer la vidéo
    console.log('🎬 Tentative de lecture de la vidéo...');
    const playPromise = videoEl.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('✅ Vidéo lancée avec succès!');
        }).catch(err => {
            console.error('❌ Erreur de lecture:', err.message);
            // Si la vidéo ne peut pas se lire, cacher quand même le loader
            setTimeout(hideLoader, 4000);
        });
    }

    // Cacher le loader après 4 secondes
    setTimeout(hideLoader, 4000);
});

// Animations au scroll pour toutes les sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Animation des cartes portfolio
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        rotation: 5,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Effet 3D sur les cartes au mouvement de la souris
portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        gsap.to(item, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Animation des compétences/services
const serviceCards = document.querySelectorAll('.service-card, .work-step');
serviceCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// ========================================
// MENU MOBILE
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ========================================
// POPUP WHATSAPP
// ========================================
// WhatsApp Popup - Version simplifiée et robuste
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.contact-btn');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const closePopup = document.querySelector('.close-popup');

    console.log('Contact button:', contactBtn);
    console.log('WhatsApp popup:', whatsappPopup);

    if (contactBtn && whatsappPopup) {
        // Gestion du clic sur le bouton contact
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Bouton contact cliqué!');
            whatsappPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, { passive: false });
        
        // Support tactile pour mobile
        contactBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Touch sur bouton contact!');
            whatsappPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, { passive: false });
        
        // Gestion du clic sur le bouton de fermeture
        if (closePopup) {
            closePopup.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Fermeture popup');
                whatsappPopup.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            closePopup.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Touch fermeture popup');
                whatsappPopup.classList.remove('active');
                document.body.style.overflow = '';
            }, { passive: false });
        }
        
        // Fermer en cliquant sur l'overlay
        whatsappPopup.addEventListener('click', function(e) {
            if (e.target === whatsappPopup) {
                console.log('Clic sur overlay');
                whatsappPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Éléments WhatsApp non trouvés!');
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: target,
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(15, 15, 25, 0.95)';
        header.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(15, 15, 25, 0.7)';
        header.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MASQUER LE LOGO SPLINE
// ========================================
function hideSplineLogo() {
    // Chercher tous les liens avec l'URL spline.design
    const splineLinks = document.querySelectorAll('a[href*="spline.design"]');
    splineLinks.forEach(link => {
        link.style.display = 'none';
    });
    
    // Alternative: chercher par ID
    const logoById = document.getElementById('logo');
    if (logoById && logoById.href && logoById.href.includes('spline.design')) {
        logoById.style.display = 'none';
    }
    
    // Observer pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Vérifier si c'est un lien spline
                    if (node.tagName === 'A' && node.href && node.href.includes('spline.design')) {
                        node.style.display = 'none';
                    }
                    // Vérifier les enfants
                    const splineLinksInNode = node.querySelectorAll('a[href*="spline.design"]');
                    splineLinksInNode.forEach(link => {
                        link.style.display = 'none';
                    });
                }
            });
        });
    });
    
    // Observer le body pour les changements
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Exécuter immédiatement
hideSplineLogo();

// Exécuter après un court délai (au cas où Spline charge après)
setTimeout(hideSplineLogo, 500);
setTimeout(hideSplineLogo, 1000);
setTimeout(hideSplineLogo, 2000);

console.log('🚀 Portfolio moderne avec animations 3D chargé !');
