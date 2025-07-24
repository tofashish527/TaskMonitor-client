import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Shared/Logo';
const AuthLayout = () => {
    return (
        <div className=" bg-white">
            <div className='mx-5 mt-10'>
            <Logo></Logo>
            </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="https://i.ibb.co/cSr0JSzW/variety-people-multitasking-3d-cartoon-scene-23-2151294558.jpg"
      className="max-w-xl rounded-lg"
    />
    <Outlet></Outlet>
  </div>
</div>
    );
};

export default AuthLayout;