const CategoryList = ({ items, openModal, setButtonType, setType }) => {
  return (
    <>
      {items.map((type) => (
        <div
          key={type.color}
          className="min-h-[400px] bg-opacity-90 p-5 rounded-lg shadow-md inline-block"
          style={{ backgroundColor: type.color, width: 200 }}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold uppercase text-lg">{type.title}</p>
            <button
              onClick={() => {
                openModal();
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
      ))}
    </>
  );
};
