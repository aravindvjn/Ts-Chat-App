import SearchInput from "../../components/Search/SearchInput";
import Suggested from "./Suggested";

const Search = () => {
  return (
    <div className="p-5">
      <SearchInput />
      <Suggested />
    </div>
  );
};

export default Search;
