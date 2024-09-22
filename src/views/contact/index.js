import { Link } from 'react-router-dom';
import React from 'react';
import cout from 'assets/svg/checkout.svg';
import logo from 'assets/svg/logo.svg';
import Home from 'assets/svg/home.svg';
import about from 'assets/svg/about.svg';

export default function Contact() {
    return (
        <div>
            <nav className="relative w-full py-4 px-6 md:px-12 flex justify-between items-center bg-transparent z-10">
                {/* Left side (logo and menu) */}
                <div className="flex items-center space-x-32">
                    <Link to="/" className="text-2xl font-bold flex items-center space-x-5">
                        <img src={logo} alt="logo" className="h-10" />
                        <p className="font-semibold">
                            Learn<span className="font-medium">Vista</span>
                        </p>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop" className="hover:text-gray-300">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-gray-300">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-gray-300">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right side (Login/Signup) */}
                <div className="flex space-x-8">
                    <button className="text-white/80 hover:text-white hover:scale-110 capitalize">
                        Login
                    </button>
                    <button className="px-6 py-3 bg-black/30 rounded-full text-white/80 hover:text-white hover:bg-black">
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="w-full max-w-md mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Contact Us</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-black font-medium">Message</label>
                        <textarea
                            id="message"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows="4"
                            placeholder="Your Message"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
