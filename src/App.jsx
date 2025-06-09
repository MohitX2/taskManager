import {TaskContextProvider}  from './contexts/TaskContext';
import { Toaster } from 'react-hot-toast';
import Router from "./routes/Router";

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