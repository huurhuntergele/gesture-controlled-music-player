import { useState } from 'react'
import './App.css'
import VideoCanvas from './VideoCanvas.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VideoCanvas />
    </>
  )
}

export default App
