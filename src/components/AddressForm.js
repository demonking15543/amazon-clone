import { useSession } from 'next-auth/client'
import React, { useState } from 'react'

const defaultFields = {
    name: '' ,
    email:'',
    mobile:'',
    address: '',
    orderId:'',
    productIds: [],
    productQuantities:[],
    productSubtoals:[],
    total: ''



}
function AddressForm() {


    const [session, loading] = useSession()
    defaultFields.name=session?.user?.name
    defaultFields.email=session?.user?.email

    const [formFields, setFormFields] = useState(defaultFields)
     
    const {name, email, mobile, address} = formFields;

     const handleChange = (event) =>{
        const {name, value}  = event.target;
        setFormFields({...formFields, [name]:value})
     }

     const submitHandle = (event) => {
        event.preventDefault();
        console.log({...formFields})
     }

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
       for="mobile">
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