import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [numbers, setNumbers] = useState(false)
  const [characters,setCharacters] = useState(false)
  const [length,setLength] = useState(8)
  const [password,setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbers) str+= "1234567890"
    if (characters) str+= "!@#$%^&*()"
    for (let i =0;i<length;i++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  } ,[numbers,characters,length])

  const passwordRef = useRef(null)

  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{passwordGenerator()},[length,numbers,characters,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-4xl mx-auto shadow-md rounded-lg px-16 my-8 pb-2 text-4xl text-orange-500 bg-gray-700 pt-2'>

        <h1 className='text-4xl text-white text-center width-full pb-4 my-4' >password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-6'>

          <input 
          className="pb-2 pl-2 text-2xl outline-none w-full"
          type="text" 
          value={password} 
          readOnly 
          placeholder='password'
          ref={passwordRef} />

          <button className='bg-blue-800 text-3xl pr-3 pl-3 text-white'
          onClick={copytoclipboard}>copy</button>

        </div>

        <div className='flex gap-x-2 items-center'>

          <input 
          type="range" 
          min={6} 
          max={50} 
          value={length} 
          className='cursor-pointer' 
          onChange={(e)=>{setLength(e.target.value)}} />

          <label className='text-3xl pr-4'>length : {length}</label>

          <input 
          className='pl-6'
          type="checkbox" 
          defaultChecked={numbers} 
          id="number input"
          onChange={()=>{setNumbers((prev)=>!prev)}} />

          <label className='text-3xl pr-4'>Numbers</label>

          <input type="checkbox"
          defaultChecked = {characters}
          id = "character input"
          onChange={()=>{setCharacters((prev=>!prev))}} />

          <label className='text-3xl'>Characters</label>


        </div>

      </div>
      
    </>
  )
}

export default App
