import React from "react";
import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Task = ({
  type,
  itemsHeight,
  indices,
  visibleList,
  bigWindowWidth,
}) => {
  const navigate = useNavigate();
  const { delTask, taskList, typeList, updateType, updateTask } =
    useContext(TaskContext);

  const [editingId, setEditingId] = useState("");
  const [tempDesc, setTempDes] = useState("");

  const openTask = (id) => {
    navigate(`/dashboard/task/${id}`);
  };

  return (
    <div
      className="p-4 relative rounded-lg h-screen"
      style={{ width: `${bigWindowWidth}px` }}
    >
      {visibleList
        .filter((item) => item.type === type.title)
        .map((task, index) => (
          <div
            className="bg-[#2A4759] text-white rounded-md mt-2 p-3 space-y-2"
             style={{
              left: `${(indices[0] + index) * itemsHeight}px`,
            }}
            key={task.id}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-2 text-sm flex-wrap max-w-[60%]">
                <p className="font-semibold">{index + 1}.</p>
                <p>{task.title}</p>
              </div>
              <div className="flex gap-2">
                <select
                  className="rounded-lg bg-[#EEEEEE] text-[#2A4759] text-sm border border-[#DDDDDD] w-20"
                  value={task.type}
                  onChange={(e) => updateType(task.id, e.target.value)}
                >
                  {typeList.map((option) => (
                    <option key={option.color} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-[#F79B72] hover:bg-[#e28461] rounded-lg p-2 text-white"
                  onClick={() => delTask(task.id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>

            {editingId === task.id ? (
              <div>
                <textarea
                  className="w-full bg-[#EEEEEE] text-[#2A4759] border border-[#DDDDDD] p-2 rounded-md text-sm resize-none min-h-[100px] max-h-[120px]"
                  value={tempDesc}
                  onChange={(e) => setTempDes(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      updateTask(task.id, tempDesc);
                      setEditingId("");
                      setTempDes("");
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-400 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setEditingId("");
                      setTempDes("");
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="text-[#2A4759] bg-[#EEEEEE] border border-[#DDDDDD] rounded-md p-2 max-h-[120px] min-h-[100px] overflow-y-auto break-all w-full">
                  {task.desc}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setTempDes(task.desc);
                    }}
                    className="ml-2 bg-blue-500 h-8 text-white text-sm px-2 py-1 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="ml-2 bg-blue-500 h-8 text-white text-sm px-2 py-1 rounded-lg"
                    onClick={() => openTask(task.id)}
                  >
                    <FaRegFolderOpen />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Task;
