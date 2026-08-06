import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

function ProductList({ products, onProductClick, onAddToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
