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
    window.navigator.clipboard.writeText(password);
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
        <h1 className="text-5xl mt-4 text-white">Password Generator</h1>
        <div className="flex justify-center mt-5 h-full w-full">
          <div className="container h-1/4 w-1/3 bg-slate-800 rounded-3xl shadow-2xl p-5">
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
              <div className="flex flex-wrap mt-7 text-yellow-500 space-x-3">
                <div>
                  <input
                    type="range"
                    value={length}
                    min={6}
                    max={100}
                    className="cursor-pointer mr-1"
                    onChange={(e) => {
                      setLength(e.target.value);
                    }}
                  ></input>
                  <label>Length {length}</label>{" "}
                </div>
                <div>
                  <input
                    className="mr-1"
                    defaultChecked={numberAllowed}
                    type="checkbox"
                    name="Numbers"
                    onChange={() => {
                      setNumberAllowed((prev) => !prev);
                    }}
                  ></input>
                  <label>Numbers </label>{" "}
                </div>
                <div>
                  <input
                    className="mr-1"
                    defaultChecked={characterAllowed}
                    type="checkbox"
                    name="Characters"
                    onChange={() => {
                      setCharacterAllowed((prev) => !prev);
                    }}
                  ></input>
                  <label>Characters </label>
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
