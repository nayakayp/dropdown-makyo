import { options } from "./data/options";

import { Dropdown } from "./components/Dropdown";
import { useState } from "react";

function App() {
  const [withSearch, setWithSearch] = useState(false);
  const [multiple, setMultiple] = useState(true);
  const [portal, setPortal] = useState(false);
  const [outlined, setOutlined] = useState(true);

  return (
    <div className="p-4">
      <button
        onClick={() => {
          window.open("https://nayakayoga.com", "_blank");
          setPortal(!portal);
        }}
        className="fixed z-[1001] -right-[52px] py-2 px-4 top-1/3 -rotate-90 bg-blue-400 text-white cursor-pointer rounded-tr-xl rounded-tl-xl"
      >
        By: @nayakayp
      </button>
      <h1 className="text-xl font-bold mb-4">Dropdown Demo for Makyo Co</h1>
      <div className="flex gap-4">
        <h2 className="font-bold">Settings:</h2>
        <div className="flex flex-col gap-0.5">
          <div className="">
            <label className="mr-2">With Search:</label>
            <input
              type="checkbox"
              checked={withSearch}
              onChange={() => setWithSearch(!withSearch)}
            />
          </div>

          <div className="">
            <label className="mr-2">Multiple:</label>
            <input
              type="checkbox"
              checked={multiple}
              onChange={() => setMultiple(!multiple)}
            />
          </div>

          <div className="">
            <label className="mr-2">Use Portal:</label>
            <input
              type="checkbox"
              checked={portal}
              onChange={() => setPortal(!portal)}
            />
          </div>

          <div className="">
            <label className="mr-2">Outlined?:</label>
            <input
              type="checkbox"
              checked={outlined}
              onChange={() => setOutlined(!outlined)}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 mt-4">
          <h3 className="text-base font-medium mb-2 text-teal-500">
            Regular Dropdown
          </h3>

          <Dropdown
            outlined={outlined}
            options={options}
            placeholder="Select an option"
            onChange={(option) => console.log("Selected:", option)}
            withSearch={withSearch}
            multiple={multiple}
            portal={portal}
          />
        </div>

        <div className="flex-1 mt-4">
          <h3 className="text-base font-medium mb-2 text-teal-500">
            Custom Option Rendering
          </h3>
          <Dropdown
            outlined={outlined}
            portal={portal}
            options={options}
            placeholder="Select items..."
            withSearch={withSearch}
            multiple={multiple}
            onChange={(selected) => console.log(selected)}
            renderOption={(option) => (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span>{option.label}</span>
                <span className="text-gray-400 text-sm">({option.value})</span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
