import { formatPrice } from "./formatPrice";

export function buildWhatsAppMessage(items, { subtotal, total }) {
  const lines = [
    "Halo, saya ingin memesan produk berikut:",
    "",
    "========= ORDER =========",
    "No  Nama  Qty  Subtotal",
    "-------------------------",
  ];

  items.forEach(({ product, quantity }, index) => {
    const name = product.name;
    const qty = quantity;
    const subtotalItem = formatPrice(product.price * quantity);
    lines.push(`${index + 1}.  ${name}`);
    lines.push(`    Qty: ${qty}  |  Subtotal: ${subtotalItem}`);
  });

  lines.push("-------------------------");
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push("Terima kasih.");

  return lines.join("\n");
}

export function buildWhatsAppLink(message, phone = "") {
  const base = "https://wa.me/";
  const number = phone.replace(/[^0-9]/g, "");
  return `${base}${number}?text=${encodeURIComponent(message)}`;
}
