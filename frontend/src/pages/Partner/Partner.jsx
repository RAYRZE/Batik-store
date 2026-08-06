import {
  FaUsers,
  FaGift,
  FaWhatsapp,
  FaHandshake,
  FaClipboardList,
  FaBoxOpen,
  FaTruckFast,
  FaGlobe,
  FaBullhorn,
  FaChartLine,
  FaStar,
  FaCheck,
} from "react-icons/fa6";
import PageLayout from "../../layouts/PageLayout";
import { buildWhatsAppLink } from "../../utils/whatsapp";
import "./Partner.css";

const DEFAULT_WHATSAPP_NUMBER = "62882003067694";
const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

const PARTNER_MSG =
  "Halo, saya tertarik untuk bergabung sebagai mitra UMKM di Batik Nusantara.";

const REASONS = [
  {
    Icon: FaUsers,
    title: "Lebih Banyak Pelanggan",
    desc: "Jangkau pembeli batik premium dari berbagai kota di Indonesia.",
  },
  {
    Icon: FaGift,
    title: "Promosi Gratis",
    desc: "Kami bantu promosikan produk Anda di website dan media sosial.",
  },
  {
    Icon: FaWhatsapp,
    title: "Pesanan Mudah via WhatsApp",
    desc: "Order masuk langsung ke WhatsApp Anda, tanpa ribet.",
  },
  {
    Icon: FaHandshake,
    title: "Tanpa Komisi Marketplace",
    desc: "Tidak ada potongan komisi. 100% hasil penjualan milik Anda.",
  },
];

const STEPS = [
  {
    Icon: FaClipboardList,
    title: "Daftar",
    desc: "Isi data UMKM Anda melalui formulir atau WhatsApp.",
  },
  {
    Icon: FaBoxOpen,
    title: "Unggah Produk",
    desc: "Tampilkan koleksi batik Anda beserta foto dan harga.",
  },
  {
    Icon: FaWhatsapp,
    title: "Terima Pesanan",
    desc: "Notifikasi order masuk langsung ke WhatsApp Anda.",
  },
  {
    Icon: FaTruckFast,
    title: "Kirim Produk",
    desc: "Proses pengiriman dan pelanggan menerima pesanan.",
  },
];

const BENEFITS = [
  {
    Icon: FaGlobe,
    title: "Website Modern",
    desc: "Tampilkan brand Anda di toko online yang profesional.",
    badge: null,
  },
  {
    Icon: FaBullhorn,
    title: "Dukungan Marketing",
    desc: "Bantuan promosi untuk meningkatkan penjualan Anda.",
    badge: null,
  },
  {
    Icon: FaStar,
    title: "Eksposur Brand",
    desc: "Dikenal lebih luas sebagai pengrajin batik terpercaya.",
    badge: null,
  },
  {
    Icon: FaChartLine,
    title: "Analitik",
    desc: "Pantau performa produk dan tren penjualan.",
    badge: "Segera",
  },
];

const FAQS = [
  {
    q: "Apakah bergabung dikenakan biaya?",
    a: "Saat ini bergabung sepenuhnya gratis dan tanpa komisi marketplace.",
  },
  {
    q: "Bagaimana cara daftar sebagai mitra?",
    a: "Cukup hubungi kami melalui WhatsApp dan kami akan memandu proses pendaftaran Anda.",
  },
  {
    q: "Produk apa saja yang bisa dijual?",
    a: "Batik tulis, batik cap, dan produk batik lokal lainnya dari UMKM Indonesia.",
  },
  {
    q: "Bagaimana pembayaran kepada mitra?",
    a: "Saat ini pesanan diproses via WhatsApp. Integrasi payment gateway sedang disiapkan.",
  },
];

function Partner() {
  const whatsappLink = buildWhatsAppLink(PARTNER_MSG, WHATSAPP_NUMBER);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="partner-hero">
        <div className="container partner-hero__inner">
          <span className="section__eyebrow">Program Kemitraan</span>
          <h1 className="partner-hero__title">
            Jadilah Mitra Batik <em>Nusantara</em>
          </h1>
          <p className="partner-hero__desc">
            Bersama kami, kembangkan usaha batik Anda dan raih lebih banyak
            pelanggan di pasar digital Indonesia.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            <FaWhatsapp size={18} />
            Gabung Sekarang
          </a>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Kenapa Bergabung</span>
            <h2 className="section__title">Keuntungan Bermitra Dengan Kami</h2>
          </div>
        </div>
        <div className="partner-grid">
          {REASONS.map(({ Icon, title, desc }) => (
            <div key={title} className="partner-card">
              <div className="partner-card__icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section section--tinted container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Cara Kerja</span>
            <h2 className="section__title">Bagaimana Cara Memulainya</h2>
          </div>
        </div>
        <div className="partner-steps">
          {STEPS.map(({ Icon, title, desc }, index) => (
            <div key={title} className="partner-step">
              <div className="partner-step__num">{index + 1}</div>
              <div className="partner-step__icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="section container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">Manfaat</span>
            <h2 className="section__title">Fasilitas Untuk Mitra</h2>
          </div>
        </div>
        <div className="partner-grid">
          {BENEFITS.map(({ Icon, title, desc, badge }) => (
            <div key={title} className="partner-card">
              <div className="partner-card__icon">
                <Icon size={22} />
              </div>
              <div className="partner-card__head">
                <h3>{title}</h3>
                {badge && <span className="partner-card__badge">{badge}</span>}
              </div>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--tinted container">
        <div className="section__head section__head--center">
          <div>
            <span className="section__eyebrow">FAQ</span>
            <h2 className="section__title">Pertanyaan Umum</h2>
          </div>
        </div>
        <div className="partner-faq">
          {FAQS.map((faq) => (
            <details key={faq.q} className="partner-faq__item">
              <summary>
                <span>{faq.q}</span>
                <span className="partner-faq__toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="partner-cta">
          <h2 className="partner-cta__title">Siap Mengembangkan Usaha Batik Anda?</h2>
          <p className="partner-cta__desc">
            Gabung sekarang dan mulai jangkau lebih banyak pelanggan.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg"
          >
            <FaWhatsapp size={18} />
            Gabung Sekarang
          </a>
          <div className="partner-cta__trust">
            <FaCheck size={14} /> Gratis &amp; tanpa komisi
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default Partner;
