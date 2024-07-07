import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "components/book";

export default function Books() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const fetchData = async (queryName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books?name=${queryName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q') || '';
        setData(null);
        setLoading(true);
        setError(null);
        fetchData(query);
    }, [location.search]);

    if (loading) {
        return <div class="flex justify-center items-center h-screen">
            <div class="relative inline-flex">
                <div class="w-8 h-8 bg-green-500 rounded-full"></div>
                <div class="w-8 h-8 bg-green-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                <div class="w-8 h-8 bg-green-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                {
                    data.map((book) => (
                        <BookCard key={book.id} Name={book.Name} AuthorName={book.authorName} Price={book.price}/>
                    ))
                }
            </div>
        </>
    )
}
