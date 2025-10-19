import { Link } from "react-router";
import featuredProducts from "../data/featuredProducts";

export default function FeaturedProducts() {
  // Show only the first 5 products on the homepage
  const featured = featuredProducts.slice(0, 5);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with All Featured Projects button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            🌟 Featured Products
          </h2>
          <Link
            to="/allfeatured"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            All Featured Projects →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
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
    </section>
  );
}
