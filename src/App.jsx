import React, { useState} from 'react'
import {TaskContextProvider}  from './contexts/TaskContext';
import TaskForm from "./components/TaskForm";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Task from "./components/Task";



function App() {


  return (
    <div className='bg-[#241135]'>
      <TaskContextProvider>
      <Router/>
      </TaskContextProvider>
    </div>
  )
}

export default App