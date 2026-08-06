import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import PageLayout from "../../layouts/PageLayout";
import StateMessage from "../../component/StateMessage/StateMessage";
import CartItem from "../../component/CartItem/CartItem";
import CartSummary from "../../component/CartSummary/CartSummary";
import {
  buildWhatsAppMessage,
  buildWhatsAppLink,
} from "../../utils/whatsapp";
import "./Checkout.css";

const EMPTY_MESSAGE = "Keranjang Anda masih kosong.";
const DEFAULT_WHATSAPP_NUMBER = "62882003067694";
const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

function Checkout() {
  const { items, subtotal, total, updateQuantity, removeItem } = useCart();

  const message = useMemo(
    () => buildWhatsAppMessage(items, { subtotal, total }),
    [items, subtotal, total],
  );
  const whatsappLink = buildWhatsAppLink(message, WHATSAPP_NUMBER);

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="checkout">
          <StateMessage kind="empty" message={EMPTY_MESSAGE} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="checkout">
        <h1 className="checkout__title">Checkout</h1>

        <div className="checkout__items">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <CartSummary subtotal={subtotal} total={total} variant="checkout" />

        <pre className="checkout__preview">{message}</pre>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="checkout__whatsapp"
        >
          Checkout via WhatsApp
        </a>

        <Link to="/cart" className="checkout__back">
          &larr; Kembali ke Keranjang
        </Link>
      </div>
    </PageLayout>
  );
}

export default Checkout;
