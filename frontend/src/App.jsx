import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Help from "./pages/Help/Help";
import About from "./pages/About/About";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PlaceholderPage from "./component/PlaceholderPage";

const Products = lazy(() => import("./pages/Products/Products"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const Partner = lazy(() => import("./pages/Partner/Partner"));

function Loading() {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        padding: "var(--space-8) var(--space-4)",
        color: "var(--ink-soft)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 34,
          border: "3px solid var(--brand-50)",
          borderTopColor: "var(--brand)",
          borderRadius: "50%",
          animation: "state-message-spin 0.8s linear infinite",
        }}
      />
      <p style={{ margin: 0 }}>Memuat halaman...</p>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/categories"
          element={
            <Suspense fallback={<Loading />}>
              <Categories />
            </Suspense>
          }
        />
        <Route
          path="/partner"
          element={
            <Suspense fallback={<Loading />}>
              <Partner />
            </Suspense>
          }
        />
        <Route
          path="/stories"
          element={
            <PlaceholderPage eyebrow="Batik Stories" title="Cerita di Balik Motif">
              <p>
                Jelajahi kisah dan filosofi di balik setiap motif batik. Cerita
                ini segera hadir.
              </p>
            </PlaceholderPage>
          }
        />
        <Route
          path="/contact"
          element={
            <PlaceholderPage eyebrow="Kontak" title="Hubungi Kami">
              <p>
                Butuh bantuan? Hubungi kami melalui WhatsApp atau media sosial.
              </p>
              <a
                className="btn btn--primary"
                href="https://wa.me/62882003067694"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat WhatsApp
              </a>
            </PlaceholderPage>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
