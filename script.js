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

          // Menu mobile toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
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
            <a href="https://wa.me/24162911886?text=Bonjour%20Fr%C3%A9d%C3%A9ric%2C%20je%20souhaite%20discuter%20d’un%20projet%20web%20ou%20mobile%20et%20explorer%20comment%20vous%20pouvez%20m’accompagner." target="_blank" class="whatsapp-link">Ouvrir WhatsApp</a>
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


// Configuration
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particules
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.code = this.getRandomCode();
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            getRandomCode() {
                const codes = ['{}', '()', '[]', '<>', '==', '!=', '&&', '||', '=>', '++', '--', '//'];
                return codes[Math.floor(Math.random() * codes.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 168, 29, ${this.opacity})`;
                ctx.font = `${this.size * 8}px Courier New`;
                ctx.fillText(this.code, this.x, this.y);
            }
        }

        // Créer les particules
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        // Animation des particules
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Lignes de connexion
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(255, 168, 29, ${0.2 - distance / 750})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        // Hexagones flottants
        const hexContainer = document.getElementById('hexContainer');
        for (let i = 0; i < 10; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.style.left = Math.random() * 100 + '%';
            hex.style.animationDuration = (Math.random() * 10 + 10) + 's';
            hex.style.animationDelay = Math.random() * 5 + 's';
            hexContainer.appendChild(hex);
        }

        // Code Matrix
        const codeMatrix = document.getElementById('codeMatrix');
        const codeChars = 'const let var function return if else for while class import export async await';
        
        for (let i = 0; i < 20; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = Math.random() * 100 + '%';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.animationDelay = Math.random() * 2 + 's';
            
            const words = codeChars.split(' ');
            column.textContent = words[Math.floor(Math.random() * words.length)];
            
            codeMatrix.appendChild(column);
        }

        // Simulation de chargement
        const percentageEl = document.getElementById('percentage');
        let progress = 0;

        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            percentageEl.textContent = Math.floor(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    document.getElementById('loader').classList.add('hidden');
                }, 500);
            }
        }, 200);

        // Responsive
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
