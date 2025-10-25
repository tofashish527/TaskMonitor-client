import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaCrown } from "react-icons/fa";

const directors = [
  {
    name: "Arian Dsouza",
    position: "CEO & Founder",
    image: "https://i.ibb.co/gF3nMndD/360-F-180802852-C3-Zm4g9av-Bz5os-PEA769d-F0-KKp5c-QZYT.jpg",
  },
  {
    name: "Liam Patel",
    position: "Chief HR Officer",
    image: "https://i.ibb.co/gL2rrbD0/360-F-308948872-JEUvfv5ac-MTa93v3-Aq-Jnr-DPHEYdmid-Xs.jpg",
  },
  {
    name: "Sayef Ahmed",
    position: "Recruitment Head",
    image: "https://i.ibb.co/8Lgs1vwC/business-woman-with-computer-office-1303-22728.jpg",
  },
  {
    name: "Ethan Ray",
    position: "Compliance Lead",
    image: "https://i.ibb.co/zVvfJLy9/360-F-1345127852-kqw-L9-YCAs-OJ6u-YTlftt-Z0hn-PJJVou-Ed-M.jpg",
  },
  {
    name: "Olivia Zhang",
    position: "Talent Manager",
    image: "https://i.ibb.co/zTbp3m8Q/portrait-beautiful-woman-black-suit-standing-front-white-background-portrait-beautiful-woman-black-s.jpg",
  },
  {
    name: "Emma Khan",
    position: "HR Strategist",
    image: "https://i.ibb.co/MykbD2DL/5065ddd0-d7ad-11ec-bffe-13e3a22e7c70.jpg",
  },
  {
    name: "Noah Williams",
    position: "Operations Lead",
    image: "https://i.ibb.co/ycYf1H9K/960x0.jpg",
  },
  {
    name: "Lucas Sen",
    position: "Training Manager",
    image: "https://i.ibb.co/qYKYWr0N/ambition-gets-you-far-i-can-testify-that-portrait-confident-mature-businessman-standing-office-with.jpg",
  },
];

const Director = () => {
  return (
    <section className="py-20  bg-emerald-950" id="director">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-emerald-700 mb-4">
            <FaCrown className="text-emerald-300" />
            <span className="text-emerald-300 uppercase tracking-widest text-sm font-semibold">Our Leadership</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Board Of <span className="text-emerald-300">Directors</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Our team comprises seasoned professionals with diverse backgrounds and expertise. From strategic leadership to operational excellence, our directors are equipped with the knowledge to drive innovation and growth.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {directors.map((person, idx) => (
            <div 
              key={idx} 
              className="group bg-gray-200/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-center border border-emerald-700 hover:border-emerald-500 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-600 group-hover:border-emerald-400 transition-colors duration-300 shadow-lg">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* CEO Badge for first person */}
                {idx === 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    CEO
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mb-4">
                <a href="#" className="w-8 h-8 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <FaFacebookF size={12}/>
                </a>
                <a href="#" className="w-8 h-8 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <FaInstagram size={12}/>
                </a>
                <a href="#" className="w-8 h-8 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <FaLinkedinIn size={12}/>
                </a>
              </div>

              {/* Name and Position */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                {person.name}
              </h3>
              <p className="text-emerald-200 text-sm font-medium">{person.position}</p>
              
              {/* Hover Effect Line */}
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 mt-3 mx-auto"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Director;