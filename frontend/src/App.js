import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import { AuthContext } from "./context/auth";
import './App.css';

function App(props) {
  // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuthenticated = (data) => {
      localStorage.setItem("isAuthenticated", data);
      setIsAuthenticated(data);
    }
  const setJWTToken = (token) => {
    localStorage.setItem("token", token);
  }
  const getJWTToken = () => {
    return localStorage.getItem('token');
  }
 const deleteJWTToken = () => {
   localStorage.removeItem('token');
 }
  return (
    <div className="App">
      <AuthContext.Provider value={{
          isAuthenticated, setIsAuthenticated: setAuthenticated, setJWTToken, getJWTToken, deleteJWTToken
        }}>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
