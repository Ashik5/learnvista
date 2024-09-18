import React from "react";
import cout from 'assets/svg/checkout.svg'

export default function Checkout(){
    return(

        <div>
            <div>
                <div className="flex justify-center items-center">
                    <div className='text-center'>
                         <img src={cout} alt='Addbooks'/>  
                    </div>  
                </div>

                <div className='flex flex-row justify-between px-4 py-3'>
                    <div className='flex flex-row gap-2'>
                        <button class="rounded-lg hover:text-lg bg-green-500 px-2.5 py-1.5 font-semibold">Information</button>
                        <button class="rounded-lg px-5 py-3 font-semibold">Payment</button>
                        <button class="rounded-lg px-5 py-3 font-semibold">Complete</button>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col p-4 px-4'>
                        <h1 className='font-medium text-xl'>
                            Full Name
                        </h1>
                        <div className='flex flex-none py-2'>
                            <input 
                            type="text" 
                            placeholder="Antik Dhar" 
                            className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] flex items-center justify-center"  />   
                        </div>
                    </div>

                    <div className='flex flex-col p-2 px-4'>
                        <h1 className='font-medium text-xl'>
                            Phone Number
                        </h1>
                        <div className='flex flex-none py-2'>
                            <input 
                            type="text" 
                            placeholder="01912345678" 
                            className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] flex items-center justify-center"  />   
                        </div>
                    </div>

                    <div className='flex flex-col p-2 px-4'>
                        <h1 className='font-medium text-xl'>
                            Full Address
                        </h1>
                        <div className='flex flex-none py-2'>
                            <input 
                            type="text" 
                            placeholder="Gulshan,Dhaka." 
                            className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] flex items-center justify-center"  />   
                        </div>
                    </div>

                    <div className='flex flex-col p-2 px-4'>
                        <h1 className='font-medium text-xl'>
                            Zip Code
                        </h1>
                        <div className='flex flex-none py-2'>
                            <input 
                            type="text" 
                            placeholder="4000" 
                            className="border border-green-500 rounded-lg px-10 py-4 focus:border-green-600 transition duration-300 ease-in-out hover:border-green-600 mr-1 w-[600px] flex items-center justify-center"  />   
                        </div>
                    </div>

                    <div className="text-left px-4 py-4" >
                            <button className="bg-green-500 text-white border-none px-4 py-2 rounded-lg cursor-pointer text-lg hover:bg-green-600">Proceed</button>
                    </div> 
                </div>
            </div>
        </div>


    )
}