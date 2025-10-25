import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import SocialLogin from '../Component/SocialLogin';
import toast from 'react-hot-toast';
import useAxios from '../Hooks/useAxios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createuser, updateProfileInfo } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('');
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    // Password validation
    if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(data.password)) {
      toast.error('Password must be at least 6 characters, include a capital letter and a special character.');
      return;
    }
    if (data.role === 'Admin') {
      toast.error('Admin role cannot be selected.');
      return;
    }

    // Upload image
  
    // Create user
    try {
      const result = await createuser(data.email, data.password);
      console.log(result)

      console.log(data.email,data.password)
      // Update profile
      await updateProfileInfo({
        displayName: data.name,
        photoURL: profilePic
      });

      // to backend
      const userInfo = {
        name: data.name,
        email: data.email,
        role: data.role,
        bank_account_no: data.bank_account_no,
        salary: parseFloat(data.salary),
        designation: data.designation,
        photo: profilePic,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      await axiosInstance.post('/user', userInfo);
      toast.success('Registration successful!');
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    }
  };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`
        const res = await axios.post(imagUploadUrl, formData)

        setProfilePic(res.data.data.url);

    }

  return (
      <div className="max-w-md mx-auto border-2 rounded-2xl border-purple-400">
        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-purple-200">Join our platform today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <input 
                {...register("name", { required: true })} 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.name && <p className="text-red-300 text-sm mt-1 ml-1">Name is required</p>}
            </div>

            {/* Email Field */}
            <div>
              <input 
                {...register("email", { required: true })} 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.email && <p className="text-red-300 text-sm mt-1 ml-1">Email is required</p>}
            </div>

            {/* Password Field */}
            <div>
              <input 
                {...register("password", { required: true })} 
                type="password" 
                placeholder="Password" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.password && <p className="text-red-300 text-sm mt-1 ml-1">Password is required</p>}
            </div>

            {/* Role Selection */}
            <div>
              <select 
                {...register("role", { required: true })} 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="" className="text-purple-900">Select Role</option>
                <option value="Employee" className="text-purple-900">Employee</option>
                <option value="HR" className="text-purple-900">HR</option>
              </select>
              {errors.role && <p className="text-red-300 text-sm mt-1 ml-1">Role is required</p>}
            </div>

            {/* Bank Account Number */}
            <div>
              <input 
                {...register("bank_account_no", { required: true })} 
                type="text" 
                placeholder="Bank Account Number" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.bank_account_no && <p className="text-red-300 text-sm mt-1 ml-1">Bank account number is required</p>}
            </div>

            {/* Salary */}
            <div>
              <input 
                {...register("salary", { required: true })} 
                type="number" 
                placeholder="Salary" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.salary && <p className="text-red-300 text-sm mt-1 ml-1">Salary is required</p>}
            </div>

            {/* Designation */}
            <div>
              <input 
                {...register("designation", { required: true })} 
                type="text" 
                placeholder="Designation" 
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              />
              {errors.designation && <p className="text-red-300 text-sm mt-1 ml-1">Designation is required</p>}
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="text-purple-200 font-medium mb-2 block">Profile Image</label>
              <input 
                type="file"
                onChange={handleImageUpload}
                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white file:bg-purple-700 file:border-0 file:text-white file:rounded-lg file:px-4 file:py-2 file:mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                placeholder="Your Profile picture" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-purple-500 hover:border-purple-400 mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-purple-200">
            Already have an account?{' '}
            <Link 
              className="text-white hover:text-purple-300 underline font-medium transition-colors duration-300" 
              to="/login"
            >
              Login here
            </Link>
          </p>

          {/* Social Login */}
          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>
      </div>
  );
};

export default Register;