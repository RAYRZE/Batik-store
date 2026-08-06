import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./TopBar.css";

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com/", Icon: FaTiktok, label: "TikTok" },
  { href: "https://www.instagram.com/", Icon: FaInstagram, label: "Instagram" },
  { href: "https://www.youtube.com/", Icon: FaYoutube, label: "YouTube" },
];

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <p className="topbar__message">Made in Indonesia 🇮🇩</p>
      </div>
      <div className="topbar__right">
        <div className="topbar__links">
          <Link to="/about">Tentang kami</Link>
          <Link to="/help">Bantuan</Link>
        </div>
        <span className="topbar__divider" aria-hidden="true" />
        <div className="topbar__social">
          {SOCIAL_LINKS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
