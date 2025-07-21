import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    text: "ProFast delivery exceeded my expectations. Seamless service!",
    name: "Rafiq Ahmed",
    position: "Warehouse Manager",

  },
  {
    text: "Our business grew fast thanks to their reliable distribution.",
    name: "Lubna Chowdhury",
    position: "Startup Founder",
   
  },
  {
    text: "I love the way ProFast handles same-day deliveries.",
    name: "Shafiul Alam",
    position: "Store Owner",
   
  },
  {
    text: "Friendly riders, timely service – highly recommended.",
    name: "Farzana Hossain",
    position: "Freelancer",
  
  },
  {
    text: "ProFast is now our official logistics partner nationwide.",
    name: "Hasibul Rahman",
    position: "Corporate Manager",
   
  },
  {
    text: "They helped me reach rural customers reliably!",
    name: "Mim Zaman",
    position: "Facebook Seller",
   
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const getIndex = (offset) =>
    (current + offset + testimonials.length) % testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="py-16 px-4 lg:px-20 bg-base-100 text-center relative">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-3">
          What Our Clients Say About Us
        </h2>
        <p className="text-gray-600">
          Trusted by hundreds of businesses across Bangladesh for fast and
          reliable logistics. Hear directly from our valued clients.
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 relative">
        <div
          className="w-[300px] transform scale-90 opacity-40 transition-all duration-300"
          data-aos="flip-left"
        >
          <TestimonialCard testimonial={testimonials[getIndex(-1)]} />
        </div>
        <div
          className="w-[340px] transform scale-100 opacity-100 z-10 transition-all duration-300"
          data-aos="flip-left"
        >
          <TestimonialCard testimonial={testimonials[getIndex(0)]} />
        </div>
        <div
          className="w-[300px] transform scale-90 opacity-40 transition-all duration-300"
          data-aos="flip-left"
        >
          <TestimonialCard testimonial={testimonials[getIndex(1)]} />
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center gap-6">
        <button
          onClick={prev}
          className="btn btn-sm btn-outline text-primary rounded-full"
        >
          <FaArrowLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-primary scale-125" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
        <button
          onClick={next}
          className="btn btn-sm btn-outline text-primary rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <div className="rounded-xl p-6 shadow-lg bg-base-200 text-center">
    <FaQuoteLeft className="text-3xl text-primary mb-4 mx-auto" />
    <p className="text-sm text-gray-700 mb-4">{testimonial.text}</p>
    <div className="border-b border-dashed border-gray-400 w-20 mx-auto mb-4"></div>
    <div className="flex flex-col items-center">
      <h4 className="font-semibold">{testimonial.name}</h4>
      <span className="text-xs text-gray-500">{testimonial.position}</span>
    </div>
  </div>
);

export default Testimonials;
