import React from 'react';
import logo from "assets/img/logo.png";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from 'components/landing';
import Shop from 'components/shop';
import Singlebook from 'components/singlebook'

export default function Home() {
    return (
        <>
            <Routes>
                <Route path="shop" element={<Shop />} />
                <Route path="/singlebook/:bookId" element={<Singlebook />} />
                <Route path="/" element={<Landing />} />
                
            </Routes>
            <footer className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Column 1: Company Logo and Description */}
                        <div className='flex flex-col gap-5 items-start'>
                            <div className='flex justify-center items-center gap-3'>
                                <img src={logo} alt="Company Logo" className="w-10" />
                                <p className='font-semibold'>Learn<span className='font-medium'>Vista</span></p>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Our company provides innovative solutions to help businesses grow
                                and thrive in the digital world. We are committed to delivering
                                excellence through our services.
                            </p>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className='w-fit'>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-black">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Services</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Blog</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Resources */}
                        <div className='w-fit'>
                            <h3 className="text-lg font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-black">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Terms of Service</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">FAQs</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Social Media */}
                        <div className='w-fit'>
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-black">Facebook</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Twitter</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">LinkedIn</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-black">Instagram</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer Section */}
                    <div className="mt-8 pt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} LearnVista. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};
