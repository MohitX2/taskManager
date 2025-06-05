import React from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm';




const Notfound = () => {

    const navigate=useNavigate();

    const navigateHome =()=>{
        navigate("/dashboard")  
    }
  return (
     <>                     
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white '>Hello <button onClick={navigateHome} className='bg-black my-7 text-white rounded-lg p-4'>Go to TaskForm ! </button></div>
    </>
  )
}

export default Notfound