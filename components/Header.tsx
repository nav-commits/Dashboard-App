import Search from "../components/Search";
const Header = () => {
  return (
    <header className="flex items-center justify-between py-8 px-6">
      <h1 className="text-2xl font-bold">Hello Evano 👋🏼</h1>
      <Search />
    </header>
  );
};

export default Header;
