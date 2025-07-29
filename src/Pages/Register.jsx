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
    <div className="max-w-md bg-lime-200 mx-auto p-5 shadow-md mb-3 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="input input-bordered w-full mb-3" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered w-full mb-3" />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <select {...register("role", { required: true })} className="select select-bordered w-full mb-3">
          <option value="">Select Role</option>
          <option value="Employee">Employee</option>
          <option value="HR">HR</option>
        </select>
        {errors.role && <p className="text-red-500">Role is required</p>}

        <input {...register("bank_account_no", { required: true })} type="text" placeholder="Bank Account Number" className="input input-bordered w-full mb-3" />
        {errors.bank_account_no && <p className="text-red-500">Bank account number is required</p>}

        <input {...register("salary", { required: true })} type="number" placeholder="Salary" className="input input-bordered w-full mb-3" />
        {errors.salary && <p className="text-red-500">Salary is required</p>}

        <input {...register("designation", { required: true })} type="text" placeholder="Designation" className="input input-bordered w-full mb-3" />
        {errors.designation && <p className="text-red-500">Designation is required</p>}
{/* 
        <input {...register("photo", { required: true })} type="file" accept="image/*" className="file-input file-input-bordered w-full mb-3" />
        {errors.photo && <p className="text-red-500">Photo is required</p>} */}

        
                        <label className="label">Profile Image</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="input" placeholder="Your Profile picture" />

        <button type="submit" className="btn btn-primary w-full mt-3">Register</button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link className="text-blue-500 underline" to="/login">Login</Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;
