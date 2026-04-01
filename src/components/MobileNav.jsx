export default function MobileNav({ isOpen, onClose }) {
  const scrollTo = (id) => {
    onClose()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`mobile-nav${isOpen ? ' active' : ''}`} id="mobileNav">
      <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services') }}>Compétences</a>
      <a href="#work" onClick={e => { e.preventDefault(); scrollTo('work') }}>Processus</a>
      <a href="#about" onClick={e => { e.preventDefault(); scrollTo('about') }}>À Propos</a>
      <a href="#products" onClick={e => { e.preventDefault(); scrollTo('products') }}>Projets</a>
      <a href="#products" onClick={e => { e.preventDefault(); scrollTo('products') }}>Portfolio</a>
      <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Me Contacter</a>
    </div>
  )
}
