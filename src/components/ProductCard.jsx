export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  const isLowStock = product.quantity < 5;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
      {/* Fitted Image Container */}
      <div className="h-56 w-full bg-gray-50 p-4 flex items-center justify-center relative border-b border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700 shadow-xs">
          {product.category}
        </span>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center text-sm text-yellow-500 mb-2">
            <span>★ {product.rating}</span>
            <span className="text-gray-400 text-xs ml-1">({product.reviews} reviews)</span>
          </div>

          {/* Conditional Low Stock Badge */}
          {isLowStock ? (
            <span className="inline-block bg-red-100 text-red-700 text-xs px-2.5 py-1 rounded-full font-medium mb-3">
              Low Stock: Only {product.quantity} left!
            </span>
          ) : (
            <span className="inline-block bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium mb-3">
              In Stock: {product.quantity} units
            </span>
          )}
        </div>

        <div>
          {/* Price */}
          <div className="text-xl font-bold text-gray-900 mb-3">
            ₱ {product.price.toLocaleString()}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              View Details
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.quantity === 0}
              className="py-2 px-3 text-sm font-medium text-white bg-[#1f3d2b] rounded-lg hover:bg-[#2a5039] transition disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}