import Task from "./Task";

const CategoryList = ({
  itemsWidth,
  setIsOpenModal,
  indices,
  setButtonType,
  setType,
  visibleList,
  bigWindowWidth,
}) => {

  return (
    <div className="p-4 relative rounded-lg h-screen"
  style={{ width: `${bigWindowWidth}px` }}>
          {visibleList.map((type, index) => {
            return (
              <div
                key={type.color}
                className={`${
                  type.title + "child"
                } min-h-[400px] absolute min-w-[280px] max-w-[300px] bg-opacity-90 p-4 rounded-lg shadow-md`}
                style={{
                  backgroundColor: type.color,
                  left: `${(indices[0] + index) * itemsWidth}px`,
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
  );
};

export default CategoryList;