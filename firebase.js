// import firebase from 'firebase';
import { getFirestore, collection, Timestamp, getDoc, addDoc } from 'firebase/firestore';
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
     await addDoc(collection(db, 'orders'), {
      name,
      email,
      mobile,
      address,
      "items":items,


      created: Timestamp.now()

    })
    onclose()
  } catch (error) {
    console.error(error)
    
  };

 };
