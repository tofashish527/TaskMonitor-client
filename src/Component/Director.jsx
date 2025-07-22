import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

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
    <section className="py-20 bg-gray-50" id="director">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div className="mb-6 lg:mb-0">
            <p className="text-indigo-600 uppercase tracking-widest text-sm font-semibold">Our Leadership</p>
            <h2 className="text-4xl font-bold text-gray-800 mt-1">Board Of Director</h2>
          </div>
          <div className="text-gray-600 max-w-2xl text-lg leading-relaxed">
            <p>Our team comprises seasoned HR professionals with diverse backgrounds and expertise. From recruitment specialists to compliance experts, our staff is equipped with the knowledge to address all aspects of human resource management.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {directors.map((person, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-4 text-center">
              <img
                src={person.image}
                alt={person.name}
                className="w-40 h-35 mx-auto rounded object-cover mb-4"
              />
              <div className="flex justify-center gap-1 text-indigo-600 mb-2">
                <a href="#" className="hover:text-indigo-800"><FaFacebookF size={15}/></a>
                <a href="#" className="hover:text-indigo-800"><FaInstagram /></a>
                <a href="#" className="hover:text-indigo-800"><FaLinkedinIn /></a>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Director;
