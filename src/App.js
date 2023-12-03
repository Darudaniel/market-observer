import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import logo from './logo.svg';
import Home from './containers/Home';
import AddProduct from './containers/AddProduct'
import Success from './containers/Success';
import Sell from './containers/Sell';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home/>} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home/>} />
          <Route path="*" element={<Home/>} />
          <Route path="/success" element={<Success />} />          
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/sell/:orderId" element={<Sell />} />          
        </Routes>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
