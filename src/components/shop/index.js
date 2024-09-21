import React, { useState, useEffect } from 'react';
import logo from "assets/img/logo.png";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Shop() {
    const Router = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([12000, 15000]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [availability, setAvailability] = useState(null);


    const fetchData = async (queryName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books?name=${queryName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredBooks(data);
        } catch (error) {
            console.log('There was a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q') || '';
        setBooks([]);
        fetchData(query);
    }, [location.search]);

    const addToCart = async (book) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/add_to_cart`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'bookId': book }),
        });
        if (response.ok) {
            console.log('Book added to cart');
        } else {
            if (response.status === 401) {
                console.log('Please login to add to cart');
            }
            else if (response.status === 404) {
                console.log('Book not found');
            }
            else if (response.status === 400) {
                console.log('Book already in cart');
            }
            else {
                console.log('Failed to add book to cart');
            }
        };
    };
    // Filter the books when any filter changes
    useEffect(() => {
        const filterBooks = async () => {
            let updatedBooks = books;
    
            // Filter by category
            if (selectedCategories.length > 0) {
                updatedBooks = updatedBooks.filter(book =>{
                    return selectedCategories.includes(book.genere)}
                );
            }

            // Filter by price range
            updatedBooks = updatedBooks.filter(book => {
                console.log(priceRange);
                return book.price >= priceRange[0] && book.price <= priceRange[1];
            }
            );
    
            setFilteredBooks(updatedBooks);
        };
    
        // Call the asynchronous filter function
        filterBooks();
    }, [selectedCategories,priceRange,books]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBooks(data);
                setFilteredBooks(data); // Initialize filteredBooks with all books
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        }
        fetchData();
    }, []);
    const booksPerPage = 6;

    // Calculate the books to display on the current page
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Calculate total pages
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    // Handle pagination click
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle category filter change
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Handle price range change
    const handlePriceChange = (e) => {
        setPriceRange([1000, e.target.value]);
    };

    // Handle rating change
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    // Handle availability change
    const handleAvailabilityChange = (isInStock) => {
        setAvailability(isInStock);
    };
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
                            onChange={(e)=>{
                                setSearch(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  Router(`?q=${e.target.value}`);
                                }
                            }}
                        />
                        <button onClick={()=>{
                            Router(`?q=${search}`);
                        }} className="px-8 py-3 bg-orange-100 hover:bg-orange-200 rounded-full">
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
                                <li><label><input type="checkbox" className="mr-2" onChange={() => {handleCategoryChange('Fiction')}} /> Fiction</label></li>
                                <li><label><input type="checkbox" className="mr-2" onChange={() => {handleCategoryChange('Non-Fiction')}}/> Non-Fiction</label></li>
                                <li><label><input type="checkbox" className="mr-2" onChange={() => {handleCategoryChange('Science')}}/> Science</label></li>
                                <li><label><input type="checkbox" className="mr-2" onChange={() => {handleCategoryChange('History')}}/> History</label></li>
                            </ul>
                        </div>

                        {/* Filter by Price */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Price Range</h4>
                            <input type="range" min="1000" max="15000" className="w-full" onChange={(e)=>{handlePriceChange(e)}}/>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>$1000</span>
                                <span>$15000</span>
                            </div>
                            <p>{`${priceRange[0]} - ${priceRange[1]}`}</p>
                        </div>

                        {/* Filter by Rating */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Rating</h4>
                            <ul className="space-y-2">
                                <li><label><input type="radio" name="rating" className="mr-2" onChange={()=>{handleRatingChange(4)}}/> 4 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" onChange={()=>{handleRatingChange(3)}}/> 3 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" onChange={()=>{handleRatingChange(2)}}/> 2 stars & up</label></li>
                                <li><label><input type="radio" name="rating" className="mr-2" onChange={()=>{handleRatingChange(1)}}/> 1 star & up</label></li>
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
                            {currentBooks.map((book,index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border">
                                    <img src={book.imageUrl} alt={book.title} className="mb-4 w-full h-48 object-cover rounded-md" />
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