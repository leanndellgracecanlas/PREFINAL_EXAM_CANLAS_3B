import { useState } from "react";

export default function Cart({ cart, onUpdateQuantity, onRemoveFromCart, onBackToProducts }) {
  // Calculate Grand Total
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
        <button
          onClick={onBackToProducts}
          className="text-sm font-medium text-[#1f3d2b] hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4 text-lg">Your cart is currently empty.</p>
          <button
            onClick={onBackToProducts}
            className="px-5 py-2.5 bg-[#1f3d2b] text-white rounded-lg font-medium hover:bg-[#2a5039] transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const subtotal = item.price * item.quantity;
                  const isLowStock = item.quantity < 5;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-4 flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <span className="text-xs text-gray-500">{item.category}</span>
                          {isLowStock && (
                            <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              Low Stock (&lt; 5)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        ₱ {item.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        ₱ {subtotal.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grand Total Summary Box */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-500 text-sm">
              Taxes and shipping calculated at checkout
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-700">Grand Total:</span>
              <span className="text-2xl font-bold text-[#1f3d2b]">
                ₱ {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}