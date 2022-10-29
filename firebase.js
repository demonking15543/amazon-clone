// import firebase from 'firebase';
import { getFirestore, collection, Timestamp, doc, addDoc, updateDoc  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyBt5sssarlWn7ZtOdCJZwSAvIKPFKJkaQA",
    authDomain: "amzn-1b318.firebaseapp.com",
    projectId: "amzn-1b318",
    storageBucket: "amzn-1b318.appspot.com",
    messagingSenderId: "102506291219",
    appId: "1:102506291219:web:5e5b1fdacffd65051e5fe6"
  };

  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)



 export const  createOrder = async (name, email, mobile, address, items) => {
  try {
     const order = await addDoc(collection(db, 'orders'), {

      name,
      email,
      mobile,
      address,
      "items":items,
      "paymentOrderId":"",
      "paymentId":"",
      "status":"Pending",
      



      created: Timestamp.now()
      

    })
    return order

    
  } catch (error) {
    console.error(error)
    
  };

 };


 export const updateOrderDoc = async (orderId, paymentOrderId, paymentId, status) => {
  try {
    const docRef = doc(db, "orders", orderId)
    await updateDoc(docRef, {
      status,
      paymentId,
      paymentOrderId
    })
    return 
    
  } catch (error) {
    console.log(error)
    
  }

}


