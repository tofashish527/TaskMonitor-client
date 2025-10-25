import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Shared/Logo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900">
            <div className='container mx-auto px-4 pt-8'>
                <Logo />
            </div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    {/* Image Section */}
                    <div className="flex-1">
                        <div className="bg-purple-800/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-600/50 shadow-2xl">
                            <img
                                src="https://i.ibb.co/cSr0JSzW/variety-people-multitasking-3d-cartoon-scene-23-2151294558.jpg"
                                className="w-full max-w-xl rounded-xl shadow-lg"
                                alt="Team collaboration"
                            />
                        </div>
                    </div>
                    
                    {/* Form Section */}
                    <div className="flex-1 w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;