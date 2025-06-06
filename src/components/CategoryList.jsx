import { useContext } from "react";
import Task from "./Task";
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
  bigWindowWidth,
}) => {

  const itemsHeight=200
  const VirtualisedTaskList = withVerticalVirtualisation(Task,itemsHeight)



  const {taskList,upChangeIndex,downChangeIndex}=useContext(TaskContext)
  return (
    <div
      className="p-4 relative rounded-lg h-screen"
      style={{ width: `${bigWindowWidth}px` }}
    >
      {visibleList.map((type, index) => {
        return (
          <div
            key={type.color}
            className={`${
              type.title + "child"
            } min-h-[300px] absolute min-w-[280px] max-w-[300px] bg-opacity-90 p-4 rounded-lg shadow-md`}
            style={{
              backgroundColor: type.color,
              left: `${(indices[0] + index) * itemsWidth}px`,
            }}
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

              <div className="flex  justify-between w-full h- ">
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
    </div>
  );
};

export default CategoryList;
