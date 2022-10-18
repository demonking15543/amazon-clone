import {MinusIcon, StarIcon } from '@heroicons/react/solid'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'

import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { removeFromBasket, addToBasket, decrementItemQTYFromBasket } from '../slices/basketSlice';

function CheckoutProduct({item}) {
    const { id } =  item;
    const dispatch = useDispatch();
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))

    }
    const incrementQuantity = () => {
        dispatch(addToBasket(item))

    }
    const decrementQuantity = () => {
        dispatch(decrementItemQTYFromBasket({id}))

    }





    return (
    <div className='grid grid-cols-5'>
        <Image
        src={item?.image}
        width={200}
        height={200}
        objectFit="contain"

        />
        {/* Middle */}
        <div className='col-span-4 md:col-span-3 mx-5'>
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
            <div className={`flex flex-inline space-x-2 my-auto justify-self-end ${!item.hasPrime? 'mt-4': null }` }>
                <span onClick={decrementQuantity} className="p-4 bg-gray-100 rounded-full cursor-pointer"><MinusIcon height={20}/></span>
                <input className="block p-2  text-center quantity text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="number " value={item.quantity}  readOnly={true}  />

                <span onClick={incrementQuantity} className="p-4 bg-gray-100 rounded-full cursor-pointer" ><PlusIcon height={20}/></span>

            </div>
            <div className='py-4  md:text-right'>
            Subtotal:{" "} <Currency currency='INR' quantity={item.subtotal}/>



            </div>


        </div>
        {/* Add And remove Button */}
        <div className='hidden md:addAndRemoveButton'>
            <div className='top-0 right-0'>

            </div>

            <button onClick={incrementQuantity} className='button'>Add To Basket</button>
            <button onClick={removeItemFromBasket} className='button'>Remove From Basket</button>

        </div>
          {/* <div className='flex flex-col  space-y-2 my-auto justify-self-end'>
                <span onClick={decrementQuantity} className="p-2 bg-gray-100 rounded-full cursor-pointer"><TrashIcon height={20}/></span>
                <input className="block p-2  text-center quantity text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="number " value={item.quantity}  readOnly={true}  />

                <span onClick={incrementQuantity} className="p-2 bg-gray-100 rounded-full cursor-pointer" ><PlusIcon height={20}/></span>
                <div className='right-0'>{item.subtotal}</div>

            </div> */}
            

    </div>
  )
}

export default CheckoutProduct