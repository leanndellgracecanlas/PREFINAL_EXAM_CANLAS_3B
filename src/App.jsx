import { useState } from "react";
import { initialProducts } from "./products";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import AddProductForm from "./components/AddProductForm";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update item quantity in cart (+ / -)
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Add new product from form
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setCurrentView("products");
  };

  // View details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {currentView === "products" && (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView === "detail" && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentView("products")}
          />
        )}

        {currentView === "cart" && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onBackToProducts={() => setCurrentView("products")}
          />
        )}

        {currentView === "add-product" && (
          <AddProductForm
            onAddProduct={handleAddProduct}
            onCancel={() => setCurrentView("products")}
          />
        )}
      </main>
    </div>
  );
}