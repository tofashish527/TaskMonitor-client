import { useParams, Link } from "react-router";

const allProjects = [
  {
    id: 1,
    name: "Employee Management System",
    stack: ["React", "Node.js", "MongoDB"],
    about:
      "A complete employee management system allowing HRs to track attendance, approve payroll, and monitor team performance.",
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
    about:
      "An app that tracks daily coding progress, allows bookmarking useful resources, and visualizes your weekly productivity.",
    teamMembers: 3,
    teamLead: "Ayesha Rahman",
    completionRate: 100,
    releaseDate: "2025-09-20",
    github: "https://github.com/tofashish527/devquest",
    status: "Completed",
  },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = allProjects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <p className="text-center mt-10">Project not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{project.name}</h1>
      <p className="text-gray-600 mb-4">{project.about}</p>

      <ul className="text-gray-700 space-y-2">
        <li><strong>Tech Stack:</strong> {project.stack.join(", ")}</li>
        <li><strong>Team Lead:</strong> {project.teamLead}</li>
        <li><strong>Team Members:</strong> {project.teamMembers}</li>
        <li><strong>Completion Rate:</strong> {project.completionRate}%</li>
        <li><strong>Release Date:</strong> {project.releaseDate}</li>
        <li><strong>Status:</strong> {project.status}</li>
        <li>
          <strong>GitHub:</strong>{" "}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {project.github}
          </a>
        </li>
      </ul>

      <Link
        to="/"
        className="inline-block mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
