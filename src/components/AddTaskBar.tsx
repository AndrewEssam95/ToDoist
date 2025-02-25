import { useState } from "react";
import useFirestore from "./useFirestore";

const AddTaskBar = () => {
  const { categoriesList, createTask, todosList } = useFirestore();

  const lastTaskID =
    todosList.length > 0 ? +todosList[todosList.length - 1].id : -1;
  const currentTaskID = lastTaskID + 1;

  const [taskDetails, setTaskDetails] = useState({
    id: currentTaskID.toString(),
    title: "",
    categoryId: "",
    isCompleted: false,
  });

  return (
    <div className="flex gap-10 flex-col items-start sm:items-center sm:flex-row">
      <div className="space-x-2">
        <label htmlFor="taskTitle">Task title</label>
        <input
          id="taskTitle"
          type="text"
          placeholder="Add new task"
          className="outline-none bg-transparent placeholder-slate-300 text-sm p-1 pl-2 w-36 bg-white rounded-md"
          value={taskDetails.title}
          onChange={(event) =>
            setTaskDetails({ ...taskDetails, title: event.target.value })
          }
        />
      </div>
      <div className="space-x-2">
        <label htmlFor="list">List</label>
        <select
          id="list"
          className="text-xs font-medium p-1 rounded-md"
          onChange={(event) => {
            const categoryId = categoriesList.find(
              (category) => category.title === event.target.value
            )?.id as string;

            setTaskDetails({
              ...taskDetails,
              categoryId: categoryId,
            });
          }}>
          {categoriesList.map((category) => (
            <option key={category.id} id={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-400 p-2 rounded-md text-xs font-medium text-white"
        onClick={() => {
          createTask(taskDetails);
          setTaskDetails({
            id: "",
            title: "",
            categoryId: "",
            isCompleted: false,
          });
        }}>
        Add Task
      </button>
    </div>
  );
};

export default AddTaskBar;
