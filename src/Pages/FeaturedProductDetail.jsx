import { useParams, useNavigate } from "react-router";
import featuredProducts from "../data/featuredProducts";

export default function FeaturedProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = featuredProducts.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className=" bg-gray-50 py-12 px-4 mt-20 max-w-5xl mx-auto">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="mb-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg shadow-sm transition"
  >
    ← Back
  </button>

  {/* Main Card */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row gap-8">
    {/* Product Image */}
    <div className="lg:w-1/3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover rounded-tr-3xl rounded-tl-3xl lg:rounded-l-3xl lg:rounded-tr-none"
      />
    </div>

    {/* Product Info */}
    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div><strong>Assigned Date:</strong> {product.assignedDate}</div>
          <div><strong>Launched Date:</strong> {product.launchedDate}</div>
          <div><strong>Team Lead:</strong> {product.teamLead}</div>
          <div><strong>Team Members:</strong> {product.teamMembers}</div>
          <div><strong>Current Users:</strong> {product.currentUsers}</div>
          <div><strong>Total Buyers:</strong> {product.totalBuyers}</div>
          <div className="sm:col-span-2">
            <strong>Attached Companies:</strong> {product.attachedCompanies.join(", ")}
          </div>
        </div>
      </div>

      {/* Call-to-action / Stats */}
      <div className="mt-6 flex flex-wrap gap-4">
        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
          {product.currentUsers} Users
        </span>
        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-sm">
          {product.totalBuyers} Buyers
        </span>
      </div>
    </div>
  </div>
</div>

  );
}
