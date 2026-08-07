import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "3rem 1.5rem",
            textAlign: "center",
            color: "var(--ink-soft)",
          }}
        >
          <h1 style={{ margin: 0, color: "var(--ink)" }}>
            Terjadi kesalahan
          </h1>
          <p style={{ margin: 0, maxWidth: "46ch" }}>
            Maaf, halaman ini gagal dimuat. Silakan muat ulang atau kembali ke
            beranda.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
          >
            Kembali ke Beranda
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
