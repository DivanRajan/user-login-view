import logo from './logo.svg';
import './App.css';
import './styles/Dashboard.css';
import Dashboard from './components/Dashboard.js';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <div className="App">
      <header className="mainContainer">
      <Register/>
      {/* <Login/> */}
      {/* <Dashboard/> */}
      </header>
    </div>
  );
}

export default App;
