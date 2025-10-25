import { Link } from "react-router";

const recentProjects = [
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
  }
];

export default function RecentProjects() {
  return (
    <section className="py-16 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent <span className="text-emerald-300">Projects</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Explore our latest innovative solutions and cutting-edge developments
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-600/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-emerald-700 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {project.name}
                </h3>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full border ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-300 border-green-400/30"
                      : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Project Description */}
              <p className="text-emerald-100 mb-6 leading-relaxed">
                {project.about}
              </p>



              {/* Team Lead */}
              <div className="mb-6 p-3 bg-emerald-700/20 rounded-lg border border-emerald-600/20">
                <p className="text-emerald-200 text-sm">
                  <span className="font-semibold text-white">Release Date:</span> {project.releaseDate}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-emerald-200 mb-2">
                  <span>Progress</span>
                  <span>{project.completionRate}%</span>
                </div>
                <div className="w-full bg-emerald-700/50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      project.status === "Completed"
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gradient-to-r from-yellow-400 to-amber-500"
                    }`}
                    style={{ width: `${project.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-emerald-700/50">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View GitHub
                </a>

                <Link
                  to={`/project/${project.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Show Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}