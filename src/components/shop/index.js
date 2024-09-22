import React, { useState, useEffect } from 'react';
import logo from "assets/img/logo.png";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Shop() {
    const navigate = useNavigate();
    const location = useLocation();

    // Profile State
    const [profile, setProfile] = useState(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;

    // Books and Search States
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState("");

    // Filter States
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([12000, 15000]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [availability, setAvailability] = useState(null);

    // Cart States
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Fetch User Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error fetching profile:", errorText);
                    throw new Error(`Failed to fetch profile: ${errorText}`);
                } else {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, [navigate]);

    // Fetch Books Based on Search Query
    const fetchBooksByQuery = async (queryName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books?name=${queryName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFilteredBooks(data);
        } catch (error) {
            console.error('Problem fetching books:', error);
        }
    };

    // Update Books based on search query from URL
    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q') || '';
        setBooks([]);
        fetchBooksByQuery(query);
    }, [location.search]);

    // Fetch All Books on Initial Render
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBooks(data);
                setFilteredBooks(data);
            } catch (error) {
                console.error('Problem fetching all books:', error);
            }
        };
        fetchAllBooks();
    }, []);

    // Fetch Initial Cart from Backend
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/cart`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error fetching cart:", errorText);
                    throw new Error(`Failed to fetch cart: ${errorText}`);
                } else {
                    const data = await response.json();
                    setCart(data.cart); // Corrected to setCart(data.cart)
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };

        fetchCart();
    }, []);

    // Filter Books Based on Selected Filters
    useEffect(() => {
        const filterBooks = () => {
            let updatedBooks = [...books];

            // Filter by category
            if (selectedCategories.length > 0) {
                updatedBooks = updatedBooks.filter(book =>
                    selectedCategories.includes(book.genre) // Ensure correct field name
                );
            }

            // Filter by price range
            updatedBooks = updatedBooks.filter(book =>
                book.price >= priceRange[0] && book.price <= priceRange[1]
            );

            // Filter by rating
            if (selectedRating) {
                updatedBooks = updatedBooks.filter(book =>
                    book.rating >= selectedRating
                );
            }

            // Filter by availability
            if (availability !== null) {
                updatedBooks = updatedBooks.filter(book =>
                    availability ? book.inStock : !book.inStock
                );
            }

            setFilteredBooks(updatedBooks);
            setCurrentPage(1); // Reset to first page after filtering
        };

        filterBooks();
    }, [selectedCategories, priceRange, selectedRating, availability, books]);

    // Pagination Calculations
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Filter Changes
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePriceChange = (e) => {
        setPriceRange([priceRange[0], Number(e.target.value)]);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const handleAvailabilityChange = (isInStock) => {
        setAvailability(isInStock);
    };

    // Add to Cart Function
    const addToCart = async (book) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/add_to_cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'bookId': book._id }),
            });
            if (response.ok) {
                console.log('Book added to cart');
                setCart(prevCart => [...prevCart, book]);
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
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Remove from Cart Function
    const removeFromCart = async (bookId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/remove_from_cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'bookId': bookId }),
            });
            if (response.ok) {
                console.log('Book removed from cart');
                setCart(prevCart => prevCart.filter(book => book.id !== bookId)); // Use correct identifier
            } else {
                console.log('Failed to remove book from cart');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Toggle Cart Visibility
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
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
                                <a href="/home" className=" hover:text-gray-300">
                                    Home
                                </a>
                            </li>
                            <li>
                                <Link to="/home/shop" className=" hover:text-gray-300">
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

                    {/* Right side (Login/Signup or Profile and Cart) */}
                    {profile ?
                        <div className="flex space-x-8 items-center">
                            <button onClick={toggleCart} className="text-white hover:scale-110 capitalize relative">
                                🛒
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                            <button className="p-3 bg-black/30 rounded-full text-white/80 hover:text-white hover:bg-black">
                                {profile.name}
                            </button>
                        </div>
                        :
                        <div className="flex items-center space-x-8">
                            <Link to="/auth/sign-in" className="text-white/80 hover:text-white hover:scale-110 capitalize">Login</Link>
                            <Link to="/auth/sign-in" className="px-6 py-3 bg-black/30 rounded-full text-white/80 hover:text-white hover:bg-black">
                                Sign Up
                            </Link>
                        </div>
                    }
                </nav>

                {/* Hero Section */}
                <div className="flex-1 flex flex-col justify-center items-center py-16 px-6 md:px-12 z-10 gap-10 text-white">
                    <div className='flex flex-col justify-center items-center'>
                        <p className="text-lg mb-2 capitalize">Explore your favourite books 📚</p>
                        <h1 className="text-5xl font-bold mb-4 capitalize w-[50%]">
                            Get your new book with the best price
                        </h1>
                    </div>
                    {/* Search Bar */}
                    <div className="mt-8 flex items-center w-[60%] p-1.5 bg-white border rounded-full text-black">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-6 py-3 w-full rounded-l-full focus:outline-none"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`?q=${e.target.value}`);
                                }
                            }}
                        />
                        <button onClick={() => {
                            navigate(`?q=${search}`);
                        }} className="px-8 py-3 bg-orange-100 hover:bg-orange-200 rounded-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Column: Filters */}
                    <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-4">Filters</h3>

                        {/* Filter by Category */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Category</h4>
                            <ul className="space-y-2">
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => { handleCategoryChange('Fiction') }}
                                            checked={selectedCategories.includes('Fiction')}
                                        />
                                        Fiction
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => { handleCategoryChange('Non-Fiction') }}
                                            checked={selectedCategories.includes('Non-Fiction')}
                                        />
                                        Non-Fiction
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => { handleCategoryChange('Science') }}
                                            checked={selectedCategories.includes('Science')}
                                        />
                                        Science
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => { handleCategoryChange('History') }}
                                            checked={selectedCategories.includes('History')}
                                        />
                                        History
                                    </label>
                                </li>
                            </ul>
                        </div>

                        {/* Filter by Price */}
                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Price Range</h4>
                            <input
                                type="range"
                                min="1000"
                                max="15000"
                                className="w-full"
                                value={priceRange[1]}
                                onChange={(e) => { handlePriceChange(e) }}
                            />
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
                                <li>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="mr-2"
                                            onChange={() => { handleRatingChange(4) }}
                                            checked={selectedRating === 4}
                                        />
                                        4 stars & up
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="mr-2"
                                            onChange={() => { handleRatingChange(3) }}
                                            checked={selectedRating === 3}
                                        />
                                        3 stars & up
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="mr-2"
                                            onChange={() => { handleRatingChange(2) }}
                                            checked={selectedRating === 2}
                                        />
                                        2 stars & up
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="mr-2"
                                            onChange={() => { handleRatingChange(1) }}
                                            checked={selectedRating === 1}
                                        />
                                        1 star & up
                                    </label>
                                </li>
                            </ul>
                        </div>

                        {/* Filter by Availability */}
                        <div>
                            <h4 className="font-medium mb-2">Availability</h4>
                            <ul className="space-y-2">
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => {
                                                if (availability === true) {
                                                    setAvailability(null);
                                                } else {
                                                    setAvailability(true);
                                                }
                                            }}
                                            checked={availability === true}
                                        />
                                        In Stock
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={() => {
                                                if (availability === false) {
                                                    setAvailability(null);
                                                } else {
                                                    setAvailability(false);
                                                }
                                            }}
                                            checked={availability === false}
                                        />
                                        Out of Stock
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Books */}
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {currentBooks.map((book, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border flex flex-col">
                                    <img src={book.imageUrl} alt={book.title} className="mb-4 w-full h-48 object-cover rounded-md" />
                                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                                    <p className="text-gray-500 mb-2">${book.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => addToCart(book)}
                                        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Add to Cart
                                    </button>
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

            {/* Cart Panel */}
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-40"
                        onClick={toggleCart}
                    ></div>

                    {/* Cart Drawer */}
                    <div className="fixed top-0 right-0 w-80 bg-white h-full shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Your Cart</h2>
                            <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800">
                                ✖️
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {cart.map((item, index) => (
                                        <li key={index} className="flex items-center space-x-4">
                                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)} // Use 'id' or '_id' based on your data
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <div className="p-4 border-t">
                                <div className="flex justify-between mb-4">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-semibold">
                                        ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}
