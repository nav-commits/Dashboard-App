import Search from "../components/Search";

const Header = () => {
  return (
    <header className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-medium">
        Hello Evano 👋🏼,
      </h1>

      <Search />
    </header>
  );
};

export default Header;
