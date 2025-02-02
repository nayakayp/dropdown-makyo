import { options } from "./data/options";

import { Dropdown } from "./components/Dropdown";
import { useState } from "react";

function App() {
  const [withSearch, setWithSearch] = useState(false);
  const [multiple, setMultiple] = useState(true);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Searchable Dropdown Example</h1>
      <div className="flex gap-4">
        <h2 className="font-bold">Settings:</h2>
        <div className="">
          <div className="mb-4">
            <label className="mr-2">With Search:</label>
            <input
              type="checkbox"
              checked={withSearch}
              onChange={() => setWithSearch(!withSearch)}
            />
          </div>

          <div className="mb-4">
            <label className="mr-2">Multiple:</label>
            <input
              type="checkbox"
              checked={multiple}
              onChange={() => setMultiple(!multiple)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-medium mb-2 text-teal-500">
          Regular Dropdown
        </h3>

        <Dropdown
          options={options}
          placeholder="Select an option"
          onChange={(option) => console.log("Selected:", option)}
          withSearch={withSearch}
          multiple={multiple}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-medium mb-2 text-teal-500">
          Custom Option Rendering
        </h3>
        <Dropdown
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
  );
}

export default App;
