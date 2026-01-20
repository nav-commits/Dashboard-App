
type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  bgClass?: string;
};
const Search = ({ value, onChange, bgClass = "bg-white" }: SearchProps) => {
  return (
    <div className={`flex items-center rounded-md px-3 py-2 ${bgClass}`}>
      <label htmlFor="dashboard-search" className="sr-only">
        Search dashboard
      </label>
      <img
        src="/Icons/search.svg"
        alt=""
        aria-hidden="true"
        className="w-[20px] h-[20px] mr-2 object-contain"
      />

      <input
        id="dashboard-search"
        type="search"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default Search;
