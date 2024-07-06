import React from 'react';
import logo from 'assets/svg/logo.svg'
import search from 'assets/svg/search.svg'
import course from 'assets/svg/course.svg'
import resources from 'assets/svg/resourcessvg.svg'
import play from 'assets/svg/Play.svg'

export default function Allbooks() {
   
    return (
        
        <div className='flex flex-col p-1' >
            <div>
                <nav >
                    <img src={logo} />
                </nav>
            </div>
            <div className="flex justify-center items-center">
                <div className='text-center'>
                    <img src={resources} alt='Resources'/>  
                </div>  
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                <button class="rounded-lg hover:text-lg bg-green-500 px-3 py-1.5">E-Books</button>
                <button class="rounded-lg px-3 py-1.5">Articles</button>
                <button class="rounded-lg px-3 py-1.5">Videos</button>
                <button class="rounded-lg px-3 py-1.5">Papers</button>
                </div>
                <div className='flex flex-row' >
                <input type="text" placeholder="Search" className="border border-green-500 rounded-l-lg px-4 py-2 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1" />
                    <button type="submit" className="border border-green-500 bg-green-500 hover:bg-green-600 rounded-r-lg px-3 py-2">
                        <img src={search} alt="Search" className="h-4 w-4 text-white" />
                    </button>
                </div>
            </div>
            <div class="flex-1 w-64 bg-white rounded-lg shadow-md p-3 gap-y-2">
                <div className='relative'>
                    <img src={course} alt="Course Image" className="w-full h-auto" />
                    <div className="p-2">
                
                            <p className="flex items-center text-sm mb-3">
                            <img src={play} alt="Lessons Icon" className="h-5 w-5" /> 15 x lessons
                            <span className="bg-green-500 text-white rounded-full px-2 py-1 ml-auto text-xs">Design</span>
                            </p>
                        <div className='flex flex-row justify-between'>
                            <p className="text-green-600 font-bold">DSA Roadmaps</p>
                            <p className="text-yellow-400 ">★★★★☆</p>
                        </div>
                        <p className="font-medium ">Author-Critian lomez</p>
                        <p className="text-gray-600 text-sm">Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                        <div className="flex justify-between items-center mb-6">
                            <p className='py-1 gap-3'>$100.00</p>
                            <p>1.2k+ Students</p>
                        </div>
                        <div className="text-center">
                            <button className="bg-green-500 text-white border-none px-3 py-1 rounded-full cursor-pointer text-lg hover:bg-green-600">Buy Now</button>
                         </div> 
                    </div>
                </div>
            </div>   
        </div>
    );
}
