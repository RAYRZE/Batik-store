import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaCartShopping,
  FaBars,
  FaXmark,
  FaChevronDown,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { useCart } from "../../../hooks/useCart";
import { fetchCategories } from "../../../services/product";
import Logo from "../../../assets/logo-Batik.png";
import "./Nav.css";

const PRIMARY_LINKS = [
  { to: "/", label: "Beranda", end: true },
  { to: "/products", label: "Belanja" },
  { to: "/partner", label: "UMKM Partner" },
  { to: "/stories", label: "Batik Stories" },
  { to: "/contact", label: "Kontak" },
];

function SearchForm({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    onClose?.();
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <form className="nav__search" role="search" onSubmit={handleSubmit}>
      <FaMagnifyingGlass className="nav__search-icon" aria-hidden="true" />
      <input
        type="search"
        className="nav__search-input"
        placeholder="Cari produk batik..."
        aria-label="Cari produk batik"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

function MainNav() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const catRef = useRef(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!catOpen) return;
    const onDocClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setCatOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [catOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goCategory = (cat) => {
    setCatOpen(false);
    navigate(`/products?category=${encodeURIComponent(cat)}`);
  };

  return (
    <>
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setMenuOpen(false)}>
          <img src={Logo} alt="BeliBatik" className="nav__logo" />
          <span className="nav__brand-name">
            Beli<em>Batik</em>
          </span>
        </Link>

        {/* Desktop center links */}
        <nav className="nav__links" aria-label="Navigasi utama">
          {PRIMARY_LINKS.map((link) =>
            link.to === "/" ? (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `nav__link ${isActive ? "is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}

          {/* Categories dropdown */}
          <div className="nav__dropdown" ref={catRef}>
            <button
              type="button"
              className={`nav__link nav__dropdown-trigger ${
                catOpen ? "is-open" : ""
              }`}
              aria-expanded={catOpen}
              aria-haspopup="menu"
              onClick={() => setCatOpen((v) => !v)}
            >
              Kategori
              <FaChevronDown className="nav__dropdown-caret" size={12} aria-hidden="true" />
            </button>
            {catOpen && (
              <div className="nav__dropdown-menu" role="menu">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="menuitem"
                    className="nav__dropdown-item"
                    onClick={() => goCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
                <Link
                  to="/categories"
                  className="nav__dropdown-item"
                  onClick={() => setCatOpen(false)}
                >
                  Semua Kategori
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right: search, cart */}
        <div className="nav__actions">
          <div className="nav__actions-search">
            <SearchForm />
          </div>

          <Link
            to="/cart"
            className="nav__icon-btn"
            aria-label={`Keranjang, ${itemCount} item`}
          >
            <FaCartShopping size={19} />
            {itemCount > 0 && (
              <span className="nav__cart-count">{itemCount}</span>
            )}
          </Link>

          <button
            type="button"
            className="nav__toggle"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile-only full-width search below the navbar */}
      <div className="nav__searchrow">
        <div className="container">
          <SearchForm />
        </div>
      </div>
    </header>

    {/* Mobile drawer */}
    <div
      className={`nav__backdrop ${menuOpen ? "is-open" : ""}`}
      onClick={() => setMenuOpen(false)}
      aria-hidden="true"
    />
      <div
        className={`nav__drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav__drawer-head">
          <Link
            to="/"
            className="nav__drawer-brand"
            onClick={() => setMenuOpen(false)}
          >
            <img src={Logo} alt="" className="nav__logo" />
            <span className="nav__brand-name">
              Beli<em>Batik</em>
            </span>
          </Link>
          <button
            type="button"
            className="nav__toggle"
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
          >
            <FaXmark size={22} />
          </button>
        </div>

        <div className="nav__drawer-search">
          <SearchForm onClose={() => setMenuOpen(false)} />
        </div>

        <nav className="nav__drawer-links" aria-label="Navigasi menu">
          {[
            ...PRIMARY_LINKS,
            { to: "/categories", label: "Semua Kategori" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `nav__drawer-link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/cart"
          className="btn btn--primary btn--block nav__drawer-cart"
          onClick={() => setMenuOpen(false)}
        >
          <FaCartShopping size={16} />
          Keranjang ({itemCount})
        </Link>
      </div>
    </>
  );
}

export default MainNav;
