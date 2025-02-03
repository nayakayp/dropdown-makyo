import { Option } from "./types";

export const OptionsList = ({
  filteredOptions,
  selectedOptions,
  handleOptionClick,
  renderOption,
  searchTerm,
}: {
  filteredOptions: Option[];
  selectedOptions: Option[];
  handleOptionClick: (option: Option) => void;
  renderOption?: (option: Option) => React.ReactNode;
  searchTerm: string;
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="bg-teal-300">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <ul className="max-h-60 overflow-auto px-4 pb-4 border-gray-300 border bg-white">
      {filteredOptions.map((option) => (
        <li
          key={option.value}
          onClick={() => handleOptionClick(option)}
          className={`-mx-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            selectedOptions.some((selected) => selected.value === option.value)
              ? "bg-teal-100"
              : ""
          }`}
        >
          {renderOption
            ? renderOption(option)
            : highlightText(option.label, searchTerm)}
        </li>
      ))}
      {filteredOptions.length === 0 && (
        <li className="px-4 py-2 text-gray-500">No options found</li>
      )}
    </ul>
  );
};
