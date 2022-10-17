import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectItems } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';

function Checkout() {
  const items = useSelector(selectItems);
  const [session, loading] = useSession()
  return (
    <div className='bg-gray-100'>
        <Header/>
        <main className='lg:flex max-w-screen-2xl mx-auto'>
{/* Left section */}
<div className='flex-grow m-5 shadow-sm'>
    <Image
    src='https://links.papareact.com/ikj'
    width={1024}
    height={250}
    objectFit='contain'
    />
    <div className='flex flex-col p-5 space-y-10 bg-white'>
        <h1 className='text-3xl border-b pb-4'>
          {
            items.length === 0 
            ? "Your Amazon Basket is empty"
            : "Shopping Basket"
          }
          </h1>
          {
            items.map((item)=>
            <CheckoutProduct key={item.id} item={item}/>

            )
          }
    </div>
</div>


{/* Right Section */}
<div>
{
  items.length > 0 && (
    <>
    <h2 className='whitespace-nowrap'>Subtotal ({items.length}) items:
    <span className='font-bold'>
      {/* <Currency currency='INR'/> */}
      </span></h2>
      <button className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
        {!session ? 'Sign In to checkout': 'Checkout'}
      </button>
    </>
  )
}
</div>
        </main>

    </div>
  )
}

export default Checkout;