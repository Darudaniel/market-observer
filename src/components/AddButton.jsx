import { Link } from 'react-router-dom'
import '../styles/components/AddButton.css'

const AddButton = () => {
  
  return(
    <Link to='/add-product' className='add-button'>
      <h2 className='add-button--text'>
        +
      </h2>
    </Link>
  )
}

export default AddButton