import { Search } from "@mui/icons-material";
type SearchInputProps = {
  input?: string;
  handleSearch?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ input, handleSearch, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        value={input}
        onChange={onChange}
        type="text"
        className=" w-full px-3 pl-10 outline-1 outline outline-gray-400 py-2 rounded-md"
        placeholder="Search..."
      />
      <Search
        className="absolute left-2 top-2 opacity-50"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
