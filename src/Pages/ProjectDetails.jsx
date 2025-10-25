import { useParams, Link } from "react-router";

const allProjects = [
  {
    id: 1,
    name: "SwiftFix",
    stack: ["React", "Node.js", "MongoDB", "Firebase Auth"],
    about: "A full-stack platform for booking and managing local repair services with secure payments and service tracking.",
    teamMembers: 4,
    teamLead: "Tofashish Nujum",
    completionRate: 85,
    releaseDate: "2025-11-15",
    github: "https://github.com/tofashish527/swiftfix",
    status: "In Progress",
    description: "SwiftFix revolutionizes the way people access local repair services by providing a seamless platform that connects customers with trusted service providers. Our platform features real-time booking, secure payment processing, and comprehensive service tracking.",
    features: [
      "Real-time service booking and scheduling",
      "Customer review and rating system",
      "Real-time tracking of service requests",
    ],
    challenges: [
      "Implementing secure payment gateways",
      "Ensuring real-time updates across the platform"
    ]
  },
  {
    id: 2,
    name: "HobbyNest",
    stack: ["React", "Express.js", "MongoDB", "TailwindCSS"],
    about: "A community platform to create, join, and manage hobby groups, share activities, and connect with like-minded people.",
    teamMembers: 3,
    teamLead: "Ayesha Rahman",
    completionRate: 95,
    releaseDate: "2025-10-05",
    github: "https://github.com/tofashish527/hobbynest",
    status: "In Progress",
    description: "HobbyNest brings people together through shared interests and passions. Whether you're into photography, hiking, coding, or cooking, our platform helps you find your tribe and organize meaningful activities.",
    features: [
      "Group creation and management tools",
      "Photo and activity sharing",
      "Location-based group discovery",
    ],
    challenges: [
      "Creating an intuitive group management system",
      "Building a scalable event management system"
    ]
  }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = allProjects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center px-4">
        <div className="text-center bg-emerald-800/50 backdrop-blur-sm p-8 rounded-2xl border border-emerald-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
          <p className="text-emerald-200 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-12 pt-25 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{project.name}</h1>
              <p className="text-emerald-200 text-lg leading-relaxed">{project.about}</p>
            </div>
            <span
              className={`px-6 py-3 text-sm font-semibold rounded-full border ${
                project.status === "Completed"
                  ? "bg-green-500/20 text-green-300 border-green-400/30"
                  : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-emerald-200 mb-2">
              <span>Project Completion</span>
              <span>{project.completionRate}%</span>
            </div>
            <div className="w-full bg-emerald-700/50 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  project.status === "Completed"
                    ? "bg-gradient-to-r from-green-400 to-green-500"
                    : "bg-gradient-to-r from-yellow-400 to-amber-500"
                }`}
                style={{ width: `${project.completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Description */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-emerald-100 leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <ul className="grid gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-emerald-100">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Technical Challenges</h2>
              <ul className="grid gap-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-emerald-100">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-emerald-700/50 text-emerald-200 text-sm rounded-lg border border-emerald-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-4">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-emerald-700/50">
                  <span className="text-emerald-200">Team Lead</span>
                  <span className="text-white font-semibold">{project.teamLead}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-700/50">
                  <span className="text-emerald-200">Team Members</span>
                  <span className="text-white font-semibold">{project.teamMembers}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-700/50">
                  <span className="text-emerald-200">Release Date</span>
                  <span className="text-white font-semibold">{project.releaseDate}</span>
                </div>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-700 p-4">
              <h3 className="text-xl font-bold text-white mb-4">Repository</h3>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}