import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

const TaskShow = () => {
  const { taskList, typeList, updateType } = useContext(TaskContext);

  const { id } = useParams();

  const navigate = useNavigate();

  console.log(id, typeList);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 ">
      {taskList
        .filter((item) => item.id == id)
        .map((task) => (
          <div
            key={id}
            className="flex flex-col bg-white min-w-[250px] text-black m-10 p-6 rounded-xl z-40 "
          >
            <div className="flex justify-between font-semibold">
              <p className="mb-5">{task.title}</p>
              <select
                className="py-2 border rounded-lg mb-2"
                value={task.type}
                onChange={(e) => updateType(task.id, e.target.value)}
              >
                {typeList.map((type) => (
                  <option>{type.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                readOnly
                value={task.desc}
                className="resize-none border border-gray-300 rounded-lg p-2 focus:outline-none  min-h-[150px]"
              ></textarea>
              <button
                onClick={() => navigate(`edit`)}
                className="flex gap-2 items-center justify-center bg-[#F79B72] hover:bg-[#e28461] rounded-lg p-1 text-white"
              >
                {" "}
                Edit
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center bg-[#F79B72] hover:bg-[#e28461] rounded-lg p-1 text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskShow;
