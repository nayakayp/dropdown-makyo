import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Dropdown options={options} isMulti />
    </div>
  );
}

export default App;
