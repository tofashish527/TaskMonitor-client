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
import { NavLink } from 'react-router';

const services = [
  {
    icon: <FaTasks className="text-3xl text-violet-600" />,
    title: "Task Management",
    description: "Organize, prioritize, and track your team's tasks effortlessly with real-time collaboration features.",
  },
  {
    icon: <FaTools className="text-3xl text-blue-500" />,
    title: "Custom Software Development",
    description: "Tailored software solutions to meet your business needs and automate workflows.",
  },
  {
    icon: <FaMobileAlt className="text-3xl text-green-500" />,
    title: "Mobile App Development",
    description: "Engaging and scalable mobile applications for both Android and iOS platforms.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-red-500" />,
    title: "Cybersecurity Services",
    description: "Protect your systems and data with top-tier cybersecurity solutions.",
  },
  {
    icon: <FaCloud className="text-3xl text-cyan-600" />,
    title: "Cloud Integration",
    description: "Seamlessly connect your services and infrastructure to the cloud for better scalability and access.",
  },
  {
    icon: <FaRobot className="text-3xl text-emerald-600" />,
    title: "AI Automation",
    description: "Implement AI-driven solutions to streamline repetitive tasks and enhance efficiency.",
  },
  {
    icon: <FaHandshake className="text-3xl text-yellow-600" />,
    title: "Client Consultation",
    description: "Strategic consulting to align our solutions with your business goals and needs.",
  },
  {
    icon: <FaGlobe className="text-3xl text-blue-700" />,
    title: "Global Outreach",
    description: "Expand your business reach with our international digital marketing and growth strategies.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-emerald-950" id="services">
      <div className="max-w-7xl px-4 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-emerald-300">Services</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Empowering your business with comprehensive digital solutions designed for modern challenges
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 bg-gray-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-700 hover:border-emerald-500 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="mb-5 flex justify-center">
                <div className="p-4 bg-emerald-900 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg border border-emerald-700">
                  {service.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-emerald-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-emerald-100 text-center text-sm leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover Effect Line */}
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 mt-4 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-emerald-600">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals and drive growth.
            </p>
            <NavLink to='/login' className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started Today
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;