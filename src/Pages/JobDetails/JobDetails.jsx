import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const JobDetails = () => {
    const {user} = useContext(AuthContext)
    const job = useLoaderData();
    // console.log(job)
    const {_id, title, category, deadline, description, min_price, max_price, buyer_email} = job || {}
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
      <form className="card-body">
        <h1 className='text-2xl'>Place your bid</h1>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" disabled defaultValue={user?.email} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input type="number" placeholder="password" className="input input-bordered" required />
        </div>
        </div>
        <div className='flex items-center gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <input type="date" placeholder="password" className="input input-bordered" required />
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