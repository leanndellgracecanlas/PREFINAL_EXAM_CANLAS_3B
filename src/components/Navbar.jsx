export default function Navbar({ currentView, setCurrentView, cartCount }) {
  return (
    <header className="bg-[#1f3d2b] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight">🛍️ ShopMate</span>
          <span className="text-xs bg-[#2e593f] px-2 py-0.5 rounded text-green-200">Product Manager</span>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView("products")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentView === "products"
                ? "bg-white text-[#1f3d2b] shadow"
                : "text-gray-200 hover:bg-[#2a5039]"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setCurrentView("add-product")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currentView === "add-product"
                ? "bg-white text-[#1f3d2b] shadow"
                : "text-gray-200 hover:bg-[#2a5039]"
            }`}
          >
            + Add Product
          </button>
          <button
            onClick={() => setCurrentView("cart")}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              currentView === "cart"
                ? "bg-white text-[#1f3d2b] shadow"
                : "text-gray-200 hover:bg-[#2a5039]"
            }`}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}