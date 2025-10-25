import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router';
import SocialLogin from '../Component/SocialLogin';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const axiosInstance = useAxios();

    const onSubmit = async (data) => {
        try {
            // 1. Firebase login
            const result = await logUser(data.email, data.password);
            console.log("Firebase user:", result.user);

            // 2. Axios request to backend
            const res = await axiosInstance.get(`/user/email/${encodeURIComponent(data.email)}`);
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
            <div className="max-w-md mx-auto  border-2 rounded-2xl border-purple-400">
                <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-purple-200">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="text-purple-200 font-medium mb-2 block">Email</label>
                            <input 
                                {...register('email', { required: 'Email required' })} 
                                type="email" 
                                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-300 text-sm mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="text-purple-200 font-medium mb-2 block">Password</label>
                            <input 
                                {...register('password', { required: 'Password required' })} 
                                type="password" 
                                className="w-full bg-purple-900/50 border border-purple-600 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-300 text-sm mt-1 ml-1">{errors.password.message}</p>}
                        </div>

                        {/* Login Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-purple-500 hover:border-purple-400"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-purple-600/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-purple-800/40 text-purple-200">Or continue with</span>
                            </div>
                        </div>
                    </form>

                    {/* Social Login */}
                    <SocialLogin />

                    {/* Register Link */}
                    <p className="text-center mt-6 text-purple-200">
                        New to TaskMonitor?{' '}
                        <Link 
                            className="text-white hover:text-purple-300 underline font-medium transition-colors duration-300" 
                            to="/register"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        
    );
};

export default Login;