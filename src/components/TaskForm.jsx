import React, { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "./Modal";
import Task from "./Task";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import CategoryList from "./CategoryList";

const TaskForm = () => {
  const { addTask, addNewType, typeList } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("todo");

  const [customCat, setCustomCat] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [buttonType, setButtonType] = useState("");

  const [containerWidth, setContainerWidth] = useState();
  const [scrollableWidth, setScrollableWidth] = useState(0);
  
  const itemswidth = 300;
  const [indices, setIndices] = useState([0, typeList.length]);
  const visibleList = typeList.slice(indices[0], indices[1] + 1);
  const divRef = useRef(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setContainerWidth(divRef.current.clientWidth);
      setScrollableWidth(divRef.current.scrollWidth);

    };

    updateWindowWidth()
    window.addEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    if (!divRef.current) {
      return;      
    }
    if (divRef.current) {
      setContainerWidth(divRef.current.clientWidth);
      setScrollableWidth(divRef.current.scrollWidth);
    }
  }, [typeList]);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      toast.error("Task Not Added !");
      setIsOpenModal(false);
      return;
    } else {
      addTask(title, type, description);
      setTitle("");
      setType("todo");
      setDescription("");
      setIsOpenModal(false);
      toast.success(`Task added in ${type}!`);
    }
  };

  const handleScroll = (e) => {
    const { scrollLeft } = e.target;
    console.log(scrollLeft);
    const newStartIndex = Math.floor(scrollLeft / itemswidth);
    const newEndIndex = newStartIndex + Math.floor(containerWidth / itemswidth);

    setIndices([newStartIndex, newEndIndex]);
  };

   const handleCat = () => {
    const trimmed = customCat.trim();
    if (trimmed.length === 0) {
      toast.error("Category Not Added !");
    } else {
      toast.success(`${customCat} category added !`);
      addNewType(customCat);
      setCustomCat("");
    }
  };

  const renderForm = () => (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleCat();
        }
      }}
      onSubmit={handleSubmit}
      className="flex gap-2 my-2 items-start w-full bg-blue-50 p-3 rounded-md justify-around md:flex-row md:items-center"
    >
      <div>
        <button
          type="button"
          className="m-2 p-2 bg-orange-400 text-white border rounded-lg hover:bg-green-400 transition font-semibold"
          onClick={() => setIsOpenModal(true)}
        >
          Add Task
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <input
          className="h-10 p-2 text-white bg-blue-300 rounded-md placeholder:text-white font-semibold outline-none mt-2"
          placeholder="Enter Category"
          value={customCat}
          onChange={(e) => setCustomCat(e.target.value)}
        />
        <button
          type="button"
          className={`${
            customCat.trim().length === 0
              ? "bg-gray-400"
              : "bg-green-300 hover:bg-green-400"
          } text-white transition mt-2 font-semibold py-2 px-4 rounded`}
          onClick={handleCat}
        >
          Add Category
        </button>
      </div>
    </form>
  );

  const renderCategories = () => (
    
    <div className="">
    
    <div className="p-4 m-4 bg-white rounded-lg h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks:</h2>
      <div
        ref={divRef}
        className="Container h-full overflow-x-auto pb-4 px-2"
        onScroll={handleScroll}
      >
        <div
          className=" bigWindow relative h-full"
          style={{ width: itemswidth * typeList.length }}
        >
          {visibleList.map((type, index) => {
            return (
              <div
                key={type.color}
                className={`${
                  type.title + "child"
                } min-h-[400px] absolute min-w-[280px] max-w-[300px] bg-opacity-90 p-4 rounded-lg shadow-md`}
                style={{
                  backgroundColor: type.color,
                  left: `${(indices[0] + index) * itemswidth + 10}px`,
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold uppercase text-lg">{type.title}</p>
                  <button
                    onClick={() => {
                      setIsOpenModal(true);
                      setButtonType(type.title);
                      setType(type.title);
                    }}
                    className="h-8 w-8 bg-red-300 rounded-lg font-bold text-white flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <Task type={type} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );

  console.log(visibleList,containerWidth, scrollableWidth);

  return (
    <div>
      <div className="mx-5">
        <h1 className="flex text-white p-8 font-bold text-4xl underline justify-center items-center">
          Task Manager Board
        </h1>
        {renderForm()}
      </div>

      {renderCategories()}
      <Outlet />

      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          toast.error("task not added!");
        }}
        onBackdivClick={() => {
          setIsOpenModal(false);
          toast.error("task not added!");
        }}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        type={type}
        setType={setType}
        ond={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default TaskForm;
