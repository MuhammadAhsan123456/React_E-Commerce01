import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ toggleSidebar, setToggleSidebar, fetchProducts }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (product.title && product.description && product.price && product.image) {
      await addDoc(collection(db, "products"), {
        ...product,
        price: parseFloat(product.price),
      });
      setProduct({ title: "", description: "", price: "", image: "" });
      setToggleSidebar(false); // Close sidebar after adding
      fetchProducts(); // Reload products
    }
  };

  // If sidebar is off, return null (nothing rendered)
  if (!toggleSidebar) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex"
      onClick={() => setToggleSidebar(false)} // click on backdrop = close
    >
      {/* Sidebar */}
      <div
  className="w-72 bg-white h-full shadow-md z-50 overflow-y-auto relative"
  onClick={(e) => e.stopPropagation()} // Prevent close on inside click
>
  <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
    <h2 className="text-xl font-bold">Add Product</h2>
    <button
      onClick={() => setToggleSidebar(false)}
      className="text-gray-500 hover:text-red-600 transition"
    >
      <FaTimes size={24} />
    </button>
  </div>

  {/* ✅ Form now has top padding to avoid overlap */}
  <form onSubmit={handleAddProduct} className="p-4 pt-25 space-y-4">
  <h1 className="text-3xl text-blue-600 text-center font-bold">Add product</h1>
    <input
      name="title"
      placeholder="Title"
      value={product.title}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
      required
    />
    <input
      name="description"
      placeholder="Description"
      value={product.description}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
      required
    />
    <input
      name="price"
      placeholder="Price"
      type="number"
      value={product.price}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
      required
    />
    <input
      name="image"
      placeholder="Image URL"
      value={product.image}
      onChange={handleChange}
      className="w-full border px-3 py-2 rounded"
      required
    />
    <button
      type="submit"
      className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add Product
    </button>
  </form>
</div>

      {/* Backdrop */}
      <div className="flex-1 bg-black opacity-30"></div>
    </div>
  );
};

export default Sidebar;
