import React from 'react';

const Contact = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white dark:bg-gray-100 p-8 rounded-2xl shadow-xl ring-1 ring-gray-200">
        
        {/* Left Side - Address + Info */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Let’s Connect</h2>
          <p className="text-gray-600 text-lg">
            Have a question or want to discuss something related to employee tasks or performance? Drop a message and we’ll get back to you!
          </p>

          <div className="mt-8 text-gray-700">
            <h4 className="text-xl font-semibold mb-2">Our Address</h4>
            <p>TaskMonitor HR Solutions Ltd.</p>
            <p>123 Business Avenue, Level 4</p>
            <p>Dhaka 1212, Bangladesh</p>
            <p>Email: contact@TaskMonitor.com</p>
            <p>Phone: +880 1234 567890</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              placeholder="How can we assist you?"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-violet-500 focus:border-violet-500"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
