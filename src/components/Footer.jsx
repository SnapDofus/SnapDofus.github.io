import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Flip, ScrollTrigger } from 'gsap/all'
import Lenis from 'lenis'
import './FooterDesk.css'

gsap.registerPlugin(Flip, ScrollTrigger)

export default function Footer() {
  const deskRef = useRef(null)

  useEffect(() => {
    const desk = deskRef.current
    if (!desk) return

    // ─── LENIS (smooth scroll) ──────────────────────────────────
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const lenisRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    const header = desk.querySelector('.fd-header')
    const items = gsap.utils.toArray(desk.querySelectorAll('.fd-item'))
    const flipTargets = [header, ...items]
    const switches = desk.querySelectorAll('.fd-modes button')

    let activeMode = 'chaos'

    const itemSizes = {
      music: 200,
      cd: 300,
      dialog: 305,
      folder: 200,
      macmini: 175,
      paper: 250,
      password: 160,
      portrait: 230,
      appicon: 150,
      lighter: 200,
      cursor: 255,
    }

    const arrangement = {
      chaos: {
        header: { x: 50, y: 47.5, center: true },
        items: [
          { id: 'music', x: -3, y: 4, rotation: -8 },
          { id: 'appicon', x: 27, y: 22, rotation: 5 },
          { id: 'cd', x: 70, y: 2, rotation: 8 },
          { id: 'cursor', x: 63, y: 63, rotation: 0 },
          { id: 'dialog', x: 70, y: 50, rotation: 8 },
          { id: 'folder', x: 74, y: 53, rotation: 5 },
          { id: 'lighter', x: 3, y: 48, rotation: -5 },
          { id: 'macmini', x: 14, y: 62, rotation: 0 },
          { id: 'paper', x: 7, y: 22, rotation: -8 },
          { id: 'password', x: 3, y: 72, rotation: -15 },
          { id: 'portrait', x: 57, y: 8, rotation: -3 },
        ],
      },
      cleanup: {
        header: { x: 70, y: 37.5, center: false },
        items: [
          { id: 'lighter', x: 5, y: 8, rotation: 0 },
          { id: 'paper', x: 15, y: 2, rotation: 0 },
          { id: 'portrait', x: 31, y: 1, rotation: 0 },
          { id: 'appicon', x: 58, y: 3, rotation: 0 },
          { id: 'music', x: 69, y: 2, rotation: 0 },
          { id: 'cursor', x: 54, y: 22, rotation: 0 },
          { id: 'folder', x: 27, y: 33, rotation: 0 },
          { id: 'cd', x: 1, y: 47, rotation: 0 },
          { id: 'dialog', x: 33, y: 55, rotation: 0 },
          { id: 'password', x: 57, y: 55, rotation: 0 },
          { id: 'macmini', x: 74, y: 57, rotation: 0 },
        ],
      },
      notebook: {
        header: { x: 50, y: 47.5, center: true },
        items: [
          { id: 'paper', x: 25, y: 8, rotation: -10 },
          { id: 'lighter', x: 33, y: 5, rotation: 5 },
          { id: 'music', x: 42, y: 8, rotation: 0 },
          { id: 'cd', x: 35, y: 22, rotation: 10 },
          { id: 'portrait', x: 46, y: 20, rotation: 5 },
          { id: 'cursor', x: 40, y: 28, rotation: 0 },
          { id: 'appicon', x: 45, y: 48, rotation: 10 },
          { id: 'password', x: 30, y: 44, rotation: -10 },
          { id: 'macmini', x: 39, y: 49, rotation: -5 },
          { id: 'dialog', x: 50, y: 30, rotation: 10 },
          { id: 'folder', x: 32, y: 33, rotation: 15 },
        ],
      },
    }

    function setLayout(mode) {
      const deskWidth = desk.offsetWidth
      const deskHeight = desk.offsetHeight
      const layout = arrangement[mode]

      const isMobile = window.innerWidth <= 1000
      const headerOffsetX = isMobile || layout.header.center ? header.offsetWidth / 2 : 0
      const headerOffsetY = isMobile || layout.header.center ? header.offsetHeight / 2 : 0
      const headerX = isMobile ? 50 : layout.header.x
      const headerY = isMobile ? 47.5 : layout.header.y

      gsap.set(header, {
        x: (headerX / 100) * deskWidth - headerOffsetX,
        y: (headerY / 100) * deskHeight - headerOffsetY,
        rotation: 0,
      })

      layout.items.forEach(({ id, x, y, rotation }) => {
        gsap.set(desk.querySelector(`#fd-${id}`), {
          x: (x / 100) * deskWidth,
          y: (y / 100) * deskHeight,
          width: itemSizes[id],
          height: itemSizes[id],
          rotation,
        })
      })
    }

    function switchMode(mode) {
      if (mode === activeMode) return

      const state = Flip.getState(flipTargets)
      setLayout(mode)
      Flip.from(state, {
        duration: 1.25,
        ease: 'power3.inOut',
        stagger: { amount: 0.1, from: 'center' },
        absolute: true,
      })
      activeMode = mode
    }

    setLayout('chaos')

    switches.forEach((btn) => {
      btn.addEventListener('click', () => {
        switches.forEach((b) => b.classList.remove('fd-active'))
        btn.classList.add('fd-active')
        switchMode(btn.dataset.mode)
      })
    })

    const onResize = () => setLayout(activeMode)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(lenisRaf)
      lenis.destroy()
    }
  }, [])

  return (
    <footer id="contact" className="fd-footer">
      <section className="fd-desk" ref={deskRef}>
        <div className="fd-header">
          <h1>Frédéric KOKOU</h1>
          <p>Développeur Fullstack spécialisé en Flutter, Laravel, React, three.js et UI/UX design (gsap).</p>
        </div>

        <div className="fd-item" id="fd-music"><img src="/footer/music.jpg" alt="" /></div>
        <div className="fd-item" id="fd-cd"><img src="/footer/cd.png" alt="" /></div>
        <div className="fd-item" id="fd-dialog"><img src="/footer/dialog.png" alt="" /></div>
        <div className="fd-item" id="fd-folder"><img src="/footer/folder.png" alt="" /></div>
        <div className="fd-item" id="fd-macmini"><img src="/footer/minimac.png" alt="" /></div>
        <div className="fd-item" id="fd-paper"><img src="/footer/error.png" alt="" /></div>
        <div className="fd-item" id="fd-password"><img src="/footer/passport.png" alt="" /></div>
        <div className="fd-item" id="fd-portrait"><img src="/footer/doliprane.png" alt="" /></div>
        <div className="fd-item" id="fd-appicon"><img src="/footer/vscode.png" alt="" /></div>
        <div className="fd-item" id="fd-lighter"><img src="/footer/lighter.png" alt="" /></div>
        <div className="fd-item" id="fd-cursor"><img src="/footer/cursor.png" alt="" /></div>

        <div className="fd-modes">
          <button className="fd-active" data-mode="chaos">
            <ion-icon name="flash-outline"></ion-icon>
          </button>
          <button data-mode="cleanup">
            <ion-icon name="grid-outline"></ion-icon>
          </button>
          <button data-mode="notebook">
            <ion-icon name="book-outline"></ion-icon>
          </button>
        </div>
      </section>
    </footer>
  )
}
