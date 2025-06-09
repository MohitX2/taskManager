import React, { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "./Modal";

import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import CategoryList from "./CategoryList.jsx";
import withVirtualisation from "./withVirtualisation";

const itemsWidth = 300;
const VirtualisedCategoryList = withVirtualisation(CategoryList, itemsWidth);

const TaskForm = () => {
  const { addTask, addNewType, typeList } = useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("todo");

  const [customCat, setCustomCat] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [buttonType, setButtonType] = useState("");

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
      // setIsOpenModal(false);
      toast.success(`Task added in ${type}!`);
    }
  };

  const handleCat = () => {
    const trimmed = customCat.trim();
    if (trimmed.length === 0) {
      toast.error("Category Not Added !");
    } else {
      toast.success(`${customCat} Category added !`);
      addNewType(customCat);
      setCustomCat("");
    }
  };

  const renderForm = () => (
    <form
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCat();
            }
          }}
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

  return (
    <div>
      <div className="mx-5">
        <h1 className="flex text-white p-8 font-bold text-4xl underline justify-center items-center">
          Task Manager Board
        </h1>
        {renderForm()}
      </div>
      <div className="p-2 h-[859px] bg-white m-3 rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-800 ">Your Tasks:</h2>
        <div className="h-screen">
        <VirtualisedCategoryList
          items={typeList}
          setIsOpenModal={setIsOpenModal}
          setButtonType={setButtonType}
          setType={setType}
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
      />
    </div>
  );
};

export default TaskForm;
