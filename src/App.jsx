import {useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  console.log(password);

  const passwordRef = useRef(null);


  useEffect(()=> {
passwordGenerator();
  },[length, numberAllowed, charAllowed]);


const copyPassword = useCallback(()=> {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
},[password])

  const passwordGenerator = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "123456789";
    if(charAllowed) str += "$#@%&*){+-?><";

    for(let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    
  },[length, numberAllowed, charAllowed]);

  return (
    <div className="shadow-lg  mx-auto mt-5 bg-gray-500">
      <h1 className="text-center text-lg font-bold">Password Generator</h1>
      <div className="w-[40%] h-auto p-5 shadborder-2 mt-5 mx-auto">
        <label htmlFor="password"></label>
        <input type="text" id="password" value={password} ref={passwordRef} placeholder="Password" className="shadow-md py-2 px-5"/>
        <button className="ml-3 py-2 px-3 text-white rounded shadow-md bg-sky-400" onClick={copyPassword}>Copy</button>
      </div>
      <div className="flex justify-center items-center gap-5">
        <input type="range" onChange={(e)=> setLength(e.target.value)}/>
        <span>{length}</span>
        <input type="checkbox" onChange={()=> setNumberAllowed((prev)=> !prev)}/>Number
        <input type="checkbox" onClick={()=> setCharAllowed((prev)=> !prev)}/>Character
      </div>
    </div>
  )
}

export default App
