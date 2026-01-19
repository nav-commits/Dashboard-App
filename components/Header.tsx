"use client";

import { useState } from "react";
import Search from "../components/Search";

const Header = () => {
  const [query, setQuery] = useState("");
  return (
    <header className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-medium">
        Hello Evano 👋🏼,
      </h1>
      <Search
        value={query}
        onChange={setQuery}
      />
    </header>
  );
};

export default Header;
