import TopBar from "../component/layout/Topbar/Topbar";
import MainNav from "../component/layout/Main Navigation/MainNav";
import Footer from "../component/layout/Footer/Footer";

function PageLayout({ children }) {
  return (
    <div className="page">
      <TopBar />
      <MainNav />
      <main className="page__main">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;
