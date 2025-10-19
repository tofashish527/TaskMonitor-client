import { Link } from "react-router";

const recentProjects = [
  {
    id: 1,
    name: "Employee Management System",
    stack: ["React", "Node.js", "MongoDB"],
    about: "A web app to manage employees, attendance, and payroll securely.",
    teamMembers: 5,
    teamLead: "Tofashish Nujum",
    completionRate: 90,
    releaseDate: "2025-12-10",
    github: "https://github.com/tofashish527/employee-management",
    status: "In Progress",
  },
  {
    id: 2,
    name: "DevQuest Tracker",
    stack: ["React", "Firebase", "Tailwind"],
    about: "Daily coding tracker with resource bookmarking and goal visualization.",
    teamMembers: 3,
    teamLead: "Ayesha Rahman",
    completionRate: 100,
    releaseDate: "2025-09-20",
    github: "https://github.com/tofashish527/devquest",
    status: "Completed",
  },
];

export default function RecentProjects() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Recent Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{project.about}</p>

              <div className="text-sm text-gray-500 mb-3">
                <p><strong>Tech Stack:</strong> {project.stack.join(", ")}</p>
                <p><strong>Team Members:</strong> {project.teamMembers}</p>
                <p><strong>Team Lead:</strong> {project.teamLead}</p>
                <p><strong>Completion Rate:</strong> {project.completionRate}%</p>
                <p><strong>Release Date:</strong> {project.releaseDate}</p>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                🔗 View GitHub
              </a>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>

                <Link
                  to={`/project/${project.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Show More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
