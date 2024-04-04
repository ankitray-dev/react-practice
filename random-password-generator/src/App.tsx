import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState<number>(8);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const passwordRef = useRef<HTMLInputElement>(null)

  const passwordGenerator = useCallback(() => {
    let pass: string = '';
    let str: string = 'ABCDEFGIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '`~!@#$%^&*_-+=[]{}"';

    for (let i = 1; i <= length; i++) {
      const char: number = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-24 text-blue-600 bg-gray-800">
        <h1 className="text-4xl text-center text-white font-semibold my-8">Random Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef} 
          />
          <button 
          onClick={copyPasswordToClipboard} 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={24}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label htmlFor="Length" className="font-semibold">
              Length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="font-semibold">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="font-semibold">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;