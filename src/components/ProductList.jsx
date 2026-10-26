import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onAddToCart, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter items based on active category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <span className="text-sm font-semibold text-gray-500 mr-2">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-[#1f3d2b] text-white shadow-sm"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}