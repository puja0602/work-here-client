import React from 'react';
import { Link } from 'react-router-dom';

const Slider = ({image, text}) => {
    return (
        <div className=''>
   <div className="hero h-[600px]" style={{backgroundImage: `url(${image})`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">{text}</p>
      <Link to='/add-job'>
        <button className="btn btn-primary">Post Jobs & Hire Experts</button>
      </Link>
    </div>
  </div>
</div>
</div>
    );
};

export default Slider;