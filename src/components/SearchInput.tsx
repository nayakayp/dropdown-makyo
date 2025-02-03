import { Search, X } from "lucide-react";

export const SearchInput = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}) => (
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
        <X className="lucide lucide-x absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white bg-gray-400 rounded-full cursor-pointer p-0.5" />
      </button>
    )}
    <Search className="lucide lucide-search text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4" />
  </div>
);
