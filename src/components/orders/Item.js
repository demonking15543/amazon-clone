import { StarIcon } from '@heroicons/react/outline'
import Currency from 'react-currency-formatter';
import React from 'react'
import Image from 'next/image';


function Item({item}) {
    console.log("orderssss", item)

  return (
    <div className='grid grid-cols-5 p-5'>
        <Image src={item.image} width={100} height={20}
        objectFit='contain'/>
          <div className="col-span-3 mx-5">
            <p>{item.title}</p>
            <div className='flex'>
                {
                   Array(item.rating).fill().map((_, i)=>(
                    <StarIcon key={i} className='h-5 text-yellow-500'/>
                   ))
                }

            </div>
            <div className='flex'>
                <span className='mr-2'>{item.quantity} X</span> 
                <Currency currency='INR' quantity={item.price}/>


            </div>
            <p>Subtotal: <Currency currency='INR' quantity={item.subtotal}/></p>
        
            

    </div>
        
    </div>
  )
}

export default Item