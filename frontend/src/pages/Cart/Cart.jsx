import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import PageLayout from "../../layouts/PageLayout";
import StateMessage from "../../component/StateMessage/StateMessage";
import CartItem from "../../component/CartItem/CartItem";
import CartSummary from "../../component/CartSummary/CartSummary";
import "./Cart.css";

const EMPTY_MESSAGE = "Keranjang Anda masih kosong.";

function Cart() {
  const { items, subtotal, total, updateQuantity, removeItem } = useCart();

  return (
    <PageLayout>
      <div className="cart">
        <h1 className="cart__title">Keranjang</h1>

        {items.length === 0 ? (
          <StateMessage kind="empty" message={EMPTY_MESSAGE} />
        ) : (
          <>
            <div className="cart__items">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <CartSummary subtotal={subtotal} total={total} variant="cart">
              <Link to="/" className="cart__continue">
                Lanjut Belanja
              </Link>
              <Link to="/checkout" className="cart__checkout">
                Checkout
              </Link>
            </CartSummary>
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default Cart;
