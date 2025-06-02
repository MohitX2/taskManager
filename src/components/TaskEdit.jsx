import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { FaSave } from "react-icons/fa";

const TaskShow = () => {
  const { taskList, updateTask } = useContext(TaskContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(" ");

  console.log(data, id, "<<<");

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 ">
      {taskList
        .filter((item) => item.id == id)
        .map((task) => (
          <div
            key={id}
            className="flex flex-col bg-white min-w-[250px] text-black m-10 p-6 rounded-xl z-40 "
          >
            <div className="flex justify-between font-semibold ">
              <p className="mb-5 ">{task.title}</p>
              <p>Type-{task.type.toUpperCase()}</p>
            </div>
            <div className="flex flex-col gap-2 break-all">
              <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="resize-none border border-[#0060a4] border-dashed rounded-lg p-2 focus:outline-none min-h-[150px] "
                placeholder="enter here"
              ></textarea>

              <button
                onClick={() => {
                  updateTask(task.id, data);
                  setData("");
                }}
                disabled={data.trim().length == 0}
                className={`flex gap-2 items-center justify-center rounded-lg p-2 text-white ${data.trim().length === 0 ? "bg-gray-400" : "bg-[#F79B72] hover:bg-[#ff9900]"}`}
              >
                <FaSave />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center bg-[#F79B72] hover:bg-[#e28461] rounded-lg p-1 text-white"
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
