import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaUser, FaComments } from "react-icons/fa";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const messageData = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    try {
      await axiosInstance.post("/messages", messageData);
      Swal.fire({
        icon: "success",
        title: "Message Sent Successfully!",
        text: "Thank you for reaching out. We'll get back to you soon.",
        confirmButtonColor: "#10b981",
        background: '#064e3b',
        color: 'white'
      });
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to send message!",
        text: err.message,
        confirmButtonColor: "#ef4444",
        background: '#064e3b',
        color: 'white'
      });
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-emerald-400" />,
      title: "Our Office",
      details: "House 123, Road 10, Block C\nGreenRoad, Dhaka - 1213\nBangladesh"
    },
    {
      icon: <FaPhone className="text-2xl text-emerald-400" />,
      title: "Phone Number",
      details: "+880 1234 567890"
    },
    {
      icon: <FaEnvelope className="text-2xl text-emerald-400" />,
      title: "Email Address",
      details: "support@taskmonitor.com"
    }
  ];

  return (
    <section className=" bg-emerald-950 py-16 pt-25 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-emerald-300">Touch</span>
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-6">
            Have questions or want to discuss a project? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="bg-gray-500/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700/50 rounded-2xl border border-emerald-600/50 mb-4">
                <FaComments className="text-2xl text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Let's Start a Conversation</h3>
              <p className="text-emerald-100">
                Reach out to us through any of the following channels
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-emerald-200/30 rounded-xl border border-emerald-600/30 hover:border-emerald-500 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-emerald-100 whitespace-pre-line">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-5 p-6 bg-emerald-200/20 rounded-xl border border-emerald-600/30">
              <h4 className="text-lg font-semibold text-white mb-2">Office Hours</h4>
              <p className="text-emerald-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-emerald-100">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-emerald-100 text-sm mt-2">Response Time: Within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-500/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700/50 rounded-2xl border border-emerald-600/50 mb-4">
                <FaPaperPlane className="text-2xl text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
              <p className="text-emerald-100">
                Fill out the form below and we'll get back to you promptly
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaUser className="text-emerald-300 text-sm" />
                  <label className="text-white font-medium">Your Name</label>
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-600 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaEnvelope className="text-emerald-300 text-sm" />
                  <label className="text-white font-medium">Email Address</label>
                </div>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-600 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FaComments className="text-emerald-300 text-sm" />
                  <label className="text-white font-medium">Your Message</label>
                </div>
                <textarea
                  {...register("message", { 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  placeholder="Tell us about your project or inquiry..."
                  rows="6"
                  className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-600 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>

            {/* Privacy Note */}
            <div className="mt-6 text-center">
              <p className="text-emerald-200 text-sm">
                🔒 Your information is safe with us. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;