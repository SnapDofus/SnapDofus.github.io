        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('active');
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('mobileNav').classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(245, 240, 232, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(10, 10, 10, 0.1)';
            } else {
                header.style.background = 'rgba(245, 240, 232, 0.98)';
                header.style.boxShadow = 'none';
            }
        });

        // Animate counter on scroll
        function animateCounter() {
            const counter = document.querySelector('.counter-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let count = 0;
                        const target = 1;
                        const increment = () => {
                            if (count < target) {
                                count++;
                                counter.textContent = count.toString().padStart(2, '0');
                                setTimeout(increment, 100);
                            }
                        };
                        increment();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', () => {
            animateCounter();
            
            // Add intersection observer for fade-in animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);
            
            // Observe all animated elements
            document.querySelectorAll('.service-card, .work-step, .portfolio-item').forEach(el => {
                observer.observe(el);
            });
        });

        // Add interactive hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Contact button functionality
        document.querySelector('.contact-btn').addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Fermer le menu mobile lors du clic sur un lien
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });

        // Animation au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec animation
        document.querySelectorAll('.service-card, .work-step, .portfolio-item').forEach(el => {
            observer.observe(el);
        });

       // === Popup WhatsApp ===
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.contact-btn');
    
    // Créer le popup dynamiquement
    const whatsappPopup = document.createElement('div');
    whatsappPopup.id = 'whatsapp-popup';
    whatsappPopup.classList.add('whatsapp-popup');
    whatsappPopup.innerHTML = `
        <div class="whatsapp-content">
            <span class="close-popup">&times;</span>
            <h3>Me contacter sur WhatsApp</h3>
            <p>Envoyez-moi un message pour discuter d'un projet web ou mobile, ou explorer comment je peux vous aider en développement et design.</p>
            <a href="https://wa.me/24174219524?text=Bonjour%20Fr%C3%A9d%C3%A9ric%2C%20je%20souhaite%20discuter%20d’un%20projet%20web%20ou%20mobile%20et%20explorer%20comment%20vous%20pouvez%20m’accompagner." target="_blank" class="whatsapp-link">Ouvrir WhatsApp</a>
        </div>
    `;
    document.body.appendChild(whatsappPopup);

    const closeBtn = whatsappPopup.querySelector('.close-popup');

    if(contactBtn && whatsappPopup && closeBtn) {
        // Ouvrir le popup
        contactBtn.addEventListener('click', () => {
            whatsappPopup.classList.add('active');
        });

        // Fermer le popup
        closeBtn.addEventListener('click', () => {
            whatsappPopup.classList.remove('active');
        });

        // Fermer si clic en dehors
        whatsappPopup.addEventListener('click', (e) => {
            if(e.target === whatsappPopup) {
                whatsappPopup.classList.remove('active');
            }
        });
    }
});


        // ========================================
        // GESTION DU LOADER VIDÉO
        // ========================================
        window.addEventListener('DOMContentLoaded', function() {
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
            const videoSource = 'loading.mp4';
            console.log(`📱 Appareil détecté: ${isMobile ? 'Mobile' : 'Desktop'} - Vidéo: ${videoSource}`);
            
            // Définir la source de la vidéo
            videoEl.src = videoSource;
            videoEl.load(); // Recharger la vidéo avec la nouvelle source

            // S'assurer que le loader est visible
            loaderEl.style.display = 'flex';
            loaderEl.style.opacity = '1';
            loaderEl.style.pointerEvents = 'all';
            console.log('✅ Loader affiché');

            // Fonction pour cacher le loader
            function hideLoader() {
                console.log('⏱️ Début de masquage du loader...');
                if (loaderEl) {
                    loaderEl.style.opacity = '0';
                    loaderEl.style.pointerEvents = 'none';
                    setTimeout(() => {
                        loaderEl.style.display = 'none';
                        if (videoEl) {
                            videoEl.pause();
                        }
                        console.log('✅ Loader masqué');
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
