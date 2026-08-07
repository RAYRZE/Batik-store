import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok, FaCartShopping } from "react-icons/fa6";
import Logo from "../../../assets/logo-Batik.png";
import "./Footer.css";

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com/", Icon: FaTiktok, label: "TikTok" },
  { href: "https://www.instagram.com/", Icon: FaInstagram, label: "Instagram" },
  { href: "https://www.youtube.com/", Icon: FaYoutube, label: "YouTube" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={Logo} alt="BeliBatik" className="footer__logo-img" />
            <span className="footer__logo-name">
              Beli<em>Batik</em>
            </span>
          </Link>
          <p className="footer__tagline">
            Koleksi batik premium asli Indonesia, dibuat dengan cinta dan
            warisan budaya yang mendalam.
          </p>
          <div className="footer__social">
            {SOCIAL_LINKS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Menu</h4>
          <Link to="/">Beranda</Link>
          <Link to="/about">Tentang</Link>
          <Link to="/help">Bantuan</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Belanja</h4>
          <Link to="/cart">
            <FaCartShopping size={14} /> Keranjang
          </Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Hubungi Kami</h4>
          <a href="https://wa.me/62882003067694" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span className="footer__note">Pesan batik langsung dari kami.</span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} BeliBatik. Dibuat dengan ♥ di Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
