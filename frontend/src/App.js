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
  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: setAuthenticated }}>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
