import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Nav = () => {
  const {logout, user, setUser} = useContext(AuthContext)
    const navItems = <>
        <NavLink to='/' className='mr-4'>Home</NavLink>
        <NavLink to='/add-job' className='mr-4'>Add Job</NavLink>
        <NavLink to='/posted-jobs' className='mr-4'>My Posted Jobs</NavLink>
        <NavLink to='/bids' className='mr-4'>My Bids</NavLink>
        <NavLink to-='/requests'>Bid Requests</NavLink>
    </>

    return (
        <div className="navbar bg-base-100 container mx-auto px-10 py-3 font-lato sticky z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl font-bold text-purple-600">Work <span className='text-secondary'>Here</span></a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-base font-medium">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user ? <div className='flex items-center gap-4'>
            {/* <a> */}
            <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" data-tooltip-id={"my-tooltip"} data-tooltip-content={user?.displayName}>
                 <img referrerPolicy='no-referrer' src={user?.photoURL} />
                 <Tooltip id="my-tooltip"/>
                </div>
            </div>
            {/* <Tooltip anchorSelect="#clickable" clickable className=''>
                <button className="btn btn-secondary">Logout</button>
            </Tooltip> */}

            {/* </a> */}
            <button onClick={logout} className="btn btn-outline btn-secondary">Logout</button>
            </div> :
              <div className='mr-4'>
              <NavLink to='/register' className="btn btn-outline border-secondary mr-3">Register</NavLink>
              <NavLink to='/login' className="btn btn-outline border-primary px-6">Login</NavLink>
             </div>
          }

   
        </div>
      </div>
    );
};

export default Nav;