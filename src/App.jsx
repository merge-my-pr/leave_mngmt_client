import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Leave from './Leave'

const App = () => {
  return (
    <div>
       <Routes>
     <Route path='' element={<Dashboard/>}/>
     <Route path='register' element={<Register/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='home' element={<Home/>}/>
     <Route path='Leave' element={<Leave/>}/>
     

     </Routes>
     
      
    </div>
  )
}

export default App

