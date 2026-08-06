import PageLayout from "../layouts/PageLayout";

function PlaceholderPage({ eyebrow, title, children }) {
  return (
    <PageLayout>
      <section
        className="section container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "var(--space-4)",
          maxWidth: "640px",
        }}
      >
        <span className="section__eyebrow">{eyebrow}</span>
        <h1 className="section__title">{title}</h1>
        <div
          style={{
            color: "var(--ink-soft)",
            maxWidth: "46ch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-5)",
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </section>
    </PageLayout>
  );
}

export default PlaceholderPage;
