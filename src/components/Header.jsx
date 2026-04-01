import { useEffect, useRef } from 'react'

export default function Header({ onContactClick, onMenuClick }) {
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const onScroll = () => {
      if (window.scrollY > 100) {
        header.style.transform = 'translateY(-100%)'
        header.style.background = 'rgba(15, 15, 25, 0.95)'
        header.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
      } else {
        header.style.transform = 'translateY(0)'
        header.style.background = 'rgba(15, 15, 25, 0.7)'
        header.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header ref={headerRef}>
      <div className="logo">Frédéric K. ESSONE</div>
      <nav>
        <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services') }}>Compétences</a>
        <a href="#work" onClick={e => { e.preventDefault(); scrollTo('work') }}>Processus</a>
        <a href="#about" onClick={e => { e.preventDefault(); scrollTo('about') }}>À Propos</a>
        <a href="#products" onClick={e => { e.preventDefault(); scrollTo('products') }}>Projets</a>
        <button className="contact-btn" onClick={onContactClick}>Contacter moi</button>
      </nav>
      <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  )
}
