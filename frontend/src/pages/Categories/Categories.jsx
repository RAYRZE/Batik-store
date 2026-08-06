import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { fetchCategories } from "../../services/product";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <PageLayout>
      <section className="section container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Jelajahi</span>
            <h1 className="section__title">Kategori</h1>
            <p className="section__sub">
              Temukan batik sesuai selera Anda.
            </p>
          </div>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="categories__card"
            >
              <span className="categories__name">{cat}</span>
              <span className="categories__arrow">&rarr;</span>
            </Link>
          ))}
          <Link to="/products" className="categories__card categories__card--all">
            <span className="categories__name">Semua Produk</span>
            <span className="categories__arrow">&rarr;</span>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

export default Categories;
