import '../styles/components/Stocks.css'
import { getPrice } from "../functions/getPrice"
import { useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import StockCard from "./StockCard"
import AddButton from "./AddButton"
import { Button } from '@mui/material'

const Stocks = () => {

	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

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
			const data = await getDocs(ordersCollectionRef)
			await setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


		} catch (error) {
			console.error(error + "no se esta agregando la accion");
		}
	}



	useEffect(() => {
		getMyStocks()
  }, []);

	const updatePrices = () => {
		 processProducts();
	}

	return (
		<div className="stocks">
			<Button variant="contained" color="success" onClick={updatePrices}>
				Update Prices
			</Button>
			{isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>

					<AddButton/>
					{
						orders.map((order) => (
							<StockCard key={order.id} data={order} priceNow={order.priceNow} />
						))
					}
        </div>
      )}
		</div>
	)
}

export default Stocks