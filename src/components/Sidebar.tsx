import useFirestore from "./useFirestore";

const Sidebar = ({
  currentCategory,
  setCurrentCategory,
}: {
  currentCategory: string;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { categoriesList } = useFirestore();

  return (
    <div className="bg-white px-2 py-3 rounded-md w-[35%] md:w-[30%] lg:w-[28%]">
      <h6 className="font-semibold mb-5">Private</h6>
      <div className="space-y-2">
        {categoriesList.map((category, index) => (
          <div
            key={index}
            onClick={() => setCurrentCategory(category.id)}
            className={`flex items-center justify-between py-2 px-3 rounded-md ${
              currentCategory === category.id ? "bg-gray-300" : "bg-[#f2f2f2]"
            } cursor-pointer`}>
            <div className="flex items-center gap-2">
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </div>
            {/* <div
              className={`bg-[#9e9] w-5 h-5 rounded-lg flex items-center justify-center text-sm`}>
              {category.tasksNumber}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
