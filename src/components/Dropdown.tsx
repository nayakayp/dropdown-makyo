import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface Option {
  value: string;
  label: string;
}
interface DropdownProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option[]) => void;
  multiple?: boolean;
  withSearch?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
  portal?: boolean;
}

export const Dropdown = ({
  options,
  placeholder = "Select an option",
  onChange,
  multiple,
  withSearch = true,
  renderOption,
  portal = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
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
    const isSelected = selectedOptions.some(
      (selected) => selected.value === option.value,
    );
    let newSelectedOptions: Option[];

    if (multiple) {
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(
          (selected) => selected.value !== option.value,
        );
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
    } else {
      newSelectedOptions = isSelected ? [] : [option];
    }

    setSelectedOptions(newSelectedOptions);
    setSearchTerm("");
    onChange?.(newSelectedOptions);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    // Set dropdown width CSS variable
    if (dropdownRef.current) {
      const width = dropdownRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        "--dropdown-width",
        `${width}px`,
      );
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

  const dropdownContent = (
    <div ref={dropdownRef} className="relative w-full">
      <div>
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-xs focus:outline-none cursor-pointer relative pr-10"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800 flex items-center gap-1 group"
                >
                  {option.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    className="border cursor-pointer p-0.5 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          ) : (
            placeholder
          )}
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
          {withSearch && (
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-2 border-x border-t border-gray-300 focus:outline-none pr-8"
                onClick={(e) => e.stopPropagation()}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center justify-center pr-2"
                >
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
                    className="lucide lucide-x absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white bg-gray-400 rounded-full cursor-pointer p-0.5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-search text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          )}

          <ul className="max-h-60 overflow-auto px-4 pb-4 border-gray-300 border">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`-mx-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOptions.some(
                    (selected) => selected.value === option.value,
                  )
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
        </div>
      </div>
    </div>
  );

  if (portal) {
    return (
      <div ref={dropdownRef} className="relative w-full">
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-xs focus:outline-none cursor-pointer relative pr-10"
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800 flex items-center gap-1 group"
                >
                  {option.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    className="border cursor-pointer p-0.5 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          ) : (
            placeholder
          )}
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
        </button>
        {isOpen &&
          createPortal(
            <div
              className="fixed z-[9999] w-[var(--dropdown-width)]"
              style={{
                top: dropdownRef.current
                  ? dropdownRef.current.getBoundingClientRect().bottom +
                    window.scrollY +
                    4
                  : 0,
                left: dropdownRef.current
                  ? dropdownRef.current.getBoundingClientRect().left +
                    window.scrollX
                  : 0,
              }}
            >
              {withSearch && (
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-8 py-2 border-x border-t border-gray-300 focus:outline-none pr-8"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 flex items-center justify-center pr-2"
                    >
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
                        className="lucide lucide-x absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white bg-gray-400 rounded-full cursor-pointer p-0.5"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-search text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              )}
              <ul className="max-h-60 overflow-auto px-4 pb-4 border-gray-300 border bg-white">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`-mx-4 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedOptions.some(
                        (selected) => selected.value === option.value,
                      )
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
            </div>,
            document.body,
          )}
      </div>
    );
  }

  return dropdownContent;
};
