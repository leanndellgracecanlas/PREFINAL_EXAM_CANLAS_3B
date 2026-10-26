import { useState } from "react";

export default function AddProductForm({ onAddProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    price: "",
    quantity: "",
    image: "", // Will hold the selected file's object URL[cite: 41]
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Regular input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 📁 File Manager Image Picker Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local blob URL for preview and product display[cite: 41, 42]
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({
        ...prev,
        image: previewUrl,
      }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: "" }));
      }
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (Number(formData.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    return newErrors;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      rating: 5.0,
      reviews: 1,
      // Uses the uploaded image or falls back to a default image[cite: 43]
      image: formData.image || "/headphone.jpg",
      description: formData.description,
      specifications: {
        added: new Date().toLocaleDateString(),
        condition: "Brand New",
      },
    };

    onAddProduct(newProduct);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        <button
          onClick={onCancel}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Smart Watch"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3d2b] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3d2b] bg-white"
            >
              <option value="Electronics">Electronics</option>
              <option value="Bags">Bags</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₱) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 1499"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3d2b] ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 3 (try < 5 for low stock badge)"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3d2b] ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>

        {/* 📁 File Manager Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image (Upload from Computer)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1f3d2b] file:text-white hover:file:bg-[#2a5039] cursor-pointer border border-gray-300 rounded-lg p-1"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Upload preview"
                className="h-14 w-14 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP up to 5MB</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed product overview..."
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f3d2b] ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#1f3d2b] text-white font-semibold rounded-lg hover:bg-[#2a5039] transition shadow-sm mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}