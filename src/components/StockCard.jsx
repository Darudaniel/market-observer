import '../styles/components/StockCard.css'
import VariableAndValue from './VariableAndValue'

const StockCard = ({ data, priceNow }) => {
    
  const ticker = data.ticker
  const buyPrice = data.buyPrice
  const percentage = data.percentage

  let cardClassName;

  if (percentage > 20) {
    cardClassName = 'green-card';
  } else if (percentage < -20) {
    cardClassName = 'red-card';
  } else {
    cardClassName = 'default-card';
  }

  return (
    <div className={`stock-card ${cardClassName}`}>
      <h3>{ticker.toUpperCase()}</h3>
      <div className='variables--container'>
        <VariableAndValue variable="Buy" value={buyPrice} />
        <VariableAndValue variable="Now" value={priceNow} />  
      </div>
    </div>
  )
}

export default StockCard