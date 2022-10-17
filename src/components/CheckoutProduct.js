import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';

function CheckoutProduct({item}) {

    return (
    <div className='grid grid-cols-5'>
        <Image
        src={item?.image}
        width={200}
        height={200}
        objectFit="contain"

        />
        {/* Middle */}
        <div className='col-span-3 mx-5'>
            <p>{item?.title}</p>
            <div className='flex'>
                {Array(item?.rating).fill().map((_, i)=>(
                    <StarIcon key={i} className="h-5 text-yellow-500"/>

                ))}
            </div>
            <p className='text-xs my-2 line-clamp-3'>{item?.description}</p>
            <Currency currency='INR' quantity={item?.price}  />
            {
           item?.hasPrime && (
            <div className='flex items-center space-x-2'>
                <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
            </div>
        )
    }

        </div>
        {/* Add And remove Button */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button'>Add To Basket</button>
            <button className='button'>Remove To Basket</button>

        </div>

    </div>
  )
}

export default CheckoutProduct