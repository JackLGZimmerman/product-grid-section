import { useState } from 'react'

import './App.css'
import Credits from './components/Credits'
import GridSection from './components/GridSection'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GridSection />
      <Credits />
    </>
  );
}

export default App
