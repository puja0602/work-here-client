import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const JobDetails = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useContext(AuthContext)
    const job = useLoaderData();
    // console.log(job)
    const {_id, title, category, deadline, description, min_price, max_price, buyer_email} = job || {}

    const handleFormSubmission = async(e) =>{
      e.preventDefault();
      const form = e.target;
      const jobId = _id;
      const email = user?.email;
      if(email === buyer_email) return toast.error("Action not permitted")
      const price = parseFloat(form.price.value);
      if(price<parseFloat(min_price)) return toast.error("Price must be equal to or greater than min price")
      // const buyer_email = buyer_email;
      const comment = form.comment.value;
      const status = "Pending";
      const deadline = startDate

      const bidData = {
        jobId,
        price,
        deadline,
        comment,
        title,
        category,
        email,
        status,
        buyer_email
      }
      try{
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/bid`, bidData)
      console.log(data)
      }
      catch(err){
        console.log(err.message)
      }
    }
    return (
        <div className='flex justify-evenly gap-4 container mx-auto mt-10'>
             <div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title"></h2>
    <div>
    <div className='flex justify-between'>
    <div className="badge badge-primary badge-outline p-6">Min Price: ${min_price}</div>
    <div className="badge badge-secondary badge-outline p-6">Max Price: ${max_price}</div>
    </div>
    {/* <div className="badge badge-accent badge-outline">Deadline: {deadline}</div> */}
    </div>
    <p title={description}>{description.substring(0,70)}.....</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Bid Now</button>
    </div>
  </div>
</div>
  <div className="hero-content">
    <div className="card w-full shadow-2xl bg-base-100">
      <form onSubmit={handleFormSubmission} className="card-body">
        <h1 className='text-2xl'>Place your bid</h1>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" disabled defaultValue={user?.email} name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="text" name="price" placeholder="price" className="input input-bordered" required />
        </div>
        </div>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <input type="text" placeholder="email" name="comment" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <DatePicker className='input input-bordered' selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Bid</button>
        </div>
      </form>
    </div>
</div>
        </div>
    );
};

export default JobDetails;