import React from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { IconButton } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';
import login from '../../assets/images/login2.jpg';
import { useState } from 'react';
import { Icon } from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useContext } from 'react';

const Login = () => {
    const {loginUser, googleLogin, setUser, user, githubLogin} = useContext(AuthContext)
    const [error,setError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const notify = () => toast('Login Successfull');

    /*Toogle Eye Icon*/
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    
    const handleToggle = () =>{
      if(type === 'password'){
        setIcon(eye);
        setType('text');
      }
      else{
        setIcon(eyeOff);
        setType('password');
      }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        const {email,password} = data;
  
        loginUser(email,password)
        .then(result =>{
          if(result.user){
          navigate(location?.state || '/');
          
        }
      })
      .catch(error =>{
          setError(error.message);
      })
        // console.log(data)
      }
  
      const handleGoogleLogin = async () =>{
        try{
          await googleLogin()
          toast.success('Login Successfull')
          navigate(location?.state || '/')
        }
        catch (err){
          setError(error.message);
        }
      }
      const handleGithubLogin = () =>{
        githubLogin()
        .then(result=>{
          if(result.user){
            navigate(location?.state || '/');
          }
        })
        .catch(error =>{
          setError(error.message);
      })
      }
    return (
        <div className="hero max-w-7xl mx-auto border rounded-md mt-8">
  <img className='h-[100vh] md:h-[80vh] lg:h-[80vh] w-full' src={login} alt="" />
        <Helmet>
          <title>Signature Homes|Login</title>
        </Helmet>
  <div className="hero-content flex-col lg:flex-row-reverse lg:gap-10">
    <div className="text-center lg:text-left lg:w-2/4 md:w-2/4">
      <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-white">Login now!</h1>
      <p className="py-2 md:py-6 lg:py-6 text-sm md:text-lg lg:text-lg text-blue-gray-900 playfair-display">Welcome to Signature Homes! Log in to access exclusive features and personalized content. Your gateway to a seamless online experience awaits.</p>
      
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-none md:shadow-2xl lg:shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <label className='input input-bordered flex items-center justify-between gap-2'>
          <input type={type} name="password" placeholder="password" className="" required {...register("password")}/>
            <span onClick={handleToggle} className='opacity-70 cursor-pointer'><Icon icon={icon} size={25}></Icon></span>
          </label>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-3 md:mt-6 lg:mt-6">
          <button className="btn btn-primary">Login</button>
          {
            error && <p className='text-red-500 text-sm mt-1 md:mt-2 lg:mt-2'>You are not registered</p>
          }
          <span className='text-center text-lg'>------------------------ or ------------------------</span>
        </div>
        <div className="flex gap-4 justify-center">
      <IconButton onClick={handleGoogleLogin}className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
      <FaGoogle className='text-lg'/>
        {/* <i className="fab fa-google text-lg" /> */}
      </IconButton>
      <IconButton onClick={handleGithubLogin} className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
      <FaGithub className='text-lg'/>
        {/* <i className="fab fa-github text-lg" /> */}
      </IconButton>
    </div>
    <div className='text-center'>
        <p>New here? Please
            <Link to='/register'>
                <button className="btn btn-link">Register</button>
            </Link>
        </p>
      </div>
      </form>
    </div>
  </div>
</div>

    );
};

export default Login;