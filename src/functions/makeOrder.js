import { db } from '../firebase';
import { addDoc, collection} from "firebase/firestore"

export const makeOrder = async(formatedData) => {
  
  try {
    console.log('Adding new order to database')
    const orderData = formatedData
    console.log(orderData)
    try {
      await addDoc(collection(db, "orders"), orderData);
    } catch (e) {
      console.error("Error adding document #2: ", e);
    }
  } catch (error) {
    console.error("Error adding document #1: ", error);
  }
} 