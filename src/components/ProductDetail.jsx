export default function ProductDetail({ product, onAddToCart, onBack }) {
  if (!product) return null;

  const isLowStock = product.quantity < 5;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
      {/* Back to Products Navigation */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-sm font-semibold text-[#1f3d2b] hover:text-[#2a5039] hover:underline transition"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Image Container with Clean Fit */}
        <div className="w-full h-80 sm:h-96 rounded-xl bg-gray-50 border border-gray-200 p-6 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info & Actions */}
        <div className="flex flex-col space-y-5">
          <div>
            <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center text-sm text-yellow-500 mt-2">
              <span className="font-semibold">★ {product.rating}</span>
              <span className="text-gray-400 text-xs ml-1.5">
                ({product.reviews} customer reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-[#1f3d2b]">
            ₱ {product.price.toLocaleString()}
          </div>

          {/* Stock Availability Badge */}
          <div>
            {isLowStock ? (
              <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                ⚠️ Low Stock: Only {product.quantity} left!
              </span>
            ) : (
              <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                ✓ In Stock: {product.quantity} units available
              </span>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b border-gray-100 py-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications List */}
          {product.specifications && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">
                Product Specifications
              </h3>
              <ul className="text-xs text-gray-600 space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between items-center border-b border-gray-200/60 pb-1.5 last:border-0 last:pb-0"
                  >
                    <span className="capitalize font-medium text-gray-500">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="text-gray-900 font-semibold">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Action */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            className="w-full py-3.5 bg-[#1f3d2b] text-white font-semibold rounded-xl hover:bg-[#2a5039] active:scale-[0.99] transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}