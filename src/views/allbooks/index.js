import React, { useState } from 'react';
import logo from "assets/img/logo.png";
import book from "assets/img/books/Carbonel.jpg";
import book2 from "assets/img/books/boo2.jpg";
export default function Allbooks() {
    const features = [
        { icon: '🎁', text: 'Free gift wrapping' },
        { icon: '🛍️', text: 'online ordering' },
        { icon: '📚', text: 'Buy used books' },
        { icon: '🚀', text: 'retures & exchanges' },
        { icon: '📦', text: 'fast delivery' },
    ];
    const cardData = [
        { title: 'Card 1', content: 'Content for card 1', rating: 4.5 },
        { title: 'Card 2', content: 'Content for card 2', rating: 4.5 },
        { title: 'Card 3', content: 'Content for card 3', rating: 4.5 },
        { title: 'Card 4', content: 'Content for card 4', rating: 4.5 },
        { title: 'Card 5', content: 'Content for card 5', rating: 4.5 },
    ];
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
        {
            name: 'Emily Johnson',
            position: 'Product Designer, Company C',
            testimonial:
                'I love the intuitive design and functionality. It’s a game-changer for our team!',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },
        {
            name: 'Emily Johnson',
            position: 'Product Designer, Company C',
            testimonial:
                'I love the intuitive design and functionality. It’s a game-changer for our team!',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },
        {
            name: 'Emily Johnson',
            position: 'Product Designer, Company C',
            testimonial:
                'I love the intuitive design and functionality. It’s a game-changer for our team!',
            image: 'https://i.insider.com/63fd39bcd5d80a0018276def?width=800&format=jpeg&auto=webp',
        },

    ];

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
                                <a href="#" className=" hover:text-gray-300">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className=" hover:text-gray-300">
                                    Services
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
                                key={index}
                                className="group relative min-w-[300px] bg-white shadow-lg shadow-black/5 p-2 rounded-lg text-center rounded-xl cursor-pointer"
                            >
                                <img src={book2} alt="book" className='rounded-md' />
                                <div className="absolute top-4 -right-5 text-yellow-400 bg-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                                    ★ {card.rating}
                                </div>
                                <div className="hidden group-hover:flex absolute w-full h-full bg-black/30 bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-6 py-2 justify-center items-center gap-1.5 rounded-xl">
                                    <p className='bg-white px-8 py-2'>$20</p>
                                    <p className='bg-white p-2 hover:bg-black'>🛒</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <a>
                    <button className="bg-black py-2 px-4 text-white">See all</button>
                </a>
            </div>
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
                                    <img src={testimonial.image} className='h-12 w-12 rounded-full border-4 border-green-200/80 object-cover' />
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
            <div className="py-20 flex flex-row items-center justify-center px-10 gap-20 bg-newsletter bg-cover">
                <p className='font-bold text-3xl capitalize w-1/4 text-white'>Subscribe to our newsletter for newest book updates</p>
                <div className="flex items-center bg-white space-x-10">
                    <input
                        type="text"
                        placeholder="Email"
                        className="px-6 py-3 w-full focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-orange-100 hover:bg-black hover:text-white">
                        subscribe
                    </button>
                </div>
            </div>
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
