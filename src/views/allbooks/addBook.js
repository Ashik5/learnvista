import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddBook() {
    const Router = useNavigate();
    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const addBook = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/books/`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: bookName,
                authorName: author,
                price: price,
            }),
        }).then((res) => {
            if (res.status === 201) {
                Router("/admin/books");
            } else {
                console.log("Failed");
            }
        })
    }
    return (
        <>
            <h1>Adding Books</h1>
            <input onChange={(e) => { setBookName(e.target.value) }} type="text" placeholder="Book Name" className="mb-4 w-full rounded-xl border border-gray-200 p-3 text-sm font-medium text-gray-600 dark:border-navy-700 dark:bg-navy-800 dark:text-white" />
            <input onChange={(e) => { setAuthor(e.target.value) }} type="text" placeholder="Author" className="mb-4 w-full rounded-xl border border-gray-200 p-3 text-sm font-medium text-gray-600 dark:border-navy-700 dark:bg-navy-800 dark:text-white" />
            <input onChange={(e) => { setPrice(e.target.value) }} type="number" placeholder="Price" className="mb-4 w-full rounded-xl border border-gray-200 p-3 text-sm font-medium text-gray-600 dark:border-navy-700 dark:bg-navy-800 dark:text-white" />
            <button onClick={addBook}>Add The Book</button>
        </>
    );
}