import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import success1 from '../assets/img/success1.jpg';
import success2 from '../assets/img/success2.jpg';
import success3 from '../assets/img/success3.jpg';
import banner1 from '../assets/img/Banner1.jpg';

const Banner = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-6 px-4">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        <div className="relative">
          <img
            src={banner1}
            alt="Welcome Banner"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-lg"
          />
        </div>

        <div className="relative">
          <img
            src={success1}
            alt="Global Expansion"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-lg"
          />
          <p className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg sm:text-xl md:text-2xl font-semibold bg-black/50 px-4 sm:px-6 py-1.5 sm:py-2 rounded">
            Expanded to 20+ Countries in 2 Years
          </p>
        </div>

        <div className="relative">
          <img
            src={success2}
            alt="Customer Growth"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-lg"
          />
          <p className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg sm:text-xl md:text-2xl font-semibold bg-black/50 px-4 sm:px-6 py-1.5 sm:py-2 rounded">
            Over 1 Million Happy Customers
          </p>
        </div>

        <div className="relative">
          <img
            src={success3}
            alt="Award Recognition"
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] rounded-lg"
          />
          <p className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg sm:text-xl md:text-2xl font-semibold bg-black/50 px-4 sm:px-6 py-1.5 sm:py-2 rounded">
            Winner of Best Startup Award 2024
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
