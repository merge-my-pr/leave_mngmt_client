import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='h-[90%] w-full flex flex-wrap'>
        <div className='h-[100%] w-52 bg-purple-700'>
            <div className='flex flex-col gap-10 text-xl ml-14'>
           <Link to='/home'><button className='mt-5 hover:text-white '>Home</button></Link> 
            <Link to='/leave'><button className='hover:text-white'>Leave</button></Link>

            </div>
           

        </div>
      
    </div>
  )
}

export default Sidebar
