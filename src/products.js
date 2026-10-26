export const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    quantity: 12,
    rating: 4.5,
    reviews: 120,
    image: "/headphone.jpg",
    description: "High-quality wireless headphones with active noise cancellation and ergonomic ear cushions.",
    specifications: {
      type: "Over-Ear",
      connectivity: "Bluetooth 5.0",
      batteryLife: "20 hours",
      color: "Pastel Green"
    }
  },
  {
    id: 2,
    name: "Backpack",
    category: "Bags",
    price: 899,
    quantity: 8,
    rating: 4.3,
    reviews: 85,
    image: "/handbag.jpg",
    description: "Durable and stylish shoulder bag with gathered leather styling, perfect for everyday essentials.",
    specifications: {
      material: "Leather / Fabric",
      dimensions: "30cm x 45cm x 20cm",
      weight: "0.6 kg",
      color: "Olive Green"
    }
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Shoes",
    price: 2499,
    quantity: 2, // Low stock: triggers < 5 red warning badge!
    rating: 4.7,
    reviews: 200,
    image: "/runningshoes.jpg",
    description: "Lightweight and breathable athletic running shoes with sculpted, cushioned soles.",
    specifications: {
      sole: "Sculpted Rubber",
      closure: "Lace-Up",
      weight: "0.4 kg",
      color: "Olive / White"
    }
  }
];