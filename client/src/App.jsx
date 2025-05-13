import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register />
    </>
  )
}

export default App
