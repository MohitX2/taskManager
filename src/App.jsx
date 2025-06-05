import React, { useState} from 'react'
import {TaskContextProvider}  from './contexts/TaskContext';
import TaskForm from "./components/TaskForm";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Task from "./components/Task";
import { Toaster } from 'react-hot-toast';
import CategoryList from './components/CategoryList';



function App() {


  return (
    <div className='bg-[#241135]'>
      <TaskContextProvider>
      <Router/>
          <Toaster position='top-right' reverseOrder={false}/>
      </TaskContextProvider>
    </div>
  )
}

export default App