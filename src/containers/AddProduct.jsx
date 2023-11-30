import { useState } from 'react';
import '../styles/containers/AddProduct.css';
import { FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';
import getRandomInt from '../functions/getRandomInt';
import { getPrice } from '../functions/getPrice';


const AddProduct = () =>  {

  const setPriceNow = async(ticker) => {
    try {
      const currentDate = new Date()
			const productPrice = await getPrice(ticker);
      setFormData((prevFormData) => ({
        ...prevFormData,
        "date": currentDate,
        "priceNow": productPrice
      }));			
		} catch (error) {
			console.error(error + "no se esta agregando la accion");
		}
	}

  const [formData, setFormData] = useState({
    "id": getRandomInt(10000, 90000),
    "date": '',
    "ticker": '',
    "priceNow": '',
    "buyPrice": '',
    "isOpen": true,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleRegisterBuy = async () => {
    await setPriceNow(formData.ticker)
    await console.log(formData)
  };

  return (
    <div className='add-product'>

      <h1>Track a financial product</h1>

      <div className='form-container'>
        <FormControl style={{ marginBottom: '20px' }}>        
          <InputLabel htmlFor="ticker">Ticker</InputLabel>
          <Input 
            id="ticker" 
            aria-describedby="my-helper-text" 
            value={formData.ticker}
            onChange={handleInputChange}
          />
          <FormHelperText id="my-helper-text">It is the identification acroonym of a financial product</FormHelperText>
        </FormControl>
        
        <FormControl>
          <InputLabel htmlFor="buy">Buy</InputLabel>
          <Input 
            id="buyPrice" 
            aria-describedby="my-helper-text" 
            value={formData.buyPrice}
            onChange={handleInputChange}
          />
          <FormHelperText id="my-helper-text">It is the price at which you bought the financial product</FormHelperText>
        </FormControl>
      </div>

      <Button variant="contained" color="success" onClick={handleRegisterBuy}>
        REGISTER BUY
      </Button>

    </div>
  )
}

export default AddProduct