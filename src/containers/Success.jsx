import '../styles/containers/Success.css'
import { Button } from '@mui/material';
import useRedirect from '../hooks/useRedirect';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Success = () => {

  const redirectToAnotherPage = useRedirect();

  const handleRegisterBuy = () => {
    redirectToAnotherPage('/')
  }

  return(
    <div className="success">
      <div className="check-container">
        <CheckCircleOutlineIcon className="check" />
      </div>

      <p className='success-message'>Order successfully registered</p>

      <Button size="large" variant="contained" color="success" onClick={handleRegisterBuy}>
        FINISH
      </Button>
      
    </div>
  )
}

export default Success