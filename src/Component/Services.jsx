import React from 'react';
import {
  FaTasks,
  FaChartLine,
  FaUsers,
  FaLock,
  FaTools,
  FaMobileAlt,
  FaShieldAlt,
  FaCloud,
  FaRobot,
  FaHandshake,
  FaGlobe,
  FaDatabase
} from 'react-icons/fa';

const services = [
  {
    icon: <FaTasks className="text-4xl text-violet-600" />,
    title: "Task Management",
    description: "Organize, prioritize, and track your team's tasks effortlessly with real-time collaboration features.",
  },
  {
    icon: <FaTools className="text-4xl text-blue-500" />,
    title: "Custom Software Development",
    description: "Tailored software solutions to meet your business needs and automate workflows.",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-green-500" />,
    title: "Mobile App Development",
    description: "Engaging and scalable mobile applications for both Android and iOS platforms.",
  },
  {
    icon: <FaChartLine className="text-4xl text-orange-500" />,
    title: "Performance Insights",
    description: "Get smart analytics and detailed progress reports to monitor efficiency and productivity.",
  },
  {
    icon: <FaUsers className="text-4xl text-indigo-600" />,
    title: "Team Collaboration",
    description: "Empower teams to communicate, share files, and stay aligned on projects with ease.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-red-500" />,
    title: "Cybersecurity Services",
    description: "Protect your systems and data with top-tier cybersecurity solutions.",
  },
  {
    icon: <FaLock className="text-4xl text-purple-600" />,
    title: "Secure Workspace",
    description: "Protect your data with robust authentication and end-to-end encryption protocols.",
  },
  {
    icon: <FaCloud className="text-4xl text-cyan-600" />,
    title: "Cloud Integration",
    description: "Seamlessly connect your services and infrastructure to the cloud for better scalability and access.",
  },
  {
    icon: <FaRobot className="text-4xl text-emerald-600" />,
    title: "AI Automation",
    description: "Implement AI-driven solutions to streamline repetitive tasks and enhance efficiency.",
  },
  {
    icon: <FaHandshake className="text-4xl text-yellow-600" />,
    title: "Client Consultation",
    description: "Strategic consulting to align our solutions with your business goals and needs.",
  },
  {
    icon: <FaGlobe className="text-4xl text-blue-700" />,
    title: "Global Outreach",
    description: "Expand your business reach with our international digital marketing and growth strategies.",
  },
  {
    icon: <FaDatabase className="text-4xl text-pink-600" />,
    title: "Data Management",
    description: "Efficient data storage, backup, and handling solutions tailored for your enterprise needs.",
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="max-w-6xl px-4 mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12">Empowering productivity with tools built for modern teams.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
