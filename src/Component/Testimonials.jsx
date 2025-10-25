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
    quote: 'The professionalism and attention to detail have been unmatched. We\'re proud to be long-term partners.',
  },
  {
    id: 3,
    name: 'Anita Desai',
    title: 'Founder, GreenEarth',
    quote: 'Absolutely incredible team to work with! They\'ve helped us scale sustainably and efficiently.',
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

const leftSideImage = 'https://i.ibb.co/GvmPr9hy/photo-1522202176988-66273c2fd55f-auto-format-fit-crop-w-800-q-80.jpg';

const Testimonials = () => {
  return (
    <div className=" bg-emerald-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side large image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={leftSideImage}
                alt="Happy customers"
                className="rounded-2xl object-cover w-full h-[400px] lg:h-[500px] transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-2xl"></div>
              {/* Overlay Text */}
              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Trusted by Industry Leaders</h3>
                <p className="text-emerald-100">Join thousands of satisfied clients worldwide</p>
              </div>
            </div>
          </div>

          {/* Right side testimonial section */}
          <div className="w-full lg:w-1/2">
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our <span className="text-emerald-300">Clients Say</span>
              </h2>
              <p className="text-lg text-emerald-100 mb-8">
                Hear directly from our partners and clients around the world about their success stories.
              </p>

              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                transitionTime={500}
                swipeable
                emulateTouch
                stopOnHover={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-emerald-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-800/80 hover:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-emerald-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    className={`inline-block w-2 h-2 rounded-full mx-1 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'bg-emerald-400 scale-125' 
                        : 'bg-emerald-200/60 hover:bg-emerald-300'
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
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-400/50 backdrop-blur-sm shadow-xl rounded-xl px-6 py-8 mx-2 border border-emerald-700"
                  >
                    {/* Quote Icon */}
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-700/50 rounded-xl border border-emerald-600/50">
                        <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="text-center">
                      <p className="text-lg italic text-emerald-100 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                      <div className="border-t border-emerald-700/50 pt-4">
                        <h4 className="text-lg font-semibold text-white mb-1">{testimonial.name}</h4>
                        <p className="text-emerald-300 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;