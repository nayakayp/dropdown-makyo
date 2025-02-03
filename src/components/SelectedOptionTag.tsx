import { X } from "lucide-react";
import { Option } from "./types";

export const SelectedOptionTag = ({
  option,
  onRemove,
}: {
  option: Option;
  onRemove: (option: Option) => void;
}) => (
  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800 flex items-center gap-1 group">
    {option.label}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove(option);
      }}
      className="border cursor-pointer p-0.5 rounded-full transition-colors"
    >
      <X size={10} />
    </button>
  </span>
);
