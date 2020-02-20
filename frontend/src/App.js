import axios from 'axios'
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

  axios.defaults.baseURL = 'http://localhost:8000/';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    const token = getJWTToken();
    config.headers.common.Authorization = 'Token ' + token;

    return config;
  });

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
