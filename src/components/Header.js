import React from 'react';
import Image from "next/image";
import {MenuIcon,
SearchIcon,
ShoppingCartIcon
 } from "@heroicons/react/outline";
function Header() {
  return (
    
    <header>
      <div className='flex items-center bg-amazon_blue
      p-1 flex-grow py-2'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
          src='https://links.papareact.com/f90'
          width={150}
          height={40}
          className="cursor-pointer" 
          objectFit='contain'/>
        </div>
        {/* Search */}
        <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
          <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />
           <SearchIcon className='h-12 p-4' />
        </div>
        {/* Right */}
        <div className='text-white flex items-center 
        text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className='link'>
            <p>hello vijay rajput</p>
            <p>Account & Lists</p>
          </div>
          <div className='link'>
            <p>Returns</p>
            <p>orders</p>
          </div>
          <div className='link'>
            <ShoppingCartIcon className='h-10'/>
            <p>basket</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header