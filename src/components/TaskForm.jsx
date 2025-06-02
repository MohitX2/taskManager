import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "./Modal";
import Task from "./Task";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { Grid } from "react-virtualized";

const TaskForm = () => {
  const { addTask, addNewType, typeList } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("todo");

  const [customCat, setCustomCat] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [buttonType, setButtonType] = useState("");

  const handleCat = () => {
    const trimmed = customCat.trim();
    if (trimmed.length === 0) toast.error("Category Not Added !");
    else {
      toast.success(`${customCat} category added !`);
      addNewType(customCat);
      setCustomCat("");
    }
  };

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

  const catRender = ({ key, style, columnIndex }) => {
    console.log("reached")
    const category = typeList[columnIndex];
    return (
      <div
        key={key}
        className="min-w-[00px] max-w-[450px] min-h-[400px] bg-opacity-90 p-5 rounded-lg shadow-md"
        style={{ ...style, backgroundColor: category.color }}
      >
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold uppercase text-lg">{category.title}</p>

          <button
            value={buttonType}
            onClick={() => {
              setIsOpenModal(true);
              setButtonType(category.title);
              setType(category.title);
            }}
            className="h-8 w-8 bg-red-300 rounded-lg font-bold text-white flex items-center justify-center"
          >
            +
          </button>
        </div>
        <Task type={category} />
      </div>
    );
  };

  console.log("from TaskForm");

  const renderForm = () => {
    return (
      <>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit}
          className="flex gap-2 my-2 items-start w-full bg-blue-50 p-3 rounded-md justify-around  md:flex-row md:items-center"
        >
          <div className="">
            <button
              type="button"
              className="m-2 p-2 bg-orange-400 text-white  border rounded-lg hover:bg-green-400  transition  font-semibold "
              onClick={() => setIsOpenModal(true)}
            >
              Add Task
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <input
              className="h-10 p-2 text-white bg-blue-300 rounded-md placeholder:text-white font-semibold outline-none mt-2 "
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
      </>
    );
  };

  return (
    <div className="">
      <div className="mx-5">
        <h1 className="flex text-white p-8 font-bold text-4xl underline justify-center items-center">
          Task Manager Board
        </h1>

        {renderForm()}
      </div>
      <div className="taskShow">
        <div className="p-4 m-4 bg-white rounded-lg h-screen ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks:</h2>

          
            <Grid
              cellRenderer={catRender}
              columnCount={typeList.length}
              columnWidth={300}
              rowCount={1}
              rowHeight={1000}
              width={800}
              height={300}
              overscanColumnCount={2}
            />
        </div>
      </div>
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
      ></Modal>
    </div>
  );
};

export default TaskForm;
