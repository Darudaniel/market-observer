import '../styles/containers/Sell.css'
import { useParams } from "react-router-dom";
import { getPrice } from "../functions/getPrice";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "@mui/material";
import useRedirect from "../hooks/useRedirect";

const Sell = () => {

  const { orderId } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [myOrder, setMyOrder] = useState({})
  const [orderPrice, setOrderPrice] = useState(0)
  
  const redirectToAnotherPage = useRedirect();

  const updateOrder = async (orderId, sellPrice) => {
    try {

      const currentDate = new Date()
      const orderRef = doc(db,'orders', orderId)

      updateDoc(orderRef,{
        sellPrice: sellPrice,
        isOpen: false,
        sellDate: currentDate,
      }).then(response => {
        redirectToAnotherPage('/success')
      }).catch(error =>{
        console.error(error.message)
      })
      
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
    }
  };

  const handleRegisterSell = () => {
    updateOrder(orderId, orderPrice)
  }
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const getOrder = async () => {
    
      const docRef = doc(db, "orders", orderId)
      const order = await getDoc(docRef)
      const myOrderPriceNow = await getPrice(order.data().ticker)
      setMyOrder(order.data())
      setOrderPrice(myOrderPriceNow)
      setIsLoading(false)
  
    }
    getOrder()
  }, [orderId])

  

  return (
    <div className='sell'>
      {
        !isLoading ? (
          <div>
            <h1>{myOrder.ticker}</h1>
            <div className="prices-container">
              <div className="price--variable">
                <h3>
                  Price now: 
                </h3>
                {
                  orderPrice ? (
                    <p>{`$ ${orderPrice}`}</p>
                  ) : (
                    <p>Loading...</p>
                  )
                }
              </div>

              <div className="price--variable">
                <h3>
                  Purchased at: 
                </h3>
                {
                  myOrder ? (
                    <p>{`$ ${myOrder.buyPrice}`}</p>
                  ) : (
                    <p>Loading...</p>
                  )
                }
              </div>

            </div>

            <Button variant="contained" color="secondary" onClick={handleRegisterSell}>
                SELL ORDER
            </Button>

          </div>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  )
}

export default Sell