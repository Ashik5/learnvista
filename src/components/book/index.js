export default function BookCard({ Name, AuthorName, Price, imgUrl }) {
    return (
        <div className='relative bg-white p-2 rounded-md shadow-lg shadow-black/5'>
            <img src={imgUrl} alt="Course Cover" className="h-auto rounded" />
            <div className="p-2">
                <div className='flex flex-row justify-between'>
                    <p className="text-green-600 font-bold">{Name}</p>
                    <p className="text-yellow-400 ">★★★★☆</p>
                </div>
                <p className="font-medium ">Author : {AuthorName}</p>
                <p className="text-gray-600 text-sm">Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                <div className="flex justify-between items-center mb-6">
                    <p className='py-1 gap-3'>${Price}</p>
                    <p>1.2k+ Sales</p>
                </div>
                <div className="text-center">
                    <button className="bg-green-500 text-white border-none px-3 py-1 rounded-full cursor-pointer text-lg hover:bg-green-600">Buy Now</button>
                </div>
            </div>
        </div>
    )
}