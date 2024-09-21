import { Link } from 'react-router-dom';
import logo from 'assets/svg/logo.svg';
import search from 'assets/svg/search.svg';
import course from 'assets/svg/course.svg';
import details from 'assets/svg/details.svg';
import play from 'assets/svg/Play.svg';
import book from 'assets/img/books/Carbonel.jpg'
import book2 from 'assets/img/books/boo2.jpg'

export default function Singlebook() {
    return (
        <div className='flex flex-col p-1'>
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
            <div className="flex flex-row justify-center items-start space-x-6">
               <div className="w-[45rem] bg-white rounded-lg shadow-md p-6">
                <div className="flex">
                    <img src={book} alt="Books" className="w-[13rem] h-[13rem] object-cover rounded-lg shadow-sm" />
                    <div className="ml-4">
                        <h1 className="text-3xl font-bold text-gray-900">The Kingdom of Carbonel</h1>
                        <p className="text-gray-600 mt-1">By Fiersa Besari | 1 Juli 2016</p>
                        <div className="flex items-center mt-2">
                            <span className="text-black-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                            <span className="text-gray-600 ml-2">3.7M Read</span>
                            <span className="text-gray-600 ml-2">9.8K Votes</span>
                        </div>
                        <div className="mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">Buy Now</button>
                            <button className="bg-white text-green-500 px-4 py-2 rounded-lg shadow-md ml-2">Read Book</button>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Plot</h2>
                    <p className="text-gray-600 mt-2">
                    Roy and Carl have spent their whole lives running from the darkness in their past, but when Carl finally returns to make peace with it, the two brothers are inexorably drawn into a reckoning with their own demons.
                    </p>
                </div>

                <div className="mt-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2">Biografi</span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2">AutoBiografi</span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Memoar</span>
                </div>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Additional Information</h2>
                    <ul className="text-gray-600 mt-2">
                        <li>Publisher: <span className="font-medium">Media Fight</span></li>
                        <li>Published Date: <span className="font-medium">1 Juli 2016</span></li>
                        <li>Language: <span className="font-medium">English</span></li>
                        <li>Genre: <span className="font-medium">Romance</span></li>
                        <li>Page: <span className="font-medium">210 Page</span></li>
                    </ul>
                    <button className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">See Comment</button>
                    </div>


                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-green-500 text-center">Similar Books</h2>
                    <div className="w-[24rem] bg-white rounded-lg shadow-md p-2">
                        <div className="mt-4">
                            <div className="flex">
                                <img src={book} alt="Books" className="w-24 h-30 object-cover rounded-lg shadow-sm" />
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">All The Light We Cannot See</h3>
                                    <p className="text-gray-600 mt-1">By Anthony Doerr</p>
                                    <div className="flex items-center mt-2">
                                    <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                    <span className="text-gray-600 ml-2">1,988,288 votes</span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">
                                A delightful story for those who like impossible things to happen in a humdrum world...The children are lively, the grown-ups (including the witch) colourful and the mingling of magic and reality is ... 
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="p-2">
                    <div className="w-[24rem] bg-white rounded-lg shadow-md p-2">
                        <div className="mt-4">
                            <div className="flex">
                                <img src={book2} alt="Books" className="w-24 h-30 object-cover rounded-lg shadow-sm" />
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">All The Light We Cannot See</h3>
                                    <p className="text-gray-600 mt-1">By Anthony Doerr</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                                        <span className="text-gray-600 ml-2">1,988,288 votes</span>
                                    </div>
                                    <p className="text-gray-600 mt-2 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus morbi eleifend enim, tristique...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
            
    </div>

        
    );
}
