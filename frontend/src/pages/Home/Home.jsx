import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { useProducts } from "../../hooks/useProducts";
import { fetchCategories } from "../../services/product";
import { useCart } from "../../hooks/useCart";
import ProductList from "../../component/ProductList/ProductList";
import ProductCatalog from "../../component/ProductCatalog/ProductCatalog";
import StateMessage from "../../component/StateMessage/StateMessage";
import {
  FaMedal,
  FaTruckFast,
  FaHandsHoldingCircle,
  FaShieldHeart,
} from "react-icons/fa6";
import "./Home.css";

const HERO_IMAGE = "/batik/parang.jpeg";

const FEATURES = [
  {
    Icon: FaMedal,
    title: "Kualitas Premium",
    desc: "Batik asli pilihan, kain terbaik dengan detail halus.",
  },
  {
    Icon: FaHandsHoldingCircle,
    title: "Buatan Pengrajin",
    desc: "Mendukung pengrajin lokal dan warisan budaya Indonesia.",
  },
  {
    Icon: FaTruckFast,
    title: "Pengiriman Cepat",
    desc: "Dikirim cepat ke seluruh Indonesia, dikemas aman.",
  },
  {
    Icon: FaShieldHeart,
    title: "Garansi Kepuasan",
    desc: "Belanja tenang dengan jaminan kualitas terbaik.",
  },
];

function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [categories, setCategories] = useState([]);
  const { products, isLoading, error } = useProducts({});

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const featured = products.slice(0, 4);

  const handleProductClick = (product) => navigate(`/product/${product.id}`);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Marketplace Batik Indonesia</span>
            <h1 className="hero__title">
              Batik Berkualitas, <br />
              untuk <em>Semua</em>
            </h1>
            <p className="hero__sub">
              Temukan koleksi batik pilihan dari berbagai UMKM Indonesia
              dengan kualitas terjamin dan harga yang bersahabat.
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() =>
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Belanja Sekarang
              </button>
              <a href="#featured" className="btn btn--ghost">
                Lihat Koleksi
              </a>
            </div>
          </div>

          <div className="hero__media">
            <div className="hero__image-frame">
              <img src={HERO_IMAGE} alt="BeliBatik" className="hero__image" />
              <div className="hero__badge">
                <strong>100%</strong>
                <span>Asli Batik Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="section container">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Pilihan Terbaik</span>
            <h2 className="section__title">Produk Unggulan</h2>
          </div>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() =>
              document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Lihat Semua
          </button>
        </div>

        {isLoading && <StateMessage kind="loading" message="Memuat produk..." />}
        {!isLoading && error && (
          <StateMessage kind="error" message="Gagal memuat produk." />
        )}
        {!isLoading && !error && (
          <ProductList
            products={featured}
            onProductClick={handleProductClick}
            onAddToCart={addItem}
          />
        )}
      </section>

      {/* Categories */}
      <section className="section section--tinted container">
        <div className="section__head">
          <div>
            <span className="section__eyebrow">Jelajahi</span>
            <h2 className="section__title">Kategori Produk</h2>
          </div>
        </div>
        <div className="home-cats">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="home-cats__item"
              onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
            >
              <span className="home-cats__name">{cat}</span>
              <span className="home-cats__arrow">&rarr;</span>
            </button>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Mengapa Kami</span>
            <h2 className="section__title">Kenapa Memilih BeliBatik</h2>
          </div>
        </div>
        <div className="home-features">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className="home-features__item">
              <div className="home-features__icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section id="catalog" className="section section--tinted">
        <div className="container">
          <div className="section__head section__head--center">
            <div>
              <span className="section__eyebrow">Katalog</span>
              <h2 className="section__title">Semua Produk</h2>
              <p className="section__sub">
                Cari dan pilih batik favorit Anda.
              </p>
            </div>
          </div>
          <ProductCatalog initialProducts={products} />
        </div>
      </section>
    </PageLayout>
  );
}

export default Home;
