import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCategories } from "../../services/product";
import { useCart } from "../../hooks/useCart";
import { getErrorMessage } from "../../utils/errors";
import ProductList from "../ProductList/ProductList";
import StateMessage from "../StateMessage/StateMessage";
import SearchBar from "../SearchBar/SearchBar";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import "./ProductCatalog.css";

const LOADING_MESSAGE = "Memuat produk...";
const EMPTY_MESSAGE = "Belum ada produk.";
const ERROR_MESSAGE = "Gagal memuat produk. Silakan coba lagi.";
const SEARCH_DELAY_MS = 300;

function ProductCatalog({ initialSearch = "", initialCategory = "" }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const search = useDebounce(searchInput, SEARCH_DELAY_MS);
  const { products, isLoading, error } = useProducts({ search, category });

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-catalog">
      <div className="product-catalog__toolbar">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      {isLoading && <StateMessage kind="loading" message={LOADING_MESSAGE} />}

      {!isLoading && error && (
        <StateMessage kind="error" message={getErrorMessage(error, ERROR_MESSAGE)} />
      )}

      {!isLoading && !error && products.length === 0 && (
        <StateMessage kind="empty" message={EMPTY_MESSAGE} />
      )}

      {!isLoading && !error && products.length > 0 && (
        <ProductList
          products={products}
          onProductClick={handleProductClick}
          onAddToCart={addItem}
        />
      )}
    </div>
  );
}

export default ProductCatalog;
