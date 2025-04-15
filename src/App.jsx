import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore"; // <-- Yeh line add karo

const App = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // <-- Editing state add karo

  // Fetch products function
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const firebaseData = snapshot.docs.map((doc) => ({
      id: doc.id,  // This is the Firestore ID, which should be a string
      ...doc.data(),
    }));
  
    const response = await fetch("https://fakestoreapi.com/products");
    const apiData = await response.json();
  
    setData([...firebaseData, ...apiData]);
    setLoader(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const deleteProduct = async (id) => {
    console.log("Deleting product with ID: ", id);  // Debugging: check the ID
    
    if (typeof id === 'string' || id instanceof String) { // Check if ID is a string
      await deleteDoc(doc(db, "products", id));
      fetchProducts(); // Reload products after deleting
    } else {
      console.error("Invalid ID format:", id); // Log error if ID is not valid
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
        fetchProducts={fetchProducts}
        editingProduct={editingProduct}  // <-- Pass editingProduct to Sidebar
        setEditingProduct={setEditingProduct} // <-- Pass setEditingProduct to Sidebar
      />

      <div className="flex-1">
        <Header
          onSearch={handleSearch}
          onAddProduct={() => setToggleSidebar(true)}
        />

        <div className="min-h-screen bg-gray-100 p-6">
          {loader ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {filteredData.map((item, index) => (
  <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
    <img className="w-full h-60 object-contain mb-4 bg-gray-100 rounded-lg" src={item.image} alt={item.title} />
    <h2 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h2>
    <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
    <p className="mt-3 font-bold text-xl text-blue-600">${item.price}</p>

    {/* Add Edit and Delete buttons */}
    {item.id && (
      <div className="flex gap-2 mt-4">
        {/* Edit Button */}
        <button
          onClick={() => {
            setEditingProduct(item); // Set the product being edited
            setToggleSidebar(true);  // Open sidebar for editing
          }}
          className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteProduct(item.id)}  // Ensure item.id is correct
          className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    )}
  </div>
))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
