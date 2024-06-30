import Widget from "components/widget/Widget";
import { useState, useEffect } from "react";
import { IoDocuments } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export default function Books() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const fetchData = async (queryName) => {
        try {
            const response = await fetch(`https://learnvistaserver.onrender.com/books?name=${queryName}`);
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                {
                    data.map((book) => (
                        <Widget
                            key={book.id}
                            icon={<IoDocuments className="h-6 w-6" />}
                            title={book.authorName}
                            subtitle={book.Name}
                        />
                    ))
                }
            </div>
        </>
    )
}
