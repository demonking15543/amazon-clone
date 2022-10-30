import React from 'react'
import Item from './Item'
import Currency from 'react-currency-formatter';

function List({order}) {
  return (
    <div className='last:border-none border-b pb-4'>
        <p className='mb-5'>Order id #{order.paymentOrderId}</p>
        {
            order?.items.map((item)=>(
                <Item key={item.id} item={item} />
                
            ))

        }
        <p className='p-10'>Total: <Currency currency='INR' quantity={order.total}/> </p>
        <div className=''>
            <h4 className='text-2xl'>User Details:</h4>
            <p>{order?.name}</p>
            <p>{order?.email}</p>
            <p> +91 {order?.mobile}</p>
            <p>{order?.address}</p>

        </div>


    </div>
  )
}

export default List