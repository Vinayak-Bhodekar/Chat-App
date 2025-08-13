import axios from 'axios'
import React from 'react'
import {useNavigate} from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault()
        const res = await axios.get("http://localhost:9000/api/Users/logout")
        navigate("/login")
    }

  return (
    <div className='flex fleex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
        <h1 className='text-3xl mb-4'>Welcome to Dashboard</h1>
        <button onClick={logout} className='bg-red-500 p-2 rounded'>Logout</button>
    </div>
  )
}

export default Dashboard