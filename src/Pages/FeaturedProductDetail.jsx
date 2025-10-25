import { useParams, useNavigate } from "react-router";
import featuredProducts from "../data/featuredProducts";

export default function FeaturedProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = featuredProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center px-4">
        <div className="text-center bg-emerald-800/50 backdrop-blur-sm p-8 rounded-2xl border border-emerald-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-emerald-200 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-12 pt-25 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-3 px-6 py-3 bg-emerald-800/50 hover:bg-emerald-700/50 text-white font-semibold rounded-xl border border-emerald-700 hover:border-emerald-500 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        {/* Product Image - Full Width */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Main Content Container */}
        <div className="bg-emerald-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-700 p-8">
          {/* Product Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed max-w-3xl mx-auto">
              {product.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-white">{product.currentUsers}</div>
              <div className="text-emerald-100 text-sm">Active Users</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-white">{product.totalBuyers}</div>
              <div className="text-emerald-100 text-sm">Total Buyers</div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-700/30 rounded-xl p-5 border border-emerald-600/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Assigned Date</h3>
              </div>
              <p className="text-emerald-200">{product.assignedDate}</p>
            </div>

            <div className="bg-emerald-700/30 rounded-xl p-5 border border-emerald-600/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Launched Date</h3>
              </div>
              <p className="text-emerald-200">{product.launchedDate}</p>
            </div>
          </div>

          {/* Team Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-700/30 rounded-xl p-5 border border-emerald-600/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Team Lead</h3>
              </div>
              <p className="text-emerald-200 text-lg font-medium">{product.teamLead}</p>
            </div>

            <div className="bg-emerald-700/30 rounded-xl p-5 border border-emerald-600/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
              </div>
              <p className="text-emerald-200 text-lg font-medium">{product.teamMembers}</p>
            </div>
          </div>

          {/* Attached Companies */}
          <div className="bg-emerald-700/30 rounded-xl p-6 border border-emerald-600/30 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              Attached Companies
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.attachedCompanies.map((company, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-emerald-600/50 text-emerald-100 rounded-lg text-sm border border-emerald-500/30 hover:bg-emerald-500/60 transition-colors duration-300"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-5 bg-emerald-700/30 rounded-xl border border-emerald-600/30 hover:border-emerald-500 transition-colors duration-300">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-white font-semibold mb-2">High Performance</h4>
              <p className="text-emerald-100 text-sm">Optimized for speed and reliability</p>
            </div>
            <div className="text-center p-5 bg-emerald-700/30 rounded-xl border border-emerald-600/30 hover:border-emerald-500 transition-colors duration-300">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="text-white font-semibold mb-2">Secure & Safe</h4>
              <p className="text-emerald-100 text-sm">Enterprise-grade security features</p>
            </div>
            <div className="text-center p-5 bg-emerald-700/30 rounded-xl border border-emerald-600/30 hover:border-emerald-500 transition-colors duration-300">
              <div className="text-3xl mb-3">💼</div>
              <h4 className="text-white font-semibold mb-2">Business Ready</h4>
              <p className="text-emerald-100 text-sm">Trusted by industry leaders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}