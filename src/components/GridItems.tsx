import {
  MdDeleteForever,
  MdOutlineDoneAll,
  MdOutlineUndo,
} from "react-icons/md";
import useFirestore from "./useFirestore";

const GridItems = ({ currentCategory }: { currentCategory: string }) => {
  const { todosList, categoriesList, deleteTask, updateTask } = useFirestore();

  const filteredTodosList = todosList.filter(
    (task) => task.categoryId === currentCategory
  );

  return (
    <div
      className={`flex gap-2 w-full bg-[#f2f2f2] rounded-md p-2 items-start justify-starts flex-wrap`}>
      {filteredTodosList.length > 0 ? (
        filteredTodosList.map((todo, index) => {
          const category = categoriesList.find(
            (category) => category.id === currentCategory
          );

          const Icon = todo.isCompleted ? MdOutlineUndo : MdOutlineDoneAll;

          return (
            <div
              key={index}
              className="bg-white w-full md:w-[calc(50%-6px)] lg:w-[calc(33%-6px)] rounded-md text-xs px-3 py-2">
              <div className="flex items-start gap-2 flex-col pb-2 border-b-[1px] border-b-gray-300">
                <div className="space-y-2">
                  <span
                    className={`w-[25%] font-medium ${
                      todo.isCompleted ? "line-through" : ""
                    }`}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div
                    className="py-[2px] px-1 bg-green-300 rounded-md w-fit"
                    style={{ backgroundColor: category?.tagBackground }}>
                    {category?.title}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="bg-red-700 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                      <MdDeleteForever
                        size={20}
                        color="#fff"
                        onClick={() => deleteTask(todo.id)}
                      />
                    </div>
                    <div
                      className={`bg-${
                        todo.isCompleted ? "green" : "blue"
                      }-500 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer`}>
                      <Icon
                        size={20}
                        color="#fff"
                        onClick={() =>
                          updateTask(todo.id, {
                            ...todo,
                            isCompleted: !todo.isCompleted,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2 text-gray-400 flex items-center justify-between text-xs">
                <div> {todo.isCompleted ? "Completed" : "In Progress"}</div>
                <div>24 • 10 • 2024</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-2xl w-full">{`No tasks to show`}</div>
      )}
    </div>
  );
};

export default GridItems;
