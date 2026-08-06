import { useSearchParams } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import ProductCatalog from "../../component/ProductCatalog/ProductCatalog";

function Products() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  return (
    <PageLayout>
      <section className="section container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Katalog</span>
            <h1 className="section__title">Semua Produk</h1>
            {search && (
              <p className="section__sub">
                Hasil pencarian untuk &ldquo;{search}&rdquo;
              </p>
            )}
          </div>
        </div>
        <ProductCatalog
          key={`${search}|${category}`}
          initialSearch={search}
          initialCategory={category}
        />
      </section>
    </PageLayout>
  );
}

export default Products;
