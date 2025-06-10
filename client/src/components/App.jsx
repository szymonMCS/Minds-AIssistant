import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Notebook from "./Notebook";

export const baseApiURL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(`${baseApiURL}/api/check-session`);
        if (data.loggedIn) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading session...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser}/>
        <main className="main-content">
            <Routes>
                <Route path="/" element={user ? <Navigate to="/notebook"/> : <Home />} />
                <Route 
                    path="/register" 
                    element={user ? <Navigate to="/notebook"/> : <Register/> } 
                />
                <Route 
                    path="/login" 
                    element={user ? <Navigate to="/notebook"/> : <Login setUser={setUser}/>} 
                />
                <Route 
                    path="/notebook" 
                    element={user ? <Notebook user={user}/> : <Navigate to="/login"/>} 
                />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
