import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { createOrder, updateOrderDoc } from '../../firebase'
import { selectItems, selectTotal } from '../slices/basketSlice'
import { useCallback } from "react";
import { useRouter } from 'next/router'


const defaultFields = {
    name: '' ,
    email:'',
    mobile:'',
    address: ''


}

function AddressForm() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal);

    const router = useRouter()
    const [session, loading] = useSession()
    defaultFields.name=session?.user?.name
    defaultFields.email=session?.user?.email

    const [formFields, setFormFields] = useState(defaultFields)
     
    const {name, email, mobile, address} = formFields;

     const handleChange = (event) =>{
        const {name, value}  = event.target;
        setFormFields({...formFields, [name]:value})
     }



     const makePayment = async (orderId) => {
      const res = await initializeRazorpay();
  
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }
  
     
    
      const response = await fetch("/api/razorpay", {
         method: "POST", 
         body: JSON.stringify({
          total
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }

  
        }).then((t) =>
        t.json()
      );

      
    
      var options = {
        key: process.env.Razorpay_PUBLIC_KEY, // Enter the Key ID generated from the Dashboard
        name: "Amazon.in",
        currency: response.currency,
        amount: response.amount,
        order_id: response.id,
        description: "Thankyou for purchasing",
        image: "https://manuarora.in/logo.png",
        handler: function (response) {
          // Validate payment at server - using webhooks is a better idea.
          updateOrderDoc(orderId, response.razorpay_payment_id, response.razorpay_order_id, "success");
          router.push('/order-detail')
       
        },
        prefill: {
          name,
          email,
          contact: mobile,
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    const submitHandle =  async (event) => {
      event.preventDefault();

      const order= await createOrder(name, email, mobile, address, items)
      makePayment(order.id)
   }

    const initializeRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        // document.body.appendChild(script);
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
  
        document.body.appendChild(script);
      });
    };
  
     

    



     

  return (
    <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="Name">
        Name
      </label>
      <input className="shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight 
      focus:outline-none focus:shadow-outline" id="username" type="text" 
      placeholder="Your FullName" value={name}
      name='name'
      onChange={handleChange}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
        Email
      </label>
      <input className="shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
      focus:outline-none focus:shadow-outline" id="password" type="email"
      value={email}
      name='email'
      onChange={handleChange}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="mobile">
        Contact No.
      </label>
      <input className="shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight 
      focus:outline-none focus:shadow-outline placeho" id="mobile" type="text" 
      placeholder="Your mobile number" 
      name='mobile'
      onChange={handleChange}
      required/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="mobile">
        Address
      </label>
      <textarea className="shadow appearance-none border 
      rounded w-full py-2 px-3 text-gray-700 leading-tight 
      focus:outline-none focus:shadow-outline placeho" id="mobile" type="text" 
      placeholder="Please provide Your complete address" 
      name='address'
      onChange={handleChange}
      required></textarea>
    </div>
    <div className="flex items-center justify-between">
    <button 
      onClick={submitHandle}
      className='button mt-2 w-full'>
        Proceed to payment
        </button>

    </div>
  </form>

</div>

  )
}

export default AddressForm