import React from "react";
import cloudy from "../assets/img/Cloudy.jpg";

const Newsletter = () => {
  return (
    <section
      className="relative py-35 px-4 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${cloudy})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-lg mb-6">Get the latest news and content tailored to your interests.</p>

        <form className="flex flex-col sm:flex-row justify-center items-center mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-3  text-gray-800 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-950 text-white font-semibold px-6 py-3 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm">
          Every week we'll send you the latest articles, videos, and podcasts from the HistoryPress team straight into your inbox.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
