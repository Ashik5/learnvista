import { Link } from 'react-router-dom';
import React from "react";
import cout from 'assets/svg/checkout.svg'
import logo from 'assets/svg/logo.svg';
import Home from 'assets/svg/home.svg'
import about from 'assets/svg/about.svg'

export default function About(){
    return(

        <div>
            
            <div>
            <nav className="relative w-full py-4 px-6 md:px-12 flex justify-between items-center bg-transparent z-10">
                    {/* Left side (logo and menu) */}
                    <div className="flex items-center space-x-32">
                        <a href="/" className="text-2xl font-bold flex items-center space-x-5">
                            <img src={logo} alt="logo" className="h-10" />
                            <p className='font-semibold'>Learn<span className='font-medium'>Vista</span></p>
                        </a>
                        <ul className="hidden md:flex space-x-6">
                            <li>
                                <a href="#" className=" hover:text-gray-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <Link to="shop" className=" hover:text-gray-300">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-gray-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-gray-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right side (Login/Signup) */}
                    <div className="flex space-x-8">
                        <button className="text-white/80 hover:text-white hover:scale-110 capitalize">Login</button>
                        <button className="px-6 py-3 bg-black/30 rounded-full text-white/80 hover:text-white hover:bg-black">
                            Sign Up
                        </button>
                    </div>
            </nav>
            <div className="flex flex-col p-1">
            <img src={Home} alt="Home" className="object-cover rounded-lg shadow-sm" />
            <img src={about} alt="About" className="object-cover rounded-lg shadow-sm" />

            </div>
        </div>
    </div>
    )
}