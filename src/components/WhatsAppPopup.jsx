import { useEffect } from 'react'

export default function WhatsAppPopup({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      id="whatsapp-popup"
      className="whatsapp-popup active"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="whatsapp-content">
        <span className="close-popup" onClick={onClose}>&times;</span>
        <h3>Me contacter sur WhatsApp</h3>
        <p>
          Envoyez-moi un message pour discuter d'un projet web ou mobile, ou explorer comment je peux vous aider en développement et design.
        </p>
        <a
          href="https://wa.me/24174219524?text=Bonjour%20Fr%C3%A9d%C3%A9ric%2C%20je%20souhaite%20discuter%20d'un%20projet%20web%20ou%20mobile%20et%20explorer%20comment%20vous%20pouvez%20m'accompagner."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          💬 Ouvrir WhatsApp
        </a>
      </div>
    </div>
  )
}
