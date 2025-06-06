import { createContext, useState } from "react";
import toast from "react-hot-toast";

function generateRandomPastelColor() {
  const randomChannel = () => Math.floor(Math.random() * 128 + 127);
  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();

  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  
  const [typeList, setTypeList] = useState([
    { title: "todo", color: "#ffd182" },
    { title: "done", color: "#ccffee" },
    { title: "other", color: "#e1d7ff" },
  ]);

  const addTask = (title, type, desc) => {
    const newTask = {
      id: Date.now(),
      title,
      type,
      desc,
    };
    setTaskList((prev) => [newTask, ...prev]);
  };

  const delTask = (id) => {
    setTaskList((prev) => prev.filter((cur) => cur.id != id));
    toast.error("Deleted !");
  };

  const updateTask = (id, newDesc) => {
    toast.success("Updated!");
    setTaskList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, desc: newDesc } : task))
    );
  };

  const addNewType = (nt) => {
    const newtype = { title: nt, color: generateRandomPastelColor() };

    const check = typeList.filter((item) => item.title == nt);
    if (check) {
      setTypeList((prev) => [...prev, newtype]);
    }
  };

  const updateType = (taskId, updatedType) => {
    setTaskList((prev)=>
      prev.map((task) =>
        task.id === taskId ? { ...task, type: updatedType } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        typeList,
        addTask,
        delTask,
        addNewType,
        updateType,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
