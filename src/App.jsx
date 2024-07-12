import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [copyButton, setCopyButton] = useState(
    "bg-blue-600 text-white rounded-r-lg h-10 px-4 hover:bg-blue-700"
  );
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcbvnm";
    if (numberAllowed === true) str += "1234567890";
    if (characterAllowed === true) str += "!@#$%^&*()-_=+{}[];',./:\"<>?`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopyButton(
      "bg-blue-600 text-white rounded-r-lg h-10 px-4 hover:bg-blue-700"
    );
    setCopyStatus("Copy");
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopyButton(
      "flex items-center justify-center bg-green-600 text-white rounded-r-lg h-10 px-4"
    );
    setCopyStatus(
      <>
        <FontAwesomeIcon icon={faCircleCheck} />
        &nbsp;Copied!
      </>
    );
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen">
        <h1 className="text-4xl sm:text-7xl mt-12 text-white font-serif">Password Generator</h1>
        <div className="flex justify-center mt-28 lg:mt-5 h-full w-full">
          <div className="container h-4/6 w-5/6 lg:h-1/4 lg:w-1/3 2xl:h-1/6 bg-slate-800 rounded-3xl shadow-2xl p-5">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  className="rounded-l-lg h-10 w-full px-3"
                  placeholder="Password"
                  value={password}
                  readOnly
                  ref={passwordRef}
                ></input>
                <button
                  onClick={copyPassword}
                  className={copyButton}
                  disabled={copyStatus !== "Copy"}
                >
                  {copyStatus}
                </button>
              </div>
              <div className="mt-24 lg:flex lg:mt-7 text-yellow-500 lg:space-x-3">
                <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start">
                  <input
                    type="range"
                    value={length}
                    min={6}
                    max={100}
                    className="cursor-pointer mr-1  w-full lg:w-3/5 mb-3 lg:mb-0"
                    onChange={(e) => {
                      setLength(e.target.value);
                    }}
                  ></input>
                  <label className="text-xl md:text-base">Length {length}</label>{" "}
                </div>
                <div className="flex items-center justify-center mt-4 lg:flex-row lg:justify-start lg:mt-0">
                  <input
                    className="mr-1"
                    defaultChecked={numberAllowed}
                    type="checkbox"
                    name="Numbers"
                    onChange={() => {
                      setNumberAllowed((prev) => !prev);
                    }}
                  ></input>
                  <label className="text-xl md:text-base">Numbers </label>
                </div>
                <div className="flex items-center justify-center mt-4 lg:flex-row lg:justify-start lg:mt-0">
                  <input
                    className="mr-1"
                    defaultChecked={characterAllowed}
                    type="checkbox"
                    name="Characters"
                    onChange={() => {
                      setCharacterAllowed((prev) => !prev);
                    }}
                  ></input>
                  <label className="text-xl md:text-base">Characters </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
