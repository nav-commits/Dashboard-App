import Image from "next/image";

const Search = () => {
  return (
    <div className="flex items-center bg-white rounded-md border border-white px-3 py-2">
      <label htmlFor="dashboard-search" className="sr-only">
        Search
      </label>
      <Image
        src="/icons/search.svg"
        alt="Search"
        width={20}
        height={20}
        className="mr-2 object-contain"
      />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default Search;
