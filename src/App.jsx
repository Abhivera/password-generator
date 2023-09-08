import { useState, useCallback,useEffect,useRef } from "react";
function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const handleCopy = useCallback(()=>{
    passwordRef.current?.select() 
    window.navigator.clipboard.writeText(password)
  },[password])




  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "$%#@&";
    for(let i=1;i<=length;i++){
       let char = Math.floor(Math.random()*str.length +1)
       pass+= str.charAt(char)}
       setPassword(pass)
 }, [length, numberAllowed, charAllowed,setPassword]);





useEffect(()=>{passwordGenerator()},[length, numberAllowed, charAllowed,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg py-2 px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden ">
          <input 
          type="text"
          value={password} 
          className='outline-none w-full py-1 px-3 mb4'
          placeholder="PassWord"
          ref={passwordRef}
          
          />
          <button className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0 hover:bg-blue-300' onClick={handleCopy}>CopyMe</button>
        </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
            <input type="range" min={1} max={10} value={length} className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
               </div> 
         <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}/>
            <label htmlFor="numberInput">Numbers</label>
               </div>
               <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}/>
            <label htmlFor="numberInput">Characters</label>
               </div>
            </div>
         </div>
    </>
  );
}

export default App;
