
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../Component/SocialLogin';


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  
  const onSubmit = data => {
   console.log(data)
   navigate("/")
  };

  

  return (
    <div className="card mx-auto bg-lime-200 max-w-4xl p-6 shadow mt-2">
      <h2 className="text-3xl mb-4 font-bold">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label>Name</label>
          <input {...register('name', { required: 'Name is required' })} type="text" className="input input-bordered w-full" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input {...register('email', { required: 'Email required' })} type="email" className="input input-bordered w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
            validate: {
              hasUpper: v => /[A-Z]/.test(v) || 'Include uppercase',
              hasSpecial: v => /[!@#$%^&*]/.test(v) || 'Include special character'
            }
          })} type="password" className="input input-bordered w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label>Photo</label>
          <input {...register('photo', { required: 'Photo required' })} type="file" accept="image/*" className="input w-full" />
          {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
        </div>

        <div>
          <label>Role</label>
          <select {...register('role', { required: 'Role is required' })} defaultValue="" className="select select-bordered w-full">
            <option value="" disabled>Select role</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>

        <div>
          <label>Bank Account No.</label>
          <input {...register('bank_account_no', { required: 'Bank account is required' })} type="text" className="input input-bordered w-full" />
          {errors.bank_account_no && <p className="text-red-500">{errors.bank_account_no.message}</p>}
        </div>

        <div>
          <label>Salary</label>
          <input {...register('salary', { required: 'Salary is required' })} type="number" className="input input-bordered w-full" />
          {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
        </div>

        <div>
          <label>Designation</label>
          <input {...register('designation', { required: 'Designation is required' })} type="text" className="input input-bordered w-full" />
          {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Register</button>

        <hr className="my-4" />
         </form>
         <SocialLogin></SocialLogin>
         <p className="mt-4 text-center">
        Already Registered? <Link to="/login">Please Login</Link>
      </p>
    </div>
  );
};

export default Register;
