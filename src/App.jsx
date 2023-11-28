import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/canvas'
import Controls from './components/controls'

function App() {
  const [wallRotation, setWallRotation] = useState(0);

  return (
    <div className='root'>
      <Controls setWallRotation={setWallRotation}></Controls>
      <Canvas wallRotation={wallRotation}></Canvas>
    </div>
  )
}

export default App
