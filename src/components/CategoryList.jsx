import { useContext } from "react";
import TaskList from "./TaskList";
import { HiOutlineArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { TaskContext } from "../contexts/TaskContext";
import withVerticalVirtualisation from './withVerticalVirtualisation';

const CategoryList = ({
  itemsWidth,
  setIsOpenModal,
  indices,
  setButtonType,
  setType,
  visibleList,
}) => {
  const itemsHeight=250
  const VirtualisedTaskList = withVerticalVirtualisation(TaskList,itemsHeight)



  const {taskList,upChangeIndex,downChangeIndex}=useContext(TaskContext)
  return (
    <>
      {visibleList.map((type, index) => {
        return (
          <div
            key={type.color}
            className={"absolute min-w-[280px] max-w-[300px] bg-opacity-90 p-4 rounded-lg shadow-md h-fit "}
            style={{
              backgroundColor: type.color,
              left: `${(indices[0] + index) * itemsWidth}px`}}
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold uppercase text-lg w-30
                break-all">{type.title}</p>
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

              <div className="flex  justify-between w-full">
                <button
                onClick={()=>upChangeIndex(type.color)} 
                className="h-8 w-8 bg-white rounded-lg font-bold text-black flex items-center justify-center">
                  <HiOutlineArrowSmLeft />
                </button>
                <button 
                onClick={()=>downChangeIndex(type.color)} 
                className="h-8 w-8 bg-white rounded-lg font-bold text-black flex items-center justify-center">
                  <HiArrowSmRight />
                </button>
              </div>
              
            <VirtualisedTaskList items={taskList.filter(task => task.type === type.title)} type={type} />


            </div>
          </div>
        );
      })}
    </>
  );
};

export default CategoryList;
