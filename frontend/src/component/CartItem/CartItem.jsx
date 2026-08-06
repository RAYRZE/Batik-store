import { FaTrash } from "react-icons/fa6";
import { formatPrice } from "../../utils/formatPrice";
import "./CartItem.css";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;
  const maxStock = product.stock || 1;

  return (
    <div className="cart-item">
      <img
        src={product.image}
        alt={product.name}
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{product.name}</h3>
        <span className="cart-item__category">{product.category}</span>
        <p className="cart-item__price">{formatPrice(product.price)}</p>

        <div className="cart-item__controls">
          <div className="cart-item__qty">
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Kurangi jumlah"
            >
              &minus;
            </button>
            <span className="cart-item__qty-value">{quantity}</span>
            <button
              type="button"
              className="cart-item__qty-btn"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={quantity >= maxStock}
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={() => onRemove(product.id)}
            aria-label="Hapus produk"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      <p className="cart-item__subtotal">{formatPrice(product.price * quantity)}</p>
    </div>
  );
}

export default CartItem;
