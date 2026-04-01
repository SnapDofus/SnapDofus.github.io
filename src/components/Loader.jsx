import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import './Loader.css'

export default function Loader() {
  const [percent, setPercent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)

  // ── Progression 0 → 92 rapidement, puis complète à 100 ──────────
  useEffect(() => {
    let p = 0
    let t1, t2, finishInterval

    const fast = setInterval(() => {
      p = Math.min(p + Math.round(Math.random() * 5 + 1), 92)
      setPercent(p)
      if (p >= 92) {
        clearInterval(fast)
        // Petite pause puis monte de 92 → 100
        t1 = setTimeout(() => {
          finishInterval = setInterval(() => {
            p++
            setPercent(p)
            if (p >= 100) clearInterval(finishInterval)
          }, 40)
        }, 800)
      }
    }, 100)

    return () => {
      clearInterval(fast)
      clearInterval(finishInterval)
      clearTimeout(t1)
    }
  }, [])

  // ── Séquence de fin (percent atteint 100) ────────────────────────
  useEffect(() => {
    if (percent < 100) return

    let t1, t2, t3

    t1 = setTimeout(() => {
      setLoaded(true)

      t2 = setTimeout(() => {
        setClicked(true)

        // Laisse l'animation d'expansion se terminer avant de masquer
        t3 = setTimeout(() => {
          setHidden(true)
        }, 1200)
      }, 1000)
    }, 600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [percent])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  if (hidden) return null

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title"></a>
        <div className={`loaderGame${clicked ? ' loader-out' : ''}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => <div className="loaderGame-line" key={i} />)}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee speed={60}>
            <span>Développeur Fullstack</span>
            <span>Designer UI/UX</span>
            <span>Développeur Mobile</span>
            <span>Développeur Fullstack</span>
            <span>Designer UI/UX</span>
          </Marquee>
        </div>

        <div
          className={`loading-wrap${clicked ? ' loading-clicked' : ''}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover" />
          <div className={`loading-button${loaded ? ' loading-complete' : ''}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(percent, 100)}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
            <div className="loading-content2">
              <span>Ohayo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
