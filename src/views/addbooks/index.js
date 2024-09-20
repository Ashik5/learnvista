import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import plus from 'assets/svg/plus.svg'

export default function Addbooks() {
    const Router = useNavigate();
    //image upload
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('Choose File');
    const [preview, setPreview] = useState('');
    //description
    const [description, setDescription] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const maxWords = 250;
    //author and title
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [genere, setGenere] = useState("");

    const descriptionChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).length;
        if (words <= maxWords) {
            setDescription(text);
            setWordCount(words);
        }
    };
    const handleClick = () => {
        document.getElementById('customFile').click();
    };

    const fileChange = e => {
        const file = e.target.files[0];
        setFile(file);
        setFilename(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', title);
        formData.append('authorName', author);
        formData.append('description', description);
        formData.append('image', file);
        formData.append('price', 12000);
        formData.append('genere', genere);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/books/`, {
            method: "POST",
            credentials: 'include',
            body: formData,
          }).then((res) => {   
            if (res.status === 201) {
                Router("/admin/books");
            } else {
                console.log("Failed");
            }
           });
          setPreview('');
      };
    return (
        <div className='flex flex-row justify-center gap-10 items-center'>
            <div >
                <div className='flex flex-col p-2 px-3'>
                    <h1 className='font-medium text-xl'>
                        Name
                    </h1>
                    <div className='flex flex-none py-2'>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter the book name here"
                            className="border border-gray-300 rounded-md px-5 py-2 focus:outline-gray-500 transition duration-300 ease-in-out hover:border-gray-500 hover:border-2 mr-1 w-[600px] flex items-center justify-center" />
                    </div>
                </div>

                <div className='flex flex-col p-2 px-3'>
                    <h1 className='font-medium text-xl'>
                        Author's Name
                    </h1>
                    <div className='flex flex-none py-2' >
                        <input
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                            placeholder="Enter the author's name here"
                            className="border border-gray-300 rounded-md px-5 py-2 focus:outline-gray-500 transition duration-300 ease-in-out hover:border-gray-500 hover:border-2 mr-1 w-[600px]" />
                    </div>
                </div>
                <div className='flex flex-col p-2 px-3'>
                    <h1 className='font-medium text-xl'>
                        Genere
                    </h1>
                    <div className='flex flex-none py-2' >
                        <input
                            onChange={(e) => setGenere(e.target.value)}
                            type="text"
                            placeholder="Enter the author's name here"
                            className="border border-gray-300 rounded-md px-5 py-2 focus:outline-gray-500 transition duration-300 ease-in-out hover:border-gray-500 hover:border-2 mr-1 w-[600px]" />
                    </div>
                </div>
                <div className='flex flex-col p-2 px-3'>
                    <h1 className='font-medium text-xl'>
                        Description
                    </h1>
                    <div className='flex flex-none py-2'>
                        <textarea
                            value={description}
                            onChange={descriptionChange}
                            placeholder="Description of the book"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-gray-500 transition duration-300 ease-in-out hover:border-gray-500 hover:border-2 w-[600px] h-[250px] resize-none"
                        />
                    </div>
                    <div className='text-right text-sm text-gray-600'>
                        {wordCount}/{maxWords} words
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className="px-3" >
                        <button onClick={onSubmit} className="bg-black text-white border-none px-5 py-2 rounded-md cursor-pointer hover:bg-green-600">Submit</button>
                    </div>
                    <div className="px-3" >
                        <button className="bg-red-700 text-white border-none px-5 py-2 rounded-md cursor-pointer hover:bg-green-600">Cancel</button>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className="bg-gray-100 flex items-center justify-center rounded-md cursor-pointer w-[300px] h-[450px] hover:bg-gray-200"
                    onClick={handleClick}
                >
                    {preview ? (
                        <img src={preview} alt='Preview' className="w-full h-full object-cover" />
                    ) : (
                        <img src={plus} alt='Plus' />
                    )}
                </button>
                <div className="text-left px-3 py-5 text-center">
                    <input
                        type='file'
                        className='hidden'
                        id='customFile'
                        onChange={fileChange}
                    />
                </div>
            </div>
        </div>
    )
}