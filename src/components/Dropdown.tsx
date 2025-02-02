import React, { useState } from "react";
import Select, { components, ControlProps, OptionProps } from "react-select";
import { Manager, Reference, Popper } from "react-popper";

interface DropdownProps {
  options: { value: string; label: string }[];
  isMulti?: boolean;
  isSearchable?: boolean;
  customOptionRenderer?: (props: OptionProps) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  isMulti = false,
  isSearchable = true,
  customOptionRenderer,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(null);

  const CustomOption = customOptionRenderer
    ? customOptionRenderer
    : (props: OptionProps) => <components.Option {...props} />;

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref}>
            <Select
              components={{ Option: CustomOption }}
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti={isMulti}
              isSearchable={isSearchable}
              styles={{
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              menuPortalTarget={document.body}
            />
          </div>
        )}
      </Reference>
      <Popper placement="bottom-start">
        {({ ref, style, placement }) => (
          <div ref={ref} style={style} data-placement={placement}>
            {/* Popper content will be rendered here */}
          </div>
        )}
      </Popper>
    </Manager>
  );
};

export default Dropdown;
