import '../styles/components/StockCard.css'
import VariableAndValue from './VariableAndValue'

const StockCard = ({ data }) => {
  return (
    <div className='stock-card'>
      <h3>{data.ticker}</h3>
      <VariableAndValue variable="Buy" value={data.buy_price} />
      <VariableAndValue variable="Now" value={data.price_now} />  
    </div>
  )
}

export default StockCard