import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder = "Cari produk..." }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Cari produk"
      />
    </div>
  );
}

export default SearchBar;
