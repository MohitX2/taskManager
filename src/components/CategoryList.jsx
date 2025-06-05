import React, { useState, useContext, useEffect, useRef } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "./Modal";
import Task from "./Task";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const CategoryList = ({
  divRef,
  handleScroll,
  itemswidth,
  setIsOpenModal,
  indices,
  setButtonType,
  setType,
}) => {
  const { typeList } = useContext(TaskContext);
  
  const visibleList = typeList.slice(indices[0], indices[1] + 1);

  return (
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
  );
};

export default CategoryList;
