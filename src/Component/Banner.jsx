import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import success1 from '../assets/img/success1.jpg';
import success2 from '../assets/img/success2.jpg';
import success3 from '../assets/img/success3.jpg';
import banner1 from '../assets/img/Banner1.jpg';

const Banner = () => {
  return (
    <div className=" bg-emerald-950 mx-auto px-4 pt-30 pb-10"> {/* Added pt-20 for spacing below navbar */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={5000}
        transitionTime={800}
        swipeable
        emulateTouch
        stopOnHover={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-800/80 hover:bg-emerald-700 text-white hover:text-emerald-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-emerald-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-800/80 hover:bg-emerald-700 text-white hover:text-emerald-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-emerald-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <li
            className={`inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mx-1 sm:mx-2 cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'bg-emerald-400 scale-125 shadow-lg' 
                : 'bg-emerald-200/60 hover:bg-emerald-300 border border-emerald-400/30'
            }`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            title={label}
            aria-label={label}
          />
        )}
      >
        {/* Slide 1 - Welcome Banner */}
        <div className="relative group">
          <img
            src={banner1}
            alt="Welcome Banner"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/50 to-transparent rounded-xl"></div>
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-left max-w-2xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-2xl">
              Welcome to 
              <span className="block text-emerald-300 mt-1">Our Platform</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-emerald-100 font-light drop-shadow-lg max-w-md">
              Discover excellence in every interaction with our premium services
            </p>
            <button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* Slide 2 - Global Expansion */}
        <div className="relative group">
          <img
            src={success1}
            alt="Global Expansion"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent rounded-xl"></div>
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
            <div className="inline-flex items-center justify-center bg-emerald-500/30 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-3 sm:mb-4 border border-emerald-400/50">
              <span className="text-emerald-200 text-sm font-semibold">🌍 GLOBAL REACH</span>
            </div>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-2xl">
              Expanded to 20+ Countries
            </h3>
            <p className="text-sm sm:text-lg text-emerald-100 font-light drop-shadow-lg">
              Growing worldwide in just 2 years
            </p>
          </div>
        </div>

        {/* Slide 3 - Customer Growth */}
        <div className="relative group">
          <img
            src={success2}
            alt="Customer Growth"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-transparent to-transparent rounded-xl"></div>
          <div className="absolute top-6 sm:top-8 right-4 sm:right-8 text-right max-w-xs sm:max-w-md">
            <div className="bg-emerald-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-400/30 shadow-xl">
              <div className="text-2xl sm:text-4xl font-bold text-emerald-300 mb-1 sm:mb-2">1M+</div>
              <div className="text-white text-base sm:text-lg font-semibold">Happy Customers</div>
              <div className="text-emerald-200 text-xs sm:text-sm mt-1">and counting...</div>
            </div>
          </div>
          <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 text-left">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-2xl">
              Trusted by Millions
            </h3>
            <p className="text-sm sm:text-lg text-emerald-100 font-light drop-shadow-lg max-w-xs sm:max-w-md">
              Join our growing community of satisfied customers
            </p>
          </div>
        </div>

        {/* Slide 4 - Award Recognition */}
        <div className="relative group">
          <img
            src={success3}
            alt="Award Recognition"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/40 to-transparent rounded-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl p-4 sm:p-6 shadow-2xl max-w-xs sm:max-w-md mx-auto border border-emerald-400/30">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">🏆</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Best Startup Award 2024</h3>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Recognized for innovation and excellence in the industry
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;