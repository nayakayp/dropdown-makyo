import { ChevronDown } from "lucide-react";
import { SelectedOptionTag } from "./SelectedOptionTag";
import { Option } from "./types";

export const DropdownButton = ({
  selectedOptions,
  placeholder,
  isOpen,
  handleOptionClick,
  handleButtonClick,
  outlined = true,
}: {
  selectedOptions: Option[];
  placeholder: string;
  isOpen: boolean;
  handleOptionClick: (option: Option) => void;
  handleButtonClick: () => void;
  outlined?: boolean;
}) => (
  <button
    type="button"
    onClick={handleButtonClick}
    className={`w-full px-4 py-2 text-left rounded-xs focus:outline-none cursor-pointer relative pr-10 ${
      outlined ? "bg-white border border-gray-300" : "bg-gray-300"
    }`}
  >
    {selectedOptions.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {selectedOptions.map((option) => (
          <SelectedOptionTag
            key={option.value}
            option={option}
            onRemove={handleOptionClick}
          />
        ))}
      </div>
    ) : (
      placeholder
    )}
    <ChevronDown
      className={`lucide lucide-chevron-down absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </button>
);
