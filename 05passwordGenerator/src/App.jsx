import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(false)
  const [Password,setPassword] = useState('')

//REF HOOK
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
      str += "!@#$%^&*()_+"
    }

    for(let i=1;i<=length;i++) {
      let idx = Math.floor(Math.random() * str.length + 1)
      let char = str.charAt(idx)
      pass+= char
    }

    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword]) 

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, Password.length)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=> { passwordGenerator()}, [length,numberAllowed,characterAllowed])

  return (
    <>
      <div className='w-150  mx-auto shadow-md rounded-2xl px-10 my-8 bg-gray-800'>
        <h1 className='text-white  text-4xl text-center p-4'>Password Generator</h1>
        <div className=' mt-2 flex shadow rounded-lg overflow-hidden mb-4'>
          <input ref={passwordRef}  type='text' readOnly defaultValue={Password} className='border-2 my-10 rounded-2xl outline-none w-full py-1 px-3' placeholder='Password'/>
          <button onClick={copyPasswordToClipboard} className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl h-10 mt-9 ml-4 '>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex mb-8 items-center gap-x-1'>
            <input type='range' min={6} max={100} defaultValue={length} className='cursor-pointer' onChange={(e)=> {setLength(e.target.value)}}/> <label>Length: {length}</label>
          </div>
          <div className='flex mb-8 ml-4 items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={(e)=> {setNumberAllowed((prev)=> !prev)}}/> <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex mb-8 ml-4 items-center gap-x-1'>
            <input type='checkbox' defaultChecked={characterAllowed} id='characterInput' onChange={(e)=> {setCharacterAllowed((prev)=> !prev)}}/> <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
