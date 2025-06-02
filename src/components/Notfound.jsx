import React from 'react'
import { useNavigate } from 'react-router-dom'




const Notfound = () => {

    const navigate=useNavigate();

    const navigateHome =()=>{
        navigate("/dashboard")  
    }
  return (
     <>                     
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white '>Notfound !!!!!!!!!!!<button onClick={navigateHome} className='bg-black my-7 text-white rounded-lg p-4'>Go to DashBoard ! </button></div>
    </>
  )
}

export default Notfound