export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="star star-1">✦</div>
          <div className="star star-2">★</div>

          <h1>
            <span className="title-line with-badge"> Développeur </span>
            <span className="title-line test">Fullstack</span>
            <span className="title-line lara">
              Laravel/flutter <br />React & Three.js
              <a
                href="/assets/CV_Frederic_KOKOU ESSONE.pdf"
                target="_blank"
                download
                className="interactive-badge"
              >
                <div className="arrow-container">
                  <span className="arrow-icon"> CV </span>
                </div>
                <div className="profile-pic"></div>
              </a>
              <div className="wavy-line">
                <svg>
                  <path d="M0,20 Q30,10 60,20 T120,20" />
                </svg>
              </div>
            </span>
          </h1>

          <p className="hero-description">
            Ingénieur informatique réseau &amp; télécom,<br />
            Développeur Web &amp; Mobile passionné,<br />
            Spécialisé en Flutter, Laravel, React et UI/UX Design.
            Capable de concevoir des applications performantes, maintenables
            et optimisées pour le web et le mobile.
          </p>
        </div>

        <div className="hero-visual">
          <div className="main-visual">
            <div className="floating-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="profile-image">
              <img src="/assets/photo2.png" alt="Frédéric KOKOU ESSONE" />
            </div>
          </div>

          <div className="circular-badge">
            <div className="circular-text">
              <svg viewBox="0 0 140 140">
                <defs>
                  <path
                    id="circle"
                    d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                  />
                </defs>
                <text>
                  <textPath href="#circle">
                    100% DEVELOPPEUR WEB / FLUTTER &amp; DART •
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="center-arrow">→</span>
          </div>
        </div>
      </div>

      <div className="small-profile">💼</div>

      <div className="info-counter">
        <div className="counter-number">01</div>
        <div className="counter-label">Ingénieur<br />Informatique</div>
      </div>
    </div>
  )
}
