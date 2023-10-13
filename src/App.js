import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login';
import AuthService from './services/AuthService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
    async function checkAuthentication() {
        const token = AuthService.getToken();
        await setIsAuthenticated(!!token);
    }
    
    checkAuthentication();
}, []);

  
  useEffect(() => {
    const token = AuthService.getToken();
  }, [isAuthenticated]);
  

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/" element={<Homepage />} />
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <Homepage />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
