import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';
function ProductIBasicInfo({item}) {
  return (
    <div className='grid grid-cols-5'>
        <Image src={item.image} width={200} height={200}
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
            <p>Subtotal: <Currency currency='INR' quantity={item.subtotal}/>
</p>
        
            
    
    </div>
        
    </div>
  )

}

export default ProductIBasicInfo