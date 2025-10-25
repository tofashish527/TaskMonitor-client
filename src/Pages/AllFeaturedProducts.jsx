import React, { useState } from "react";
import featuredProducts from "../data/featuredProducts";
import { Link } from "react-router";

export default function AllFeaturedProducts() {
  const [sortOrder, setSortOrder] = useState("desc");

  // Sort products based on launchedDate (string format like "2025-03-15")
  const sortedProducts = [...featuredProducts].sort((a, b) => {
    const dateA = new Date(a.launchedDate);
    const dateB = new Date(b.launchedDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className=" bg-emerald-950 pt-25 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Featured <span className="text-emerald-300">Products</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-6">
            Explore our complete portfolio of innovative products and solutions designed to drive your business forward
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Title & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-emerald-800/50 backdrop-blur-sm rounded-2xl p-2 border border-emerald-700">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-white">
              Product Portfolio
            </h2>
            <p className="text-emerald-200 text-sm mt-1">
              {sortedProducts.length} products available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-emerald-200 font-medium">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-emerald-600 rounded-lg px-4 py-2 bg-emerald-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-500/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-emerald-700 hover:border-emerald-500 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-xl mb-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-xl"></div>
              </div>

              {/* Product Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                {item.name}
              </h3>
              
              <p className="text-emerald-100 text-sm mb-4 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              {/* Launch Date */}
              <div className="flex items-center gap-2 text-emerald-300 text-sm mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Launched: {item.launchedDate}</span>
              </div>
                    <p className="text-emerald-100 text-lg leading-relaxed mb-4 line-clamp-2">
                Current User : <span className="bg-emerald-200 text-green-950 p-3 rounded-full">{item.currentUsers}</span>
              </p>
             

              {/* Action Button */}
              <Link
                to={`/featuredproductdetail/${item.id}`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Product
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}