import { useState } from 'react'
import './App.css'
import Canvas from './components/canvas'
import Controls from './components/controls'

function App() {
  const [wallRotation, setWallRotation] = useState(0);
  const [beamRotation, setBeamRotation] = useState(0);
  const [beamRotationOut, setBeamRotationOut] = useState(0);

  return (
    <div className='root'>
      <p></p>
      <Controls setWallRotation={setWallRotation} wallRotation={wallRotation} beamRotation={beamRotation} beamRotationOut={beamRotationOut}></Controls>
      <Canvas wallRotation={wallRotation} setBeamRotation={setBeamRotation} setBeamRotationOut={setBeamRotationOut}></Canvas>
    </div>
  )
}

export default App
