import React from 'react';
import { Link } from 'react-router-dom';

const JobsCard = ({job}) => {
    const {_id, title, category, deadline, description, min_price, max_price, buyer_email} = job || {}
    return (
        <Link to={`/job/${_id}`} className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{category}</h2>
    <div>
    <div className='flex justify-between'>
    <div className="badge badge-primary badge-outline p-6">Min Price: ${min_price}</div>
    <div className="badge badge-secondary badge-outline p-6">Max Price: ${max_price}</div>
    </div>
    {/* <div className="badge badge-accent badge-outline">Deadline: {deadline}</div> */}
    </div>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Bid Now</button>
    </div>
  </div>
</Link>
    );
};

export default JobsCard;