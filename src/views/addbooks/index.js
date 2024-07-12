import React from 'react';
import add from 'assets/svg/add.svg'

export default function Addbooks() {
    return (
        <div>
             <div className="flex justify-center items-center">
                <div className='text-center'>
                     <img src={add} alt='Addbooks'/>  
                 </div>  
             </div>
             <div className='flex flex-col p-2 px-3'>
                <h1>
                    Books Title
                </h1>
            <div className='flex flex-none'>
                <input 
                type="text" 
                placeholder="The advice from steller space" 
                className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-120"  />   
            </div>
            </div>

             <div className='flex flex-col p-2 px-3'>
                <h1>
                    Writer's Name
                </h1>
                <div className='flex flex-none' >
                    <input type="text" placeholder="The name of the author of the book" className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-120" />   
                </div>
             </div>
             <div className='flex flex-col p-2 px-3'>
                <h1>
                    Description
                </h1>
                <div className='flex flex-none' >
                    <input type="text" placeholder="Description of the book" className="border border-green-500 rounded-lg px-10 py-10 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-120" />   
                </div>
             </div>
        </div>
       
        
    )
}