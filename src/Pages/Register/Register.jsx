import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useForm } from "react-hook-form";
// import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Icon } from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
    const {registerUser,updateUserProfile,logout} = useContext(AuthContext)
    const [error, setError] = useState("")

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = (data) => {
      const {email,password,name,image, setUser, user} = data;
      const checkPass = /(?=.*[a-z])(?=.*[A-Z])/;
      if(!checkPass.test(password)){
        // console.log("password is invalid");
        setError("Password must have an uppercase and a lowercase letter");
        return;
      }
      if(password.length<6){
        setError("Password must be at least 6 characters");
        return;
      }

      registerUser(email,password)
      .then(() =>{
        updateUserProfile(name,image)
        toast.success("Succesfully Registered")
        // setUser({...user, photoURL: image, displayName: name})
        logout()
        // console.log(result.user);
    })
    .catch(error =>{
        setError(error.message);
    })
      // console.log(data)
    }
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
    return (
<div className="hero min-h-screen bg-blue-gray-50 max-w-7xl mx-auto border rounded-md mt-8">
        <Helmet>
          <title>Signature Homes|Register</title>
        </Helmet>
  <div className="hero-content flex-col lg:flex-row-reverse lg:gap-10">
    <div className="text-center lg:text-left w-2/4">
      <h1 className="text-xl md:text-5xl lg:text-5xl font-bold">Register now!</h1>
      <p className="py-2 md:py-6 lg:py-6 text-sm md:text-lg lg:text-lg text-blue-gray-900 playfair-display6">Become a member today! Sign up now to unlock exclusive content and connect with like-minded individuals.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" {...register("name", { required: true })}/>
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" 
          {...register("email", { required: true })}/>
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">PhotoURL</span>
          </label>
          <input type="text" name="photoURL" placeholder="photoURL" className="input input-bordered" 
          {...register("image", { required: true })}/>
          {errors.image && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <label className='input input-bordered flex items-center justify-between gap-2'>
          <input type={type} name="password" placeholder="password" className="" {...register("password")} required/>
          <span onClick={handleToggle} className='opacity-70 cursor-pointer'><Icon icon={icon} size={25}></Icon></span>
          {
            error && <p className='mt-2 text-red-600'>{error}</p>
          }
          </label>
        </div>

        {/* {
          error && <small className='text-red-500'>{error}</small>
        } */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <p>Already have an account? Please
            <Link to='/login'>
                <button className="btn btn-link">Login</button>
            </Link>
        </p>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;