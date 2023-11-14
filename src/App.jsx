import { useState, useCallback, useEffect, useRef } from 'react'
import { IoReloadCircleOutline } from "react-icons/io5";
function App() {
  const [length, setlength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [copy, setCopy] = useState("copy")
  const [password, setPassword] = useState("");
  //ref hook
  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxuz"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+='{}[]/*-+!@#$%^&*'
    setCopy("copy")

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);

      pass+=str.charAt(char)
    }

    setPassword(pass)

  }, [numberAllowed, charAllowed, length, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    setCopy("copied!")
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generatePassword()
  },[length, numberAllowed, charAllowed, generatePassword])

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <p className='text-4xl text-white text-center'>Password Generator</p>
      <div className='flex flex-col gap-4 my-16 p-8 bg-zinc-900 rounded-xl shadow'>
      <div className='flex items-center gap-2'>
      <input 
      type="text"
      className={`${(charAllowed || numberAllowed) ? 'border-yellow-500':'border-red-600'} ${(charAllowed && numberAllowed)?'border-green-500' : ''} border-b-4  rounded-xl w-[700px] px-4 py-2 text-xl  bg-zinc-700 text-white font-medium`}
      readOnly
      ref={passwordRef}
      value={password} />

      <button 
      onClick={copyPasswordToClipboard}
      className='bg-blue-500 shrink-0 outline-none text-white rounded-xl h-full min-py-2 hover:bg-blue-700 px-4 text-2xl'>
     { copy}
      </button>

      <button 
      onClick={generatePassword}
      className='bg-blue-500 shrink-0 outline-none text-white rounded-xl h-full min-py-2 hover:bg-blue-700 px-4 text-2xl'>
      <IoReloadCircleOutline />
      </button>

      </div>
      <div className='flex text-sm gap-x-2 text-white'>
        <div className='flex gap-x-1'>
        <input 
        id='lengthInput'
        type="range"
        min={8}
        max={50}
        value={length}
        onChange={(e)=>setlength(e.target.value)}
        className='cursor-pointer' />
        <label htmlFor='lengthInput'>length: {length}</label>
        </div>
        
        <div className='flex gap-x-1'>
        <input 
        id='numberInput'
        type="checkbox"
        defaultChecked={numberAllowed}
        checked={numberAllowed}
        onChange={()=>setNumberAllowed((prev)=>!prev)}
        className='cursor-pointer' />
        <label htmlFor='lengthInput'>Numbers</label>
        </div>

        <div className='flex gap-x-1'>
        <input 
        id='charInput'
        type="checkbox"
        defaultChecked={charAllowed}
        checked={charAllowed}
        onChange={()=>setCharAllowed((prev)=>!prev)}
        className='cursor-pointer' />
        <label htmlFor='lengthInput'>Characters</label>
        </div>
        
      </div>

      </div>
    </div>
  )
}

export default App
