import '../styles/components/StockCard.css'
import VariableAndValue from './VariableAndValue'

const StockCard = ({ data, priceNow }) => {
    
  const ticker = data.ticker
  const buyPrice = data.buyPrice

  return (
    <div className='stock-card'>
      <h3>{ticker}</h3>
      <VariableAndValue variable="Buy" value={buyPrice} />
      <VariableAndValue variable="Now" value={priceNow} />  
    </div>
  )
}

export default StockCard