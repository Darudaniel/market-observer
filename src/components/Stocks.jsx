import { getPrice } from "../functions/getPrice"
import { useEffect, useState } from "react"
import StockCard from "./StockCard"
// import Loader from "./Loader"

const Stocks = () => {

	// const [isLoading, setIsLoading] = useState(true)
	
		// const example = [
		// 	{
		// 		id: 1223,
		// 		ticker: "VOO",
		// 		name: "Vanguard SP500 ETF",
		// 		price_now: 400,
		// 		buy_price: 400,
		// 	},
		// 	{
		// 		id: 1583,
		// 		ticker: "BTC",
		// 		name: "Bitcoin",
		// 		price_now: 93000,
		// 		buy_price: 68000,
		// 	}
		// ]
	
	const [myStocks, setMyStocks] = useState([])

	const addStock = (id, date, ticker, priceNow, buyPrice, sellPrice) => {
		setMyStocks([
			{
				id: id,
				date: date,
				ticker: ticker,
				priceNow: priceNow,
				buyPrice: buyPrice,
			}	
		]);
	}
	
	const getMyStocks = async() => {
		try {
			const applePrice = await getPrice("AAPL");
			addStock(12345, "AAPL", "Apple Inc.", applePrice, 50)
			
		} catch (error) {
			console.error(error + "no se esta agregando la accion");
		}
	}
	
	useEffect(() => {
		setTimeout(() => {
			getMyStocks()
		}, 1000);
		
  }, []);

	return (
		<div>
			{
				myStocks.map((stock) => {
					return(
						<StockCard key={stock.id} data={stock} />
					)
				})
			}
		</div>
	)
}

export default Stocks