import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Pages/Shared/Nav';
import Footer from '../Pages/Shared/Footer';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <div className='min-h-[calc(100vh-526px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;