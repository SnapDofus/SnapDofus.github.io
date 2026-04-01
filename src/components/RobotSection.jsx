import CharacterModel from './CharacterModel'

export default function RobotSection() {
  return (
    <div className="robot-section">
      <div className="robot-container">
        <div className="robot-content">
          <div className="robot-header">
            <h3>Innovation &amp; Technologie</h3>
            <h2>Explorez l'Avenir</h2>
            <p>Découvrez mes créations en interagissant avec ce robot 3D</p>
          </div>
        </div>

        <div className="robot-viewer">
          <div className="robot-frame">
            <div className="robot-frame-rim" />
            <CharacterModel />
          </div>
        </div>
      </div>
    </div>
  )
}
