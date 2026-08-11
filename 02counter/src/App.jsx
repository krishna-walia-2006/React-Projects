import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [counter,setCounter] = useState(15)
  // let counter = 15

  const addValue = () => {
    if(counter+4<=20) {
      setCounter((prevCounter)=> prevCounter+1)
      setCounter((prevCounter)=> prevCounter+1)
      setCounter((prevCounter)=> prevCounter+1)
      setCounter((prevCounter)=> prevCounter+1)
    }
    else {
      alert('Counter cannot be greater than 20')
    }
  }
  const removeValue = ()=> {
    if(counter-4>=0) {
    setCounter(counter-1)
    setCounter(counter-1)
    setCounter(counter-1)
    setCounter(counter-1)
  }
    else {
      alert('Counter cannot be negative')
    }
  }
  return (
    <>
      <h1>Hello, Vite!</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addValue}>Add value</button>
      <br></br>
      <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
