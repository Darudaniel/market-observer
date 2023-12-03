import '../styles/components/Stocks.css'
import { getPrice } from "../functions/getPrice"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import StockCard from "./StockCard"
import AddButton from "./AddButton"
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Stocks = () => {
	
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	
	const { user } = UserAuth()
  const userId = user.uid

	function compareByPercentage(a, b) {
		const percentageA = parseFloat(a.percentage);
		const percentageB = parseFloat(b.percentage);
	
		if (percentageA < percentageB) {
			return 1;
		}
		if (percentageA > percentageB) {
			return -1;
		}
		return 0;
	}

	async function processProducts() {
		try {

			const updatedOrders = await Promise.all(
				orders.map(async (order) => {
					const productPrice = await getPrice(order.ticker);
          if (productPrice !== null) {
						const percentage = ((productPrice - order.buyPrice) / order.buyPrice) * 100;
						return {
							...order,
							priceNow: productPrice,
							percentage: percentage.toFixed(2), // Round the percentage to two decimal places
						};
					}
          return order;
        })
				);

				const sortedOrders = updatedOrders.sort(compareByPercentage);

				setOrders(sortedOrders);
				setIsLoading(false)

    } catch (error) {
			console.error(`Error al procesar las órdenes: ${error.message}`);
    }
  }

	const getMyStocks = async() => {
		try {
			
			const ordersCollectionRef = collection(db, "orders")
		
			const q = query(ordersCollectionRef, where("userId", "==", userId));
			const data = await getDocs(q)

			const filteredOrders = data.docs
      .filter(doc => doc.data().isOpen === true)
      .map(doc => ({ ...doc.data(), id: doc.id }));

    setOrders(filteredOrders);

		} catch (error) {
			console.error(error + "no se esta agregando la accion");
		}
	}

	const updatePrices = () => {
		 processProducts();
	}
	
	useEffect(() => {    		
		getMyStocks()
  }, [])

	return (
		<div className="stocks">
			<Button variant="contained" color="success" onClick={updatePrices}>
				Update Prices
			</Button>
			{isLoading ? (
        <p className='loading-message'>Update prices please.</p>
      ) : (
        <div>
					<AddButton/>
					{orders.length < 1 ? (
						// Render when orders.length is greater than 1
						<p>You have no open orders.</p>
					) : (
						// Render when orders.length is not greater than 1
						<>
							{orders.map((order) => (
								<Link to={`/sell/${order.id}`} style={{ textDecoration: 'none' }} key={order.id}>
									<StockCard data={order} priceNow={order.priceNow} />
								</Link>
							))}
						</>
					)}
        </div>
      )}
		</div>
	)
}

export default Stocks