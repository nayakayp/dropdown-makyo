import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { DropdownButton } from "./DropdownButton";
import { SearchInput } from "./SearchInput";
import { OptionsList } from "./OptionList";

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
  const portalRef = useRef<HTMLDivElement | null>(null);

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
      newSelectedOptions = isSelected
        ? selectedOptions.filter((selected) => selected.value !== option.value)
        : [...selectedOptions, option];
    } else {
      newSelectedOptions = isSelected ? [] : [option];
    }

    setSelectedOptions(newSelectedOptions);
    setSearchTerm("");
    onChange?.(newSelectedOptions);
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (dropdownRef.current) {
      const width = dropdownRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        "--dropdown-width",
        `${width}px`,
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const isClickInsideDropdown = dropdownRef.current?.contains(
        event.target as Node,
      );
      const isClickInsidePortal = portalRef.current?.contains(
        event.target as Node,
      );

      if (!isClickInsideDropdown && !isClickInsidePortal) {
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
        <DropdownButton
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          isOpen={isOpen}
          handleOptionClick={handleOptionClick}
          handleButtonClick={() => setIsOpen(!isOpen)}
        />

        <div
          className={`absolute w-full mt-1 bg-white z-10 transition-all duration-100 ease-in shadow-lg ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {withSearch && (
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchInputRef={searchInputRef}
            />
          )}

          <OptionsList
            filteredOptions={filteredOptions}
            selectedOptions={selectedOptions}
            handleOptionClick={handleOptionClick}
            renderOption={renderOption}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );

  if (portal) {
    return (
      <div ref={dropdownRef} className="relative w-full">
        <DropdownButton
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          isOpen={isOpen}
          handleOptionClick={handleOptionClick}
          handleButtonClick={() => setIsOpen(!isOpen)}
        />
        {createPortal(
          <div
            ref={portalRef}
            className={`fixed z-[9999] w-[var(--dropdown-width)] transition-all duration-100 ease-in ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
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
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchInputRef={searchInputRef}
              />
            )}
            <OptionsList
              filteredOptions={filteredOptions}
              selectedOptions={selectedOptions}
              handleOptionClick={handleOptionClick}
              renderOption={renderOption}
              searchTerm={searchTerm}
            />
          </div>,
          document.body,
        )}
      </div>
    );
  }

  return dropdownContent;
};
