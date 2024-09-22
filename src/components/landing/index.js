import React, { useState, useEffect } from 'react';
import logo from "assets/img/logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate(); // Renamed from 'Router' to 'navigate' for clarity
    const [search, setSearch] = useState("");
    const [profile, setProfile] = useState(null); // Initialized as null for consistency

    // Features Data
    const features = [
        { icon: '🎁', text: 'Free gift wrapping' },
        { icon: '🛍️', text: 'Online ordering' },
        { icon: '📚', text: 'Buy used books' },
        { icon: '🚀', text: 'Returns & exchanges' }, // Corrected typo from 'retures'
        { icon: '📦', text: 'Fast delivery' },
    ];

    // Books Data
    const [cardData, setCardData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        }
        fetchData();
    }, []);

    // Pricing Data
    const pricingData = [
        {
            plan: 'Basic',
            price: '$19/mo',
            features: ['1 User', '10GB Storage', 'Basic Support'],
            buttonText: 'Select Basic',
            color: 'text-black',
        },
        {
            plan: 'Pro',
            price: '$49/mo',
            features: ['5 Users', '50GB Storage', 'Priority Support'],
            buttonText: 'Select Pro',
            color: 'text-[#3b82f6]',
        },
        {
            plan: 'Enterprise',
            price: '$99/mo',
            features: ['Unlimited Users', '200GB Storage', '24/7 Support'],
            buttonText: 'Select Enterprise',
            color: 'text-[#fcd34d]',
        },
    ];

    // Testimonials Data
    const testimonials = [
        {
            name: 'John Doe',
            position: 'CEO, Company A',
            testimonial:
                'This product has significantly improved our workflow and increased overall efficiency. Highly recommend!',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },
        {
            name: 'Jane Smith',
            position: 'Marketing Manager, Company B',
            testimonial:
                'The customer service is exceptional, and the product itself is versatile and easy to use.',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },
        {
            name: 'Emily Johnson',
            position: 'Product Designer, Company C',
            testimonial:
                'I love the intuitive design and functionality. It’s a game-changer for our team!',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },
        // Duplicate testimonials removed for uniqueness
    ];

    // Cart States
    const [cart, setCart] = useState([]); // Holds cart items
    const [isCartOpen, setIsCartOpen] = useState(false); // Controls cart panel visibility

    // Fetch User Profile on Mount
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

    // Fetch Cart Data on Mount
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
                    setCart(data.cart); // Ensure cart is set to an array
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };

        fetchCart();
    }, []);

    // Add to Cart Function
    const addToCart = async (bookId) => { // Changed parameter to bookId
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/add_to_cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'bookId': bookId }), // Send bookId instead of book object
            });
            if (response.ok) {
                console.log('Book added to cart');
                // Fetch the updated cart
                await fetchCart();
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
                method: 'POST', // Using POST as per your backend
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'bookId': bookId }),
            });
            if (response.ok) {
                console.log('Book removed from cart');
                // Fetch the updated cart
                await fetchCart();
            } else {
                const errorData = await response.json();
                console.log('Failed to remove book from cart:', errorData.message);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Function to Fetch Cart (Used in addToCart and removeFromCart)
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
                setCart(data.cart);
            }
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        }
    };

    // Toggle Cart Panel Visibility
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Calculate Total Price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
            {/* Features Section */}
            <div className="py-10 flex flex-col items-center justify-center">
                {/* Container for the cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-center bg-white rounded-lg gap-3 p-8 hover:shadow-xl cursor-pointer border"
                        >
                            {/* Icon inside a circular border */}
                            <div className="w-16 h-16 flex items-center justify-center group-hover:bg-gray-50 cursor-pointer text-white text-3xl rounded-full mb-4 border border-slate-400">
                                {feature.icon}
                            </div>

                            {/* Text below the icon */}
                            <p className="text-gray-800 text-center capitalize w-28">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Most Selling Books Section */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-4 capitalize">
                    Most selling books
                </h1>

                {/* Subheading */}
                <p className="text-md text-center text-gray-700 mb-8 capitalize">
                    Explore our books
                </p>

                {/* Carousel container */}
                <div className="w-full flex justify-center overflow-hidden">
                    <div className="flex space-x-8 overflow-x-auto py-6 scrollbar-hidden">
                        {cardData.map((card, index) => (
                            <div
                                onClick={() => navigate(`singlebook/${card._id}`)}
                                key={index}
                                className="group relative w-fit bg-white shadow-lg shadow-black/5 p-2 rounded-lg text-center rounded-xl cursor-pointer border"
                            >
                                <img src={card.imageUrl} alt="book" className='rounded-md max-w-48' />
                                <div className="absolute top-4 -right-5 text-yellow-400 bg-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                                    ★ {card.rating}
                                </div>
                                <div className="hidden group-hover:flex absolute w-full h-full bg-black/30 bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-6 py-2 justify-center items-center gap-1.5 rounded-xl">
                                    <p className='bg-white px-8 py-2'>${card.price}</p>
                                    <p onClick={() => {
                                        addToCart(card._id); // Pass bookId
                                    }} className='bg-white p-2 hover:bg-black cursor-pointer text-center'>🛒</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link to='shop'>
                    <button className="bg-black py-2 px-4 text-white">See all</button>
                </Link>
            </div>

            {/* Pricing Plans Section */}
            <div className="w-full py-16 flex flex-col items-center">
                {/* Heading */}
                <h2 className="text-4xl font-bold mb-2">Our Pricing Plans</h2>

                {/* Subheading */}
                <p className="text-lg text-gray-600 mb-8">
                    Choose a plan that suits your needs
                </p>

                {/* Price Cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {pricingData.map((plan, index) => (
                        <div
                            key={index}
                            className="bg-white px-16 py-10 rounded-xl border hover:shadow-lg cursor-pointer w-fit text-center flex flex-col space-y-12"
                        >
                            <div>
                                {/* Plan Name */}
                                <h3 className={`text-2xl font-semibold mb-4 ${plan.color}`}>{plan.plan}</h3>

                                {/* Price */}
                                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                            </div>
                            {/* Features */}
                            <ul className="mb-6 space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-600">
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Select Button */}
                            <button className="bg-blue-100 py-2 px-4 rounded-full hover:bg-black hover:text-white">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 space-y-16">
                {/* Heading */}
                <div>
                    <h1 className="text-4xl font-bold text-center mb-4 capitalize">
                        Our testimonials
                    </h1>

                    {/* Subheading */}
                    <p className="text-md text-center text-gray-700 mb-8 capitalize">
                        our clients say about the books reviews and comments
                    </p>
                </div>
                {/* Carousel container */}
                <div className="w-full flex justify-center overflow-hidden">
                    <div className="flex space-x-8 overflow-x-auto py-6 scrollbar-hidden">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group flex flex-col min-w-[500px] bg-white shadow-lg shadow-black/5 p-8 rounded-lg text-center rounded-xl cursor-pointer gap-5"
                            >
                                <div className='flex gap-3'>
                                    <img src={testimonial.image} alt={testimonial.name} className='h-12 w-12 rounded-full border-4 border-green-200/80 object-cover' />
                                    <div className='w-fit flex flex-col items-start'>
                                        <p className='font-semibold text-md capitalize'>{testimonial.name}</p>
                                        <p className='text-gray-500 text-sm capitalize'>{testimonial.position}</p>
                                    </div>
                                </div>
                                <div className='text-start'>
                                    {testimonial.testimonial}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="py-20 flex flex-row items-center justify-center px-10 gap-20 bg-newsletter bg-cover">
                <p className='font-bold text-3xl capitalize w-1/4 text-white'>Subscribe to our newsletter for newest book updates</p>
                <div className="flex items-center bg-white space-x-10">
                    <input
                        type="email"
                        placeholder="Email"
                        className="px-6 py-3 w-full focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-orange-100 hover:bg-black hover:text-white">
                        Subscribe
                    </button>
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
                                                onClick={() => removeFromCart(item.id)} // Use 'id' or '_id' based on your backend
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
                                        ${totalPrice.toFixed(2)}
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
