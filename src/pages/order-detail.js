import Image from 'next/image';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectItems, selectTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { getOrdersDocument } from '../../firebase';
import List from '../components/orders/List';

function OrderDetail() {
  const items = useSelector(selectItems);
  const [session, loading] = useSession()
  const router = useRouter();
  const total = useSelector(selectTotal);
  const [orders, setOrders] = useState([])

 useEffect( async () => {
  if(session){
    const getDocument= await getOrdersDocument(session?.user?.email)
    setOrders(getDocument)
  }

 }, [session])
 console.log("Get Orders:", orders)
 
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
            orders.length === 0 
            ? "Your order list is empty"
            : "My Orders"
          }
          </h1>
          {
            orders.map((order)=>
            <List key={order.id} order={order}/>

            )
          }
    </div>
</div>


        </main>

    </div>
  )
}

export default OrderDetail;