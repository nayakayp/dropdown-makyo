import { useState, useRef, useEffect, useMemo } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option) => void;
}

export const Dropdown = ({
  options,
  placeholder = "Select an option",
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    onChange?.(option);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    return () => {};
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-xs focus:outline-none cursor-pointer relative pr-10"
      >
        {selectedOption ? selectedOption.label : placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`lucide lucide-chevron-down absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        {/* <ChevronUpDownIcon /> */}
      </button>

      <div
        className={`absolute w-full mt-1 bg-white z-10 transition-all duration-100 ease-in shadow-lg ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
          onClick={(e) => e.stopPropagation()}
        />

        <ul className="max-h-60 overflow-auto px-4 pb-4 border-gray-300 border-b border-r border-l">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`-mx-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedOption?.value === option.value ? "bg-teal-100" : ""
              }`}
            >
              {highlightText(option.label, searchTerm)}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      </div>
    </div>
  );
};
