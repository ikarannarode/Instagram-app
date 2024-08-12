import { useState } from 'react'
import './App.css'
import Signup from './components/ui/signup'
import Signin from './components/ui/signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Signup />
    </>
  )
}

export default App
