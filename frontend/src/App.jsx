import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import Signup from './pages/Signup'
import axios from 'axios';
import Dashboard from "./pages/Dashboard"

axios.defaults.withCredentials = true;

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/Users/loggedUser");
        console.log(res)
        if(res.data.message.refreshToken) {
          console.log("token",res.data.message.refreshToken)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }

      } catch {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) return <p className='flex items-center justify-center min-h-screen'>Loading...</p>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} replace />
        <Route path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
