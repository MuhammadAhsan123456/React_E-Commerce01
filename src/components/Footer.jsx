import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-white border-t mt-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">FakeStore</h3>
          <p className="text-sm text-gray-600">
            Apni daily shopping FakeStore se karein – best prices, guaranteed!
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Products</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Customer Service</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Returns</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Track Order</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">📘</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">📸</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">🐦</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">▶️</a>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
      </div>
    </div>
  </footer>
  </>
  )
}

export default Footer
