// import firebase from 'firebase';
import { getFirestore, collection, Timestamp, doc, addDoc, updateDoc, getDoc, setDoc, query, where, getDocs  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'
const config = require("./firebase.config.json")
const firebaseConfig = config

  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)


 export const createUserDocFromAuth = async (userAuth, additional={}) => {
  if(!userAuth)return;
  const userDocRef = doc(db, "users", userAuth?.email);
  const userSnapshort = await getDoc(userDocRef);
  if(!userSnapshort.exists()){
    const {name, email} = userAuth;
    const createdAt = Timestamp.now();
    try {
      await setDoc(userDocRef, {
        name,
        email,
        createdAt,
        ...additional
      });
    } catch (error) {
      console.log("error creatig the user ", error.message);

    }

  }


  return
 }

 export const  createOrder = async (user, name, email, mobile, address, items, total, currency) => {
  try {
     const order = await addDoc(collection(db, 'orders'), {
      user,
      name,
      email,
      mobile,
      address,
      "items":items,
      "paymentOrderId":"",

      "paymentId":"",
      "status":"Pending",

      



      created: Timestamp.now(),
      total,
      currency

      

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
      paymentOrderId,
      deliveryStatus:[status === 'success' ? {
        "status": "Placed",
        created: Timestamp.now() 
      }:null] 
    })
    return 
    
  } catch (error) {
    console.log(error)
    
  }

}



export const getOrdersDocument = async (user)=>{

   const getOrders = query(collection(db, "orders"), where('user', '==', user));
   if(!getOrders) return;
   const orders = [];
   try {
    const getSnapshot = await getDocs(getOrders)

    getSnapshot.forEach((doc)=>{
      orders.push(doc.data())
    })
  
     
    return orders
    
   } catch (error) {
    console.log("Error occured during the fetching orders:", error.message);
   }
}
