import Widget from "components/widget/Widget";
import { useState, useEffect } from "react";
import { IoDocuments } from "react-icons/io5";

export default function Books() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://learnvistaserver.onrender.com/books')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

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