import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'


function Signup({setIsAuthenticated}) {

    const [form, setForm] = useState({lastName:"", firstName:"", userName:"", password:"", email: ""})

    const navigate = useNavigate();

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:9000/api/Users/register", form, {withCredentials: true})
          alert("user created successfully")
          const loginForm = {identity: form.email, password: form.password}
          await axios.post("http://localhost:9000/api/Users/login",loginForm, {withCredentials: true})
          setIsAuthenticated(true)
          navigate("/Dashboard")
        } catch (error) {
          console.log("user not created:",error)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-white-900'>
        <form className='bg-gay-800 p6 rounded-lg shadow-lg w-80' onSubmit={handleSubmit}>

            <h2 className="text-2xl font-bold test-white mb-4 text-center ">Sign Up</h2>

            <input name="firstName" placeholder='Firstname'
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded shadow-lg"/>

            <input name="lastName" placeholder='Lastname'
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded shadow-lg"/>

            <input name="userName" placeholder='Username'
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded shadow-lg"/>

            <input name="email" placeholder='Email'
            onChange={handleChange}
            className='w-full mb-2 p-2 rounded shadow-lg' />

            <input name='password'
            type='password'
            placeholder='Password'
            onChange={handleChange}
            className='w-full mb-4 rounded p-2 shadow-lg' />

            <button className='w-full bg-blue-500 p-2 rounded text-white'>Sign Up</button>

        </form>
    </div>
  )
}

export default Signup