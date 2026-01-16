"use client";
import { useState } from "react";
import Image from "next/image";
const Search = () => {
const [query, setQuery] = useState("");
  return (
    <div className="flex items-center bg-white rounded-md px-3 py-2">
      <label htmlFor="dashboard-search" className="sr-only">
        Search dashboard
      </label>
      <Image
        src="/icons/search.svg"
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        className="mr-2 object-contain"
      />
      <input
        id="dashboard-search"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default Search;
