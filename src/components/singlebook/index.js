import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/svg/logo.svg';
import book from 'assets/img/books/Carbonel.jpg';
import { useParams } from 'react-router-dom';

export default function SingleBook() {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            console.log(bookId);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`);
                if (!response.ok) {
                    throw new Error('Book not found');
                }
                const data = await response.json();
                setBookData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!bookData) return <p>No book found</p>;

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
                            <a href="#" className="hover:text-gray-300">Home</a>
                        </li>
                        <li>
                            <Link to="shop" className="hover:text-gray-300">Shop</Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Right side (Login/Signup) */}
                <div className="flex space-x-8">
                    <button className="text-white/80 hover:text-white hover:scale-110 capitalize">Login</button>
                    <button className="px-6 py-3 bg-black/30 rounded-full text-white/80 hover:text-white hover:bg-black">Sign Up</button>
                </div>
            </nav>

            <div className="flex flex-row justify-center items-start space-x-6">
                <div className="w-[45rem] bg-white rounded-lg shadow-md p-6">
                    <div className="flex">
                        <img src={bookData.imageUrl || book} alt="Books" className="w-[13rem] h-[13rem] object-cover rounded-lg shadow-sm" />
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold text-gray-900">{bookData.Name}</h1>
                            <p className="text-gray-600 mt-1">By {bookData.authorName} | {new Date(bookData.publishedDate).toLocaleDateString()}</p>
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
                        <p className="text-gray-600 mt-2">{bookData.plot}</p>
                    </div>

                    <div className="mt-4">
                        {bookData.genere}
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Additional Information</h2>
                        <ul className="text-gray-600 mt-2">
                            <li>Publisher: <span className="font-medium">{bookData.publisher}</span></li>
                            <li>Published Date: <span className="font-medium">{new Date(bookData.publishedDate).toLocaleDateString()}</span></li>
                            <li>Language: <span className="font-medium">{bookData.language}</span></li>
                            <li>Genre: <span className="font-medium">{bookData.genre}</span></li>
                            <li>Page: <span className="font-medium">{bookData.pageCount} Page</span></li>
                        </ul>
                        <button className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">See Comment</button>
                    </div>
                </div>

                {/* Similar Books Section */}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-green-500 text-center">Similar Books</h2>
                    {/* Similar book cards can go here */}
                </div>
            </div>
        </div>
    );
}
