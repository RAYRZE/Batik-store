import { FaCartPlus } from "react-icons/fa6";
import { formatPrice } from "../../utils/formatPrice";
import "./ProductCard.css";

function ProductCard({
  product = {},
  onAddToCart,
  onClick,
}) {
  const {
    name,
    category,
    price,
    image,
  } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="product-card__media">
        <img src={image} alt={name} className="product-card__image" loading="lazy" />

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

        <div className="product-card__footer">
          <div className="product-card__price">
            {typeof price === "number" && (
              <span className="product-card__price-current">{formatPrice(price)}</span>
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
