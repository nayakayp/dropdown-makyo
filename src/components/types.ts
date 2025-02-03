export type Option = {
  value: string;
  label: string;
};

export type DropdownProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option[]) => void;
  multiple?: boolean;
  withSearch?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
  portal?: boolean;
};
