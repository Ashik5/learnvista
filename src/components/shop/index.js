import React, { useState } from 'react';
import logo from "assets/img/logo.png";
import { Link } from 'react-router-dom';
import bookImage from "assets/img/books/boo2.jpg";


const books = [
    { id: 1, title: 'Book 1', price: '$10' },
    { id: 2, title: 'Book 2', price: '$15' },
    { id: 3, title: 'Book 3', price: '$20' },
    { id: 4, title: 'Book 4', price: '$18' },
    { id: 5, title: 'Book 5', price: '$12' },
    { id: 6, title: 'Book 6', price: '$22' },
    { id: 7, title: 'Book 7', price: '$10' },
    { id: 8, title: 'Book 8', price: '$15' },
    { id: 9, title: 'Book 9', price: '$20' },
    { id: 10, title: 'Book 10', price: '$18' },
    { id: 11, title: 'Book 11', price: '$12' },
    { id: 12, title: 'Book 12', price: '$22' },
];

export default function Shop() {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;

    // Calculate the books to display on the current page
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // Calculate total pages
    const totalPages = Math.ceil(books.length / booksPerPage);

    // Handle pagination click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div
                className="min-h-screen bg-cover bg-center relative bg-hero"
            >
                {/* Navbar */}
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

                {/* Hero Section */}
                <div className="relative flex-1 flex flex-col justify-between items-start py-16 px-6 md:px-12 z-10 gap-10 w-[50%]">
                    <div className='h-28'></div>
                    <div>
                        <p className="text-lg  mb-2 capitalize">Explor your favourite books 📚</p>
                        <h1 className="text-5xl font-bold mb-4 capitalize w-[60%]">
                            Get your new book with the best price
                        </h1>
                    </div>
                    {/* Search Bar */}
                    <div className="mt-8 flex items-center w-full p-1.5 bg-white border rounded-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-6 py-3 w-full rounded-l-full focus:outline-none"
                        />
                        <button className="px-8 py-3 bg-orange-100 hover:bg-orange-200 rounded-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Column: Filters */}
                    <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>

                        {/* Filter by Category */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Category</h4>
                            <ul className="space-y-2">
                                <li><label><input type="checkbox" className="mr-2" /> Fiction</label></li>
                                <li><label><input type="checkbox" className="mr-2" /> Non-Fiction</label></li>
                                <li><label><input type="checkbox" className="mr-2" /> Science</label></li>
                                <li><label><input type="checkbox" className="mr-2" /> History</label></li>
                            </ul>
                        </div>

                        {/* Filter by Price */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Price Range</h4>
                            <input type="range" min="10" max="100" className="w-full" />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>$10</span>
                                <span>$100</span>
                            </div>
                        </div>

                        {/* Filter by Rating */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Rating</h4>
                            <ul className="space-y-2">
                                <li><label><input type="radio" name="rating" className="mr-2" /> 4 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" /> 3 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" /> 2 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" /> 1 star & up</label></li>
                            </ul>
                        </div>

                        {/* Filter by Availability */}
                        <div>
                            <h4 className="font-medium mb-2">Availability</h4>
                            <ul className="space-y-2">
                                <li><label><input type="checkbox" className="mr-2" /> In Stock</label></li>
                                <li><label><input type="checkbox" className="mr-2" /> Out of Stock</label></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Books */}
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {currentBooks.map(book => (
                                <div key={book.id} className="bg-white p-4 rounded-lg border">
                                    <img src={bookImage} alt={book.title} className="mb-4 w-full h-48 object-cover rounded-md" />
                                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                                    <p className="text-gray-500 mb-2">{book.price}</p>
                                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add to Cart</button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center space-x-2">
                            <button
                                className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {/* Render page numbers */}
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === number + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    onClick={() => paginate(number + 1)}
                                >
                                    {number + 1}
                                </button>
                            ))}

                            <button
                                className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}