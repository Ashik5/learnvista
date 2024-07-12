import React from 'react';
import add from 'assets/svg/add.svg'
import plus from 'assets/svg/plus.svg'

export default function Addbooks() {
    return (
        <div>
        <div>
            <div className="flex justify-center items-center">
                <div className='text-center'>
                     <img src={add} alt='Addbooks'/>  
                 </div>  
             </div>
        </div>
        <div className='flex flex-row justify-center'>
            <div >
             
             <div className='flex flex-col p-2 px-3'>
                <h1 className='font-medium text-xl'>
                    Books Title
                </h1>
            <div className='flex flex-none py-2'>
                <input 
                type="text" 
                placeholder="The advice from steller space" 
                className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] flex items-center justify-center"  />   
            </div>
            </div>

             <div className='flex flex-col p-2 px-3'>
                <h1 className='font-medium text-xl'>
                    Writer's Name
                </h1>
                <div className='flex flex-none py-2' >
                    <input type="text" placeholder="The name of the author of the book" className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px]" />   
                </div>
             </div>
             <div className='flex flex-col p-2 px-3'>
                <h1 className='font-medium text-xl'>
                    Description
                </h1>
                <div className='flex flex-none py-2' >
                    <input type="text" placeholder="Description of the book" className="border border-green-500 rounded-lg px-10 py-10 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] h-[250px]" />   
                </div>
             </div>
             <div className='flex flex-row'>
                    <div className="text-left px-3" >
                            <button className="bg-green-500 text-white border-none px-3 py-1 rounded-full cursor-pointer text-lg hover:bg-green-600">Summit</button>
                     </div> 
                     <div className="text-left px-3" >
                            <button className="bg-red-500 text-white border-none px-3 py-1 rounded-full cursor-pointer text-lg hover:bg-green-600">Cancel</button>
                     </div> 
             </div>
             
            </div>

            <div className='py-6'>
                <button class="bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer text-lg w-[300px] h-[450px] cursor-pointer text-lg hover:bg-gray-200 ">
                    <img src={plus}/>
                </button>
                <div className="text-left px-3 py-5 text-center" >
                            <button className="bg-green-500 text-white border-none px-3 py-1 rounded-full cursor-pointer text-lg hover:bg-green-600">Upload Cover Photo</button>
                     </div> 
            </div>
        </div>
        </div>    
    )
}