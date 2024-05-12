import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddJob = () => {
    const [startDate, setStartDate] = useState(new Date());
    const {user} = useContext(AuthContext)
    const job = useLoaderData();
    const navigate = useNavigate()

    const {_id, title, category, deadline, description, min_price, max_price, buyer_email} = job || {}

    const handleFormSubmission = async(e) =>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value
        const email = form.email.value;
        const min_price = parseFloat(form.min_price.value);
        const max_price = form.max_price.value;
        const deadline = startDate
        const description = form.des.value;
        const jobData = {
         title,
         min_price,
         max_price,
         deadline,
         description,
         buyer: {
            email,
            name: user?.displayName,
            photo: user?.photoURL
         }
        }
        try{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/job`, jobData)
        console.log(data)
        toast.success("Job data updated successfully")
        navigate('/posted-jobs')
        }
        catch(err){
          console.log(err.message)
        }
      }
    return (
        <div>
              <div className="hero-content container mx-auto px-6 my-10">
    <div className="card w-full shadow-2xl bg-base-100">
      <form onSubmit={handleFormSubmission} className="card-body">
        <h1 className='text-2xl'>Place your bid</h1>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input type="text" placeholder='Job title' name="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"  name="email" defaultValue={user?.email} className="input input-bordered" required />
        </div>
        </div>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select className="select select-primary w-full max-w-xs" name="category">
            <option disabled selected>Choose category</option>
            <option>Web Design</option>
            <option>Graphics Design</option>
            <option>Digital Marketing</option>
            </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <DatePicker className='input input-bordered' selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        </div>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Minimum Price</span>
          </label>
          <input type="text" name="min_price" placeholder="minimum price" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Maximum Price</span>
          </label>
          <input type="text" name="max_price" placeholder="maximum price" className="input input-bordered" required />
        </div>
        </div>
        <textarea className="textarea textarea-bordered" placeholder="Bio" name="des"></textarea>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Bid</button>
        </div>
        
      </form>
    </div>
</div>
        </div>
    );
};

export default AddJob;