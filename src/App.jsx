import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import BgCanvas from './components/BgCanvas'
import Loader from './components/Loader'
import Header from './components/Header'
import MobileNav from './components/MobileNav'
import WhatsAppPopup from './components/WhatsAppPopup'
import Hero from './components/Hero'
import BottomSection from './components/BottomSection'
import RobotSection from './components/RobotSection'
import FallSection from './components/FallSection'
import Fall from './components/Fall'
import Services from './components/Services'
import WorkProcess from './components/WorkProcess'
import Portfolio from './components/Portfolio'
import Roadmap from './components/Roadmap'
import Footer from './components/Footer'

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      <CustomCursor />
      <BgCanvas />
      <Loader />

      <Header
        onContactClick={() => setIsPopupOpen(true)}
        onMenuClick={() => setIsMobileNavOpen(prev => !prev)}
      />

      <WhatsAppPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <Hero />
      <BottomSection />
      <RobotSection />
      <FallSection />
      <Services />

      <section style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0f',
        fontFamily: "'Tanker', sans-serif"
      }}>
        <Fall color="#00ff88">
          <h3 style={{
            textAlign: 'center',
            fontSize: '4vw',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            width: '60vw',
            margin: '0 auto'
          }}>
            Des applications performantes, des interfaces inspirantes et des expériences digitales qui marquent les esprits.
          </h3>
        </Fall>
      </section>

      <WorkProcess />
      <Portfolio />
      <Roadmap />
      <Footer />
    </>
  )
}
