import ('../styles/components/VariableAndValue.css')

const VariableAndValue = ({ variable, value }) => {
  return(
    <div className='variables-container'>
      <p>{variable}</p>
      <p>{value}</p>
    </div>
  )
}

export default VariableAndValue