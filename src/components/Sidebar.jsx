import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // <-- UpdateDoc import
import { FaTimes } from "react-icons/fa";

const Sidebar = ({
  toggleSidebar,
  setToggleSidebar,
  fetchProducts,
  editingProduct,
  setEditingProduct,
}) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // If editingProduct is available, pre-fill the form with the product data
  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct); // Pre-fill the form with editingProduct data
    } else {
      setProduct({ title: "", description: "", price: "", image: "" }); // Clear form for new product
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();  // Prevent default form submission

    if (product.title && product.description && product.price && product.image) {
      if (editingProduct) {
        // If in edit mode, update the existing product
        const docRef = doc(db, "products", editingProduct.id);
        await updateDoc(docRef, {
          ...product,
          price: parseFloat(product.price),
        });
      } else {
        // If not in edit mode, add a new product
        await addDoc(collection(db, "products"), {
          ...product,
          price: parseFloat(product.price),
        });
      }

      setProduct({ title: "", description: "", price: "", image: "" });
      setEditingProduct(null);  // Reset the editing mode
      setToggleSidebar(false);  // Close the sidebar
      fetchProducts();  // Reload the products
    }
  };

  if (!toggleSidebar) return null;  // If sidebar is not open, return null

  return (
    <div className="fixed inset-0 z-40 flex" onClick={() => setToggleSidebar(false)}>
      <div className="w-72 bg-white h-full shadow-md z-50 overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Add Product</h2>
          <button
            onClick={() => {
              setToggleSidebar(false);
              setEditingProduct(null);
            }}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>
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
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
      <div className="flex-1 bg-black opacity-30"></div>
    </div>
  );
};

export default Sidebar;
