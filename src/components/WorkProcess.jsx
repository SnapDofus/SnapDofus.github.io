import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './WorkProcess.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const servicesCopy = [
  "Définition claire des livrables à chaque étape du projet — maquettes, prototypes, fichiers sources — avec des délais respectés et une communication transparente pour une collaboration sans surprise.",
  "Conception d'identités visuelles percutantes et de supports événementiels mémorables qui reflètent l'essence de votre marque et captivent votre audience dès le premier regard.",
  "Captation vidéo et photographique professionnelle pour valoriser votre image, vos produits et vos moments clés avec un œil créatif et une qualité de production irréprochable.",
  "Animation et motion design pour donner vie à vos idées — transformer des contenus statiques en expériences visuelles dynamiques qui engagent et retiennent l'attention.",
  "Modélisation et rendu 3D de haute qualité pour visualiser vos projets, créer des visuels époustouflants et offrir une perspective immersive à votre audience.",
  "Conception graphique pour l'impression — affiches, brochures, packaging — avec une attention particulière aux détails, aux matières et à la cohérence de votre identité visuelle.",
  "Design d'interfaces intuitives et d'expériences utilisateur soignées, de la recherche utilisateur au prototype interactif, avec une approche centrée sur l'usage et l'accessibilité.",
  "Développement web fullstack moderne avec Laravel, Node.js et les dernières technologies frontend pour des applications performantes, scalables et maintenables sur le long terme.",
]

const serviceNames = [
  'DELIVERABLES',
  'BRAND & EVENT DESIGN',
  'VIDEO & FOTOGRAPHIE',
  'MOTION DESIGN',
  '3D GRAPHICS',
  'PRINT & DRUKWORK',
  'DIGITAL ANTWERP (UI/UX)',
  'WEB DEVELOPMENT',
]

const imgs = [
  '/assets/process/img0.jpg',
  '/assets/process/img1.png',
  '/assets/process/img2.jpg',
  '/assets/process/img3.jpg',
  '/assets/process/img4.jpg',
  '/assets/process/img5.jpg',
  '/assets/process/img6.jpg',
  '/assets/process/img7.jpg',
]

export default function WorkProcess() {
  const stickyRef      = useRef(null)
  const indicatorRef   = useRef(null)
  const serviceRefs    = useRef([])
  const serviceImgRef  = useRef(null)
  const currentCountRef= useRef(null)
  const serviceCopyRef = useRef(null)
  const progressRef    = useRef(null)

  useEffect(() => {
    const stickySection = stickyRef.current
    const stickyHeight  = window.innerHeight * 8
    const indicator     = indicatorRef.current
    const currentCount  = currentCountRef.current
    const serviceImg    = serviceImgRef.current
    const serviceCopy   = serviceCopyRef.current

    const serviceHeight = serviceRefs.current[0].offsetHeight
    const imgHeight     = 250

    serviceCopy.textContent = servicesCopy[0]
    let currentSplitText = new SplitText(serviceCopy, { type: 'lines' })

    // Mesure largeurs (identique à script.js)
    const measureContainer = document.createElement('div')
    measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      font-family: "Montserrat", sans-serif;
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
    `
    document.body.appendChild(measureContainer)

    const serviceWidths = serviceRefs.current.map((el) => {
      measureContainer.textContent = el.querySelector('p').textContent
      return measureContainer.offsetWidth + 8
    })
    document.body.removeChild(measureContainer)

    gsap.set(indicator, { width: serviceWidths[0], xPercent: -50, left: '50%' })

    const scrollPerService = window.innerHeight
    let currentIndex = 0

    const animatedTextChange = (index) => {
      return new Promise((resolve) => {
        gsap.to(currentSplitText.lines, {
          opacity: 0,
          y: -20,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            currentSplitText.revert()
            serviceCopy.textContent = servicesCopy[index]
            currentSplitText = new SplitText(serviceCopy, { type: 'lines' })
            gsap.set(currentSplitText.lines, { opacity: 0, y: 20 })
            gsap.to(currentSplitText.lines, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: 'power3.inOut',
              onComplete: resolve,
            })
          },
        })
      })
    }

    const st = ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: `${stickyHeight}px`,
      pin: true,
      onUpdate: async (self) => {
        const progress = self.progress
        gsap.set(progressRef.current, { scaleY: progress })

        const scrollPosition = Math.max(0, self.scroll() - self.start)
        const activeIndex    = Math.floor(scrollPosition / scrollPerService)

        if (activeIndex >= 0 && activeIndex < serviceNames.length && currentIndex !== activeIndex) {
          currentIndex = activeIndex
          serviceRefs.current.forEach((s) => s.classList.remove('active'))
          serviceRefs.current[currentIndex].classList.add('active')

          await Promise.all([
            gsap.to(indicator, {
              y: activeIndex * serviceHeight,
              width: serviceWidths[activeIndex],
              duration: 0.5,
              ease: 'power3.inOut',
            }),
            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.5,
              ease: 'power3.inOut',
            }),
            gsap.to(currentCount, {
              innerText: activeIndex + 1,
              snap: { innerText: 1 },
              duration: 0.3,
              ease: 'power3.out',
            }),
            animatedTextChange(activeIndex),
          ])
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div className="mon-processus" id="work">

      {/* ── Hero ── */}
      <section className="hero">
        <p>Scrollez en bas</p>
      </section>

      {/* ── Sticky ── */}
      <section ref={stickyRef} className="sticky">
        <div className="col">
          <div className="services">
            <div ref={indicatorRef} className="indicator" />
            {serviceNames.map((name, i) => (
              <div
                key={i}
                ref={el => serviceRefs.current[i] = el}
                className={`service${i === 0 ? ' active' : ''}`}
              >
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col">
          <div className="service-img-wrapper">
            <div ref={serviceImgRef} className="service-img">
              {imgs.map((src, i) => (
                <div key={i} className="img">
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="service-copy">
            <p ref={serviceCopyRef} />
          </div>
        </div>

        <div className="progress-bar">
          <div ref={progressRef} className="progress" />
        </div>

        <div className="index">
          <span ref={currentCountRef} id="current-count">1</span>
          <span className="separator" />
          <span className="total-count">{serviceNames.length}</span>
        </div>
      </section>

    </div>
  )
}
