import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './context/NoteState';
// import NoteState from './context/noteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) =>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() =>{
        setAlert(null);
      }, 1000);
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar alert = {showAlert}/>
        <Alert alert = {alert} />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home alert = {showAlert}/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/login' element={<Login alert = {showAlert}/>}/>
            <Route exact path='/signup' element={<Signup alert = {showAlert}/>}/>
          </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
