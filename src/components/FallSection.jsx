import Fall from './Fall'

const tankerStyle = `
  @font-face {
    font-family: 'Tanker';
    src: url('/assets/Tanker-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`

export default function FallSection() {
  return (
    <>
      <style>{tankerStyle}</style>

      <div style={{ width: '100%', fontFamily: "'Tanker', sans-serif" }}>

        {/* Section 1 — image de fond + grand titre */}
        <section style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img
            src="/assets/img1.png"
            alt="background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Fall color="#0a0a0f">
              <h2 style={{
                fontSize: '9vw',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1,
                letterSpacing: '-0.02em'
              }}>
                Code. Design. <br /> Deliver.
              </h2>
            </Fall>
          </div>
        </section>

        {/* Section 2 — texte centré sur fond sombre */}
        <section style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0a0a0f'
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

      </div>
    </>
  )
}
