import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Roadmap.css'

gsap.registerPlugin(ScrollTrigger)

export default function Roadmap() {
  const containerRef   = useRef(null)
  const pinnedRef      = useRef(null)
  const headerInfoRef  = useRef(null)
  const whitespaceRef  = useRef(null)
  const revealerRef    = useRef(null)
  const rev1Ref        = useRef(null)
  const rev2Ref        = useRef(null)
  const videoRef       = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Pin .pinned jusqu'à la fin de .whitespace
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        endTrigger: whitespaceRef.current,
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })

      // Pin .header-info jusqu'à la fin de .whitespace
      ScrollTrigger.create({
        trigger: headerInfoRef.current,
        start: 'top top',
        endTrigger: whitespaceRef.current,
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })

      // Rotation du revealer + expansion clip-path pendant le scroll de .pinned → .header-info
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        endTrigger: headerInfoRef.current,
        end: 'bottom bottom',
        onUpdate: (self) => {
          const rotation = self.progress * 360
          gsap.to(revealerRef.current, { rotation })

          const p = self.progress
          const clipPath = `polygon(
            ${45 - 45 * p}% ${0}%,
            ${55 + 45 * p}% ${0}%,
            ${55 + 45 * p}% ${100}%,
            ${45 - 45 * p}% ${100}%)`
          gsap.to([rev1Ref.current, rev2Ref.current], {
            clipPath,
            ease: 'none',
            duration: 0,
          })
        },
      })

      // Déplacement horizontal du revealer pendant .header-info
      ScrollTrigger.create({
        trigger: headerInfoRef.current,
        start: 'top top',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          const left = 35 + 15 * self.progress
          gsap.to(revealerRef.current, { left: `${left}%`, ease: 'none', duration: 0 })
        },
      })

      // Scale-up + apparition vidéo pendant .whitespace
      ScrollTrigger.create({
        trigger: whitespaceRef.current,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const scale = 1 + 12 * self.progress
          gsap.to(revealerRef.current, { scale, ease: 'none', duration: 0 })

          const triggerProgress = (window.innerWidth * 0.50) / 120 / 13
          gsap.to(videoRef.current, {
            opacity: self.progress >= triggerProgress ? 1 : 0,
            duration: 0.1,
            ease: 'power2.inOut',
          })
        },
      })

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="roadmap-section">
      <div className="roadmap-container">

        <section className="rdm-hero">
          <h1>Sympfonie</h1>
        </section>

        <section className="rdm-info">
          <div className="rdm-header-rows">
            <div className="rdm-header-row">
              <h1>Motion</h1>
            </div>
            <div className="rdm-header-row">
              <h1>Design</h1>
            </div>
          </div>
        </section>

        <section ref={headerInfoRef} className="rdm-header-info">
          <p>Chaque projet est une opportunité de créer quelque chose d'unique. Je combine créativité, technique et vision pour transformer vos idées en expériences digitales qui marquent durablement.</p>
          <div className="rdm-header-images">
            <div className="rdm-img"><img src="/assets/roadmap/images.jpg" alt="" /></div>
            <div className="rdm-img"><img src="/assets/roadmap/images2.jpg" alt="" /></div>
            <div className="rdm-img"><img src="/assets/roadmap/images3.jpg" alt="" /></div>
            <div className="rdm-img"><img src="/assets/roadmap/images4.jpg" alt="" /></div>
          </div>
        </section>

        <section ref={pinnedRef} className="rdm-pinned">
          <div ref={revealerRef} className="rdm-revealer">
            <div ref={rev1Ref} className="rdm-revealer-1" />
            <div ref={rev2Ref} className="rdm-revealer-2" />
            <video ref={videoRef} autoPlay muted loop playsInline>
              <source src="/assets/roadmap/vdo.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section ref={whitespaceRef} className="rdm-whitespace" />

        <section className="rdm-website-content">
          <h1>Prêt à donner vie à votre vision ? Construisons ensemble quelque chose d'extraordinaire.</h1>
        </section>

      </div>
    </div>
  )
}
