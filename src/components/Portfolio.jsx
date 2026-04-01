import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

const PROJECTS = [
  { href: 'https://samsusocial-sc1rm.kinsta.page', label: 'Samu Social Gabonais' },
  { href: 'https://gsap-chez-dylan.vercel.app/', label: 'Chez Dylan' },
  { href: 'https://propolisholding-os62h.kinsta.page', label: 'Propolis Holding' },
  { href: 'https://appho.st/d/dgQwZq8N', label: 'Fast Delivery' },
]

// Chaque image a son propre lien : on distribue les 4 projets en tournant
const withLink = (src, i) => ({ src, ...PROJECTS[i % PROJECTS.length] })

const COLUMNS = [
  [withLink('/assets/portfolio2.jpg', 0), withLink('/assets/portfolio3.jpg', 1), withLink('/assets/portfolio4.jpg', 2), withLink('/assets/portfolio5.jpg', 3)],
  [withLink('/assets/portfolio6.jpg', 0), withLink('/assets/portfolio7.png', 1), withLink('/assets/portfolio8.png', 2), withLink('/assets/portfolio9.jpg', 3)],
  [withLink('/assets/portfolio10.jpg', 0), withLink('/assets/portfolio11.png', 1), withLink('/assets/portfolio12.png', 2), withLink('/assets/portfolio13.png', 3)],
  [withLink('/assets/portfolio4.jpg', 0), withLink('/assets/portfolio5.jpg', 1), withLink('/assets/portfolio6.jpg', 2), withLink('/assets/portfolio7.png', 3)],
]

// Position initiale Y et X par colonne (identique au projet de référence)
const COL_INIT = [
  { y: 1000, x: 0 },
  { y: 500, x: -225 },
  { y: 500, x: 225 },
  { y: 1000, x: 0 },
]
const COL_Y_END = [-500, -250, -250, -500]

export default function Portfolio() {
  const wrapRef = useRef(null)
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)
  const heroHeaderRef = useRef(null)
  const heroCopyRef = useRef(null)
  const aboutRef = useRef(null)
  const colRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Positions initiales des colonnes via GSAP (évite le conflit avec transform JSX)
      colRefs.current.forEach((col, i) => {
        gsap.set(col, { y: COL_INIT[i].y, x: COL_INIT[i].x })
      })

      // SplitText sur le sous-titre
      const split = new SplitText(heroCopyRef.current.querySelector('h3'), { type: 'words' })
      const words = split.words
      gsap.set(words, { opacity: 0 })

      let copyHidden = false

      // ── Hero pinné ────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: () => `${window.innerHeight * 3.5}px`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress

          // Titre monte (0 → 29%)
          gsap.set(heroHeaderRef.current, {
            yPercent: -Math.min(p / 0.29, 1) * 100
          })

          // Mots s'allument (29 → 50%)
          const wordsP = Math.max(0, Math.min((p - 0.29) / 0.21, 1))
          words.forEach((word, i) => {
            const op = Math.max(0, Math.min(
              (wordsP - i / words.length) / (1 / words.length), 1
            ))
            gsap.set(word, { opacity: op })
          })

          // Masquage copy à 64%
          if (p > 0.64 && !copyHidden) {
            copyHidden = true
            gsap.to(heroCopyRef.current, { opacity: 0, duration: 0.2 })
          } else if (p <= 0.64 && copyHidden) {
            copyHidden = false
            gsap.to(heroCopyRef.current, { opacity: 1, duration: 0.2 })
          }

          // Image rétrécit (71 → 100%)
          const imgP = Math.max(0, Math.min((p - 0.71) / 0.29, 1))
          gsap.set(heroImgRef.current, {
            width: gsap.utils.interpolate(window.innerWidth, 150, imgP),
            height: gsap.utils.interpolate(window.innerHeight, 150, imgP),
            borderRadius: gsap.utils.interpolate(0, 10, Math.min(p / 0.29, 1)),
          })
        },
      })

      // ── Parallax colonnes ─────────────────────────────────────────
      colRefs.current.forEach((col, i) => {
        gsap.to(col, {
          y: COL_Y_END[i],
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} id="products" style={{ background: '#e3e3db' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden' }}
      >
        {/* Image plein écran */}
        <div
          ref={heroImgRef}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%', height: '100%',
            overflow: 'hidden',
          }}
        >
          <img src="/assets/portfolio.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Titre (monte au scroll) */}
        <div
          ref={heroHeaderRef}
          style={{
            position: 'absolute', inset: 0,
            padding: '4rem', color: '#fff',
            display: 'flex', alignItems: 'flex-end',
            overflow: 'hidden',
          }}
        >
          <h1 style={{ width: '75%', fontWeight: 400, fontSize: 'clamp(2rem,5vw,5rem)', lineHeight: 1, letterSpacing: '-0.05rem' }}>
            Des projets qui allient créativité, performance et expériences digitales mémorables.
          </h1>
        </div>

        {/* Sous-titre (mots qui s'allument) */}
        <div
          ref={heroCopyRef}
          style={{
            position: 'absolute', inset: 0,
            padding: '4rem', color: '#fff',
            display: 'flex', alignItems: 'flex-end',
          }}
        >
          <h3 style={{ width: '50%', fontWeight: 400, fontSize: 'clamp(1.5rem,3vw,3rem)', lineHeight: 1, letterSpacing: '-0.05rem' }}>
            Mes Réalisations Récentes.
          </h3>
        </div>
      </section>

      {/* ── Section colonnes d'images ─────────────────────────────── */}
      <section
        ref={aboutRef}
        style={{
          position: 'relative', width: '100%', height: '100svh',
          marginTop: '275svh',
          overflow: 'hidden',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '4rem',
        }}>
          {COLUMNS.map((imgs, ci) => (
            <div
              key={ci}
              ref={el => colRefs.current[ci] = el}
              style={{
                height: '125%',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
                willChange: 'transform',
              }}
            >
              {imgs.map((item, ii) => (
                <a
                  key={ii}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                  style={{
                    display: 'block',
                    width: 125, height: 125,
                    borderRadius: 10, overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.06)'
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <img src={item.src} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                </a>
              ))}
            </div>
          ))}

          {/* Texte centré */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%', textAlign: 'center',
            pointerEvents: 'none',
          }}>
            <h3 style={{ fontWeight: 400, fontSize: 'clamp(1.5rem,3vw,3rem)', lineHeight: 1, letterSpacing: '-0.05rem', color: '#1a1a1a' }}>
              Chaque projet, une nouvelle aventure créative.
            </h3>
          </div>
        </div>
      </section>

    </div>
  )
}
