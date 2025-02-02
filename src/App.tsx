import { Dropdown } from "./components/Dropdown";

function App() {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Another Option" },
    { value: "5", label: "Something Else" },
    { value: "6", label: "Last Option" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Searchable Dropdown Example</h1>
      <Dropdown
        options={options}
        placeholder="Select an option"
        onChange={(option) => console.log("Selected:", option)}
      />
    </div>
  );
}

export default App;
