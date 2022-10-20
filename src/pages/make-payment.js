import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import ProductIBasicInfo from '../components/ProductIBasicInfo';
import { selectItems, selectTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import AddressForm from '../components/AddressForm';

function MakePayment() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal)
  const [session, loading] = useSession();

  return (
    <div className='bg-gray-100'>
      <Header/>
      <main className='lg:flex max-w-screen-2xl m-auto'>
        {/* Left Section */}

        <div className='flex-grow m-5 shadow-sm'>
        <Image
    src='https://shorturl.at/kpwz3'
    width={1024}
    height={350}
    objectFit='contain'
    />
    <div className='flex flex-col p-5 bg-white space-y-10'>
      <h1 className='text-2xl border-b pb-4 '>
{
  items.length > 0 ? `Shopping Basket`
  : 
  "Shopping Basket is empty"
}
      </h1>
      {
        items.map((item, i)=>(
          <ProductIBasicInfo key={i} item={item}/>
        ))
      }

    </div>



        </div>
    
        {/* Right Section */}
        <div className='flex flex-col p-5 bg-white space-y-10'>
        {
  items.length > 0 && (
    <>
    <h2 className='whitespace-nowrap'>Total ({items.length}) items: {' '}
    <span className='font-bold'>
      <Currency currency='INR' quantity={total} />
      </span></h2>

      <AddressForm/>
    </>
  )
}

        </div>


      </main>

    </div>
  )
}

export default MakePayment;