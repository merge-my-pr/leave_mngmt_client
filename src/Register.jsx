import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiUser } from "react-icons/bi"
import { AiOutlineLock } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [name, Setname] = useState('')
  const [user, Setuser] = useState('')
  const [pass, Setpass] = useState('')
  const navigate = useNavigate()

  // Toast notification functions
  const showToast = (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })
  }

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate the input fields
    if (!name) {
      showToast('Enter your Name')
    } else if (!user) {
      showToast('Enter the Username')
    } else if (!pass) {
      showToast('Enter the Password')
    } else {
      // Prepare the payload
      const payload = {
        name,
        username: user,  // Send 'username' instead of 'user' to match the backend
        password: pass,  // Send 'password' instead of 'pass' to match the backend
      }

      // Send the registration request
      axios.post('http://localhost:5000/api/auth/signup', payload)
        .then(result => {
          console.log(result)
          // If successful, redirect to login page
          navigate('/login')
        })
        .catch(err => {
          if (err.response && err.response.status === 400) {
            // Handle specific errors like 'Username already exists'
            showToast(err.response.data.message)
          } else {
            // Generic error
            showToast('Server error. Please try again later.')
          }
        })
    }
  }

  return (
    <div className='text-white h-[100vh] w-[100%] flex justify-center items-center bg-cover'
      style={{ "backgroundImage": "url('../src/assets/bg-2.jpg')", outline: 'none', caretColor: 'transparent' }}>
      <div className='w-full h-screen backdrop-filter backdrop-blur-xl flex justify-center items-center'>
        <div className='bg-slate-800 border border-slate-400 rounded-xl p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20 relative'>
          <h1 className='text-4xl text-white font-bold text-center mb-8 '>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className='relative my-4'>
              <input
                type='text'
                className='block w-72 mb-7 py-2.3 px-0 text-l text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
                placeholder=''
                value={name}
                onChange={(e) => Setname(e.target.value)}
              />
              <label htmlFor='' className='absolute text-l text-white duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-8'>Name</label>
              <BiUser className='absolute right-8 top-1' />
            </div>
            <div className='relative my-4'>
              <input
                type='text'
                className='block w-72 py-2.3 px-0 mb-6 text-l text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
                placeholder=''
                value={user}
                onChange={(e) => Setuser(e.target.value)}
              />
              <label htmlFor='' className='absolute text-l text-white duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-8'>New username</label>
              <BiUser className='absolute right-8 top-1' />
            </div>
            <div className='relative my-4'>
              <input
                type='password'
                className='block w-72 py-2.3 px-0 text-l text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
                placeholder=''
                value={pass}
                onChange={(e) => Setpass(e.target.value)}
              />
              <label htmlFor='' className='absolute text-l text-white duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-8'>New Password</label>
              <AiOutlineLock className='absolute right-8 top-1' />
            </div>
            <button type='submit' className='w-full mb-4 mt-3 text-[20px] rounded-full bg-white h-10 text-blue-950 hover:bg-emerald-500 hover:text-white py-1 transition-colors duration-300'>
              Register
            </button>
            <div>
              <span className='m-9'>Already have an Account? <Link to="/login" className='text-blue-600'> Login</Link></span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </div>
  )
}

export default Register
