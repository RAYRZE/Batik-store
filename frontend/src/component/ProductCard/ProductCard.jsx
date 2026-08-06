import { FaStar, FaCartPlus } from "react-icons/fa6";
import { formatPrice } from "../../utils/formatPrice";
import "./ProductCard.css";

function ProductCard({
  product = {},
  onAddToCart,
  onClick,
}) {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    isNew = false,
  } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const hasDiscount = originalPrice && typeof price === "number" && originalPrice > price;

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="product-card__media">
        <img src={image} alt={name} className="product-card__image" loading="lazy" />

        <div className="product-card__badges">
          {isNew && <span className="badge badge--new">Baru</span>}
          {discountPercent > 0 && (
            <span className="badge badge--discount">-{discountPercent}%</span>
          )}
        </div>

        <button
          className="product-card__quick-add"
          onClick={handleAddToCart}
          title="Tambah ke Keranjang"
        >
          <FaCartPlus size={16} />
          <span>Keranjang</span>
        </button>
      </div>

      <div className="product-card__body">
        {category && <span className="product-card__category">{category}</span>}
        <h3 className="product-card__title">{name}</h3>

        {typeof rating === "number" && (
          <div className="product-card__rating">
            <FaStar size={13} />
            <span>{rating}</span>
            {reviewCount > 0 && (
              <span className="product-card__rating-count">({reviewCount})</span>
            )}
          </div>
        )}

        <div className="product-card__footer">
          <div className="product-card__price">
            {typeof price === "number" && (
              <span className="product-card__price-current">{formatPrice(price)}</span>
            )}
            {hasDiscount && (
              <span className="product-card__price-original">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <button
            className="product-card__add"
            onClick={handleAddToCart}
            aria-label="Tambah ke Keranjang"
          >
            <FaCartPlus size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
