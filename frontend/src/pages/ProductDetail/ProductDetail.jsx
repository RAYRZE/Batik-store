import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import PageLayout from "../../layouts/PageLayout";
import StateMessage from "../../component/StateMessage/StateMessage";
import { formatPrice } from "../../utils/formatPrice";
import { getErrorMessage } from "../../utils/errors";
import "./ProductDetail.css";

const LOADING_MESSAGE = "Memuat produk...";
const ERROR_MESSAGE = "Gagal memuat produk. Silakan coba lagi.";
const NOT_FOUND_MESSAGE = "Produk tidak ditemukan.";

function ProductDetail() {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();

  return (
    <PageLayout>
      <div className="product-detail">
        {isLoading && <StateMessage kind="loading" message={LOADING_MESSAGE} />}

        {!isLoading && error && (
          <StateMessage
            kind="error"
            message={getErrorMessage(error, ERROR_MESSAGE, NOT_FOUND_MESSAGE)}
          />
        )}

        {!isLoading && !error && product && (
          <>
            <Link to="/" className="product-detail__back">
              &larr; Kembali
            </Link>

            <div className="product-detail__content">
              <div className="product-detail__media">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-detail__image"
                />
              </div>

              <div className="product-detail__info">
                {product.category && (
                  <span className="product-detail__category">
                    {product.category}
                  </span>
                )}
                <h1 className="product-detail__name">{product.name}</h1>
                <p className="product-detail__price">
                  {formatPrice(product.price)}
                </p>
                <p className="product-detail__description">
                  {product.description}
                </p>
                <p
                  className={`product-detail__stock ${
                    product.stock <= 0 ? "product-detail__stock--low" : ""
                  }`}
                >
                  {product.stock > 0
                    ? `Stok: ${product.stock}`
                    : "Stok habis"}
                </p>
                <button
                  type="button"
                  className="product-detail__add"
                  onClick={() => addItem(product, 1)}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default ProductDetail;
