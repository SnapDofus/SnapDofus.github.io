import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StatueModel from './StatueModel'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    title: 'Développement Web Fullstack',
    description: "Création d'applications web complètes avec Laravel, Node.js et les dernières technologies frontend et backend.",
    align: 'left'
  },
  {
    title: 'Développement Mobile Flutter',
    description: "Applications mobiles réactives et élégantes offrant une expérience utilisateur immersive sur tous les appareils.",
    align: 'right'
  },
  {
    title: 'Design UI/UX',
    description: "Conception d'interfaces utilisateur efficaces et conviviales avec Figma pour donner vie aux idées créatives.",
    align: 'left'
  },
  {
    title: 'Innovation Technologique',
    description: "Exploration constante des nouvelles technologies et tendances pour rester à la pointe du développement.",
    align: 'right'
  }
]

export default function Services() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress)
    })
    return () => st.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ position: 'relative', height: '500vh', background: '#fff8ed' }}
    >
      {/* Canvas 3D sticky */}
      <div style={{
        position: 'sticky',
        top: '0',
        height: '100vh',
        zIndex: 1,
        background: '#E8D1B5'
      }}>
        <Canvas
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="sunset" environmentIntensity={0.5} />
          <Suspense fallback={null}>
            <StatueModel scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Contenu scrollable en overlay (zIndex: 2) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        {/* Écran titre */}
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '3rem',
          paddingTop: '100px'
        }}>
          <p style={{
            color: '#7B3306',
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            Ce que je fais
          </p>
          <h2 style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            color: '#7B3306',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}>
            Mes<br />Compé-<br />tences
          </h2>
        </div>

        {/* Écrans compétences */}
        {skills.map((skill, i) => (
          <div key={i} style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: skill.align === 'right' ? 'flex-end' : 'flex-start',
            padding: '3rem'
          }}>
            <div style={{ maxWidth: '340px' }}>
              <span style={{
                display: 'inline-block',
                color: '#7B3306',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                opacity: 0.6
              }}>
                0{i + 1}
              </span>
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 300,
                color: '#7B3306',
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                {skill.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(123, 51, 6, 0.65)',
                lineHeight: 1.7
              }}>
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
