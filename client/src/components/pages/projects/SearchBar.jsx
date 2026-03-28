const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      dir="rtl"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="חפש לפי סמסטר / שנה / שם קורס..."
      className="flex-1 text-right p-3 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/20 backdrop-blur-sm text-gray-900 placeholder-gray-400 transition w-full md:w-auto"
    />
  );
};

export default SearchBar;