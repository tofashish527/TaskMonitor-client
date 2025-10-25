import { Link } from "react-router";
import featuredProducts from "../data/featuredProducts";

export default function FeaturedProducts() {
  // Show only the first 6 products on the homepage for better grid layout
  const featured = featuredProducts.slice(0, 6);

  return (
    <section className="py-16 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-emerald-300">Products</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-6">
            Discover our innovative solutions and cutting-edge products designed to transform your business
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-500/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 hover:border-emerald-500 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
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
              <p className="text-emerald-100 text-sm leading-relaxed mb-4 line-clamp-2">
                {item.description}
              </p>
              <p className="text-emerald-100 text-lg leading-relaxed mb-4 line-clamp-2">
                Current User : <span className="bg-emerald-200 text-green-950 p-3 rounded-full">{item.currentUsers}</span>
              </p>

              {/* Action Button */}
              <Link
                to={`/featuredproductdetail/${item.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/allfeatured"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            View All Featured Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}