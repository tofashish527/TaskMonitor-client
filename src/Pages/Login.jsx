
import { useForm } from 'react-hook-form';
import { useNavigate, Link,} from 'react-router';
import SocialLogin from '../Component/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  //const from = useLocation().state?.from?.pathname || '/';

  const onSubmit = data => {
    console.log(data)
    navigate("/");
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
      <p className="mt-4 text-center">
        New here? <Link to="/register">Register instead</Link>
      </p>
    </div>
  );
};

export default Login;
