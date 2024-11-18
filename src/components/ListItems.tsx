import {
  MdOutlineDoneAll,
  MdDeleteForever,
  MdOutlineUndo,
} from "react-icons/md";
import useFirestore from "./useFirestore";

const ListItems = ({ currentCategory }: { currentCategory: string }) => {
  const { todosList, categoriesList, deleteTask, updateTask } = useFirestore();

  const filteredTodosList = todosList.filter(
    (task) => task.categoryId === currentCategory
  );

  return (
    <div className="w-full bg-[#f2f2f2] rounded-md p-2 flex flex-col gap-2">
      {filteredTodosList.length > 0 ? (
        filteredTodosList.map((task, index) => {
          const category = categoriesList.find(
            (category) => category.id === task.categoryId
          );

          const Icon = task.isCompleted ? MdOutlineUndo : MdOutlineDoneAll;

          return (
            <div
              key={index}
              className="bg-white w-full rounded-md text-xs px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`w-[25%] font-medium ${
                      task.isCompleted ? "line-through" : ""
                    }`}>
                    {task.title}
                  </span>
                  <div
                    style={{ backgroundColor: category?.tagBackground }}
                    className={`px-2 py-1 text-white rounded-md w-20 text-center`}>
                    {category?.title}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {task.isCompleted ? "Completed" : "In Progress"}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-red-700 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                      <MdDeleteForever
                        size={20}
                        color="#fff"
                        onClick={() => deleteTask(task.id)}
                      />
                    </div>
                    <div
                      className={`${
                        task.isCompleted ? "bg-blue-500" : "bg-green-500"
                      } w-7 h-7 rounded-full flex items-center justify-center cursor-pointer`}>
                      <Icon
                        size={20}
                        color="#fff"
                        onClick={() =>
                          updateTask(task.id, {
                            ...task,
                            isCompleted: !task.isCompleted,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-2xl">{`No tasks to show`}</div>
      )}
    </div>
  );
};

export default ListItems;
