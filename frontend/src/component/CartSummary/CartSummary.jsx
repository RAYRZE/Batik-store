import { formatPrice } from "../../utils/formatPrice";

function CartSummary({ subtotal, total, variant = "cart", children }) {
  return (
    <div className={`${variant}__summary`}>
      <div className={`${variant}__summary-row`}>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className={`${variant}__summary-row ${variant}__summary-row--total`}>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      {children}
    </div>
  );
}

export default CartSummary;
