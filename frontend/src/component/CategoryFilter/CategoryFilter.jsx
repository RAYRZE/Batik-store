import "./CategoryFilter.css";

function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="category-filter">
      <button
        type="button"
        className={`category-filter__item ${
          value === "" ? "is-active" : ""
        }`}
        onClick={() => onChange("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={`category-filter__item ${
            value === category ? "is-active" : ""
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
