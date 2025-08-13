import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom'



function Login({setIsAuthenticated}) {
  const [form, setForm] = useState({identity:"", password:""})
  const navigate = useNavigate();

  const handleChange = (e) => setForm({...form, [e.target.name]:e.target.value})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:9000/api/Users/login", form, {withCredentials:true});
      // store it in localStorage for testing
      setIsAuthenticated(true);
      navigate("/Dashboard")
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-white-900'>
      <form onSubmit={handleSubmit} className='bg-white-800 p-6 rounded-lg shadow-lg w-80'>

        <h2 className='text-2xl font-bold text-blue mb-4'>Login</h2>

        <input name="identity" placeholder='Username or email' onChange={handleChange}
        className='w-full p-2 mb-2 rounded' />

        <input name="password" placeholder='password'
        type='password'
        onChange={handleChange}
        className='w-full p-2 mb-4 rounded'/>

        <button className='w-full bg-green-500 p-2 rounded text-white'>Login</button>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link 
            to="/signup" 
            className="text-blue-500 hover:underline"
          >
            Create one here
          </Link>
        </div>
        
      </form>
    </div>
  )
}

export default Login