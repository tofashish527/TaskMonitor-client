import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Marketing Manager at NovaCorp',
    quote: 'Their service was a game-changer for our growth. Exceptional support and lightning-fast response times!',
  },
  {
    id: 2,
    name: 'James Lee',
    title: 'CTO of DevSpark',
    quote: 'The professionalism and attention to detail have been unmatched. We’re proud to be long-term partners.',
  },
  {
    id: 3,
    name: 'Anita Desai',
    title: 'Founder, GreenEarth',
    quote: 'Absolutely incredible team to work with! They’ve helped us scale sustainably and efficiently.',
  },
  {
  id: 4,
  name: 'Michael Thompson',
  title: 'CEO, TechSolutions',
  quote: 'Their innovative approach and dedication have transformed the way we handle logistics. Truly outstanding service.',
},
{
  id: 5,
  name: 'Priya Singh',
  title: 'Operations Head, FreshFarm',
  quote: 'Reliable, efficient, and customer-focused — the team always goes above and beyond to deliver excellence.',
},
{
  id: 6,
  name: 'Carlos Mendez',
  title: 'Supply Chain Manager, GlobalGoods',
  quote: 'Professional and responsive, they have been an integral part of our growth strategy with their seamless support.',
},
];

// Replace with your large left-side image URL
const leftSideImage = 'https://i.ibb.co/GvmPr9hy/photo-1522202176988-66273c2fd55f-auto-format-fit-crop-w-800-q-80.jpg';

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left side large image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={leftSideImage}
            alt="Happy customers"
            className="rounded-lg object-cover w-full h-[450px] lg:h-full"
          />
        </div>

        {/* Right side testimonial section */}
        <div className="w-full lg:w-1/2">
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 mb-12">
              Hear directly from our partners and clients around the world.
            </p>

            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              interval={5000}
              transitionTime={700}
              swipeable
              emulateTouch
              className="relative"
            >
              {testimonials.map(({ id, name, title, quote }) => (
                <div
                  key={id}
                  className="bg-gray-300 shadow-md rounded-xl px-6 py-10 mx-auto max-w-2xl flex items-center gap-6"
                >
                
                  {/* Text content */}
                  <div className="text-left">
                    <p className="text-xl italic text-gray-700 mb-4">“{quote}”</p>
                    <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                    <p className="text-sm text-gray-500">{title}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;


// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const testimonials = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     title: 'Marketing Manager at NovaCorp',
//     image: 'https://randomuser.me/api/portraits/women/44.jpg',
//     quote: 'Their service was a game-changer for our growth. Exceptional support and lightning-fast response times!',
//   },
//   {
//     id: 2,
//     name: 'James Lee',
//     title: 'CTO of DevSpark',
//     image: 'https://randomuser.me/api/portraits/men/32.jpg',
//     quote: 'The professionalism and attention to detail have been unmatched. We’re proud to be long-term partners.',
//   },
//   {
//     id: 3,
//     name: 'Anita Desai',
//     title: 'Founder, GreenEarth',
//     image: 'https://randomuser.me/api/portraits/women/68.jpg',
//     quote: 'Absolutely incredible team to work with! They’ve helped us scale sustainably and efficiently.',
//   },
// ];

// const Testimonials = () => {
//   return (
//     <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
//         <p className="text-lg text-gray-600 mb-12">
//           Hear directly from our partners and clients around the world.
//         </p>

//         <Carousel
//           autoPlay
//           infiniteLoop
//           showThumbs={false}
//           showStatus={false}
//           showIndicators={true}
//           interval={5000}
//           transitionTime={700}
//           swipeable
//           emulateTouch
//           className="relative"
//         >
//           {testimonials.map(({ id, name, title, quote }) => (
//             <div key={id} className="bg-white shadow-md rounded-xl px-6 py-10 mx-auto max-w-2xl">
//               <p className="text-xl italic text-gray-700 mb-6">“{quote}”</p>
//               <div className="items-center">
//                   <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
//                   <p className="text-sm text-gray-500">{title}</p>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;
