import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from '../components/TaskForm';
import Notfound from "../components/Notfound";
import TaskShow from '../components/TaskShow';
import TaskEdit from '../components/TaskEdit';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<TaskForm />}>
  <Route path="task/:id" element={<TaskShow />} />
  <Route path="task/:id/edit" element={<TaskEdit />} />
</Route>
        
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;