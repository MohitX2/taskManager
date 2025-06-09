import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { TaskContext } from "../contexts/TaskContext";

function Modal({
  open,
  onClose,
  onBackdivClick,
  title,
  setTitle,
  description,
  setDescription,
  handleSubmit,
  type,
  setType,
}) {
  const { typeList } = useContext(TaskContext);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onBackdivClick}
        className="fixed inset-0 bg-black/40 z-30"
      />

      <div className="fixed z-40 top-[30%] left-[30%] bg-[#2A4759] text-white p-4 rounded-lg shadow-lg xl:w-1/3 h-fit w-1/2">
        <div className="grid gap-3">
          <div className="flex gap-2">
            <input
              className="p-2 text-[#2A4759] bg-[#EEEEEE] rounded-md placeholder-[#2A4759] font-semibold outline-none w-full"
              type="text"
              placeholder="Enter Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e)
                }
              }}
            />
            <select
              className="rounded-lg bg-[#EEEEEE] text-[#2A4759] border-[2px] border-[#DDDDDD] w-20"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {typeList.map((option) => (
                <option key={option.color} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="p-2 bg-[#EEEEEE] text-[#2A4759] rounded-md placeholder-[#2A4759] font-semibold outline-none h-[225px] resize-none border border-[#DDDDDD]"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className={`${
                title.trim().length === 0
                  ? "bg-[#F79B72]/50 "
                  : "bg-[#F79B72] hover:bg-[#e28461]"
              } text-white font-bold py-2 px-4 rounded`}
            >
              Add Task
            </button>
            <button
              onClick={onClose}
              className="bg-[#DDDDDD] text-[#2A4759] px-4 py-2 rounded hover:bg-[#CCCCCC]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
