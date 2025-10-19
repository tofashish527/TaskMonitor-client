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
    <div className=" bg-gray-50 pt-25">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title & Sorting Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0 text-center sm:text-left">
            🌟 All Featured Products
          </h1>

          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Newest (Descending)</option>
              <option value="asc">Oldest (Ascending)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              <p className="text-gray-500 text-xs mb-2">
                📅 Launched: {item.launchedDate}
              </p>
              <Link
                to={`/featuredproductdetail/${item.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Show More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



// import featuredProducts from "../data/featuredProducts";
// import { Link } from "react-router";

// export default function AllFeaturedProducts() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-25">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           🌟 All Featured Products
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredProducts.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-48 object-cover rounded-xl mb-4"
//               />
//               <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
//               <p className="text-gray-600 text-sm mb-4">{item.description}</p>
//               <Link
//                 to={`/featuredproductdetail/${item.id}`}
//                 className="text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 Show More →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
