import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/canvas'
import Controls from './components/controls'

function App() {
  const [wallRotation, setWallRotation] = useState(0);
  const [beamRotation, setBeamRotation] = useState(0);
  const [beamRotationOut, setBeamRotationOut] = useState(0);

  return (
    <div className='root'>
      <Controls setWallRotation={setWallRotation} wallRotation={wallRotation} beamRotation={beamRotation} beamRotationOut={beamRotationOut}></Controls>
      <Canvas wallRotation={wallRotation} setBeamRotation={setBeamRotation} setBeamRotationOut={setBeamRotationOut}></Canvas>
    </div>
  )
}

export default App
