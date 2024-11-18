import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
   
        <div className='h-[100vh] w-screen bg-white'>

            <div className='h-20 w-screen bg-purple-600 flex flex-wrap'>
                <h1 className='mt-6 ml-14 text-3xl font-mono'>
                    STUDENT MANAGEMENT
                </h1>
            


            </div>
            <div className=' text-black flex flex-wrap'>
                <h1 className='font-serif text-[150%]  mt-20 ml-64'style={{ outline: 'none', caretColor: 'transparent' }}>
                <TypeAnimation
      sequence={[
       
       'Empowering Schools, Inspiring Students',
        2000, 
        'Where Student Success Meets Smart Management',
        2000,
        'Less Admin, More Learning!',
        2000,
        'One Hub for Every Student Need',
        2000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
                </h1>
               


            </div>
            <div className=' text-gray-400 flex flex-wrap text-xl'>
                <h1 className='flex mt-12 absolute ml-72 '>Transforming Student Management for the Modern World</h1>
                <p className='flex mt-20 ml-80 absolute'>
                Smart Solutions for a Brighter Tomorrow
                </p>

            </div>
            
            <div>
               <Link to="/register">
               <button className='text-xl h-10 w-28 bg- bg-purple-400 rounded-xl p-1 absolute ml-96 mt-44 font-serif  'style={{ outline: 'none', caretColor: 'transparent' }}>Get Started</button>
               </Link> 
            </div>
        </div>


      
    
  )
}

export default Dashboard



















