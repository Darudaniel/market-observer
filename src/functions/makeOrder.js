import { db } from '../firebase';
import { doc, setDoc} from "firebase/firestore"

export const makeOrder = (formatedData) => {
  try {
    console.log('Adding new order to database')
    const orderData = formatedData
    setDoc(doc(db, "orders", orderData.id), orderData)
      .then(() => {
        console.log("Order registered successfully");
        // router.push('/success/1')
      })
      .catch((error) => {
        console.error("Error 2 catch", error);
      });
  } catch (error) {
    console.error("Error 1 catch", error);
  }
} 