
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation,} from 'react-router';
import SocialLogin from '../Component/SocialLogin';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    //const backendBaseURL = "http://localhost:3000";
    const axiosInstance=useAxios();


// const onSubmit = async (data) => {
//   try {
//     // 1. Sign in via Firebase
//     const result = await logUser(data.email, data.password);
//     console.log("Firebase user:", result.user);

//     // 2. Fetch user data from backend by email
//     const res = await fetch(`${backendBaseURL}/user/${encodeURIComponent(data.email)}`);
//     if (!res.ok) throw new Error("Failed to fetch user data");
//     const userData = await res.json();
//     console.log("User data from backend:", userData);

//     // 3. Check if user is fired
//     if (userData?.fired) {
//         await Swal.fire({
//     icon: "error",
//     title: "Access Denied",
//     text: "You have been fired. You cannot log in.",
//     confirmButtonText: "OK",
//   });
//       return; // Stop here; don't navigate
//     }

//     // 4. Navigate to intended page if not fired
//     navigate(from);
//   } catch (error) {
//     console.error(error);
//     toast.error("Login failed. Please check your credentials or account status.");
//   }
// };

  const onSubmit = async (data) => {
    try {
      // 1. Firebase login
      const result = await logUser(data.email, data.password);
      console.log("Firebase user:", result.user);

      // 2. Axios request to backend
      const res = await axiosInstance.get(`/user/${encodeURIComponent(data.email)}`);
      const userData = res.data;
      console.log("User data from backend:", userData);

      // 3. Fired check
      if (userData?.fired) {
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You have been fired. You cannot log in.",
          confirmButtonText: "OK",
        });
        return;
      }

      // 4. Navigate
      navigate(from);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials or account status.");
    }
  };





  return (
    <div className="card mx-auto max-w-4xl bg-lime-200 p-6 shadow mt-2">
      <h2 className="text-3xl mb-4 font-bold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input {...register('email', { required: 'Email required' })} type="email" className="input input-bordered w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input {...register('password', { required: 'Password required' })} type="password" className="input input-bordered w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>


        <button type="submit" className="btn btn-primary w-full">Login</button>
        <hr className="my-4" />
         </form>
          <SocialLogin></SocialLogin>
      <p className="text-center mt-4">
             New to TaskMonitor? <Link className="text-blue-500 underline" to="/register">Register</Link>
           </p>
    </div>
  );
};

export default Login;
