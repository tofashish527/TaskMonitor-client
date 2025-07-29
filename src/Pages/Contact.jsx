import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
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
        title: "Message Sent!",
        text: "Your message has been sent to the admin.",
        confirmButtonColor: "#2563eb",
      });
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to send message!",
        text: err.message,
      });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">
       Feel Free To Share!!
      </h2>
      <div className="grid grid-cols-1 p-5 pt-3 md:grid-cols-2 gap-10 items-start bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Address Section */}
        <div className="bg-blue-100 p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-blue-800">Our Office</h3>
          <p className="text-gray-700 font-bold text-2xl">TaskMonitor Lab</p>
          <p className="text-gray-700">
            House 123, Road 10, Block C<br />
            GreenRoad, Dhaka - 1213<br />
            Bangladesh
          </p>
          <p className="text-gray-700">Phone: +880 1234 567890</p>
          <p className="text-gray-700">Email: support@taskmonitor.com</p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-1 bg-white space-y-6"
        >
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-500"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Your Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-500"
          />
          <textarea
            {...register("message", { required: true })}
            placeholder="Your Message"
            rows="5"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
