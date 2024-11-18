import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { database } from "../firebase/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createTodo,
  deleteTodo,
  setCategories,
  setTodos,
  updateTodo,
} from "../redux/todosReducer";
import { ICategory, ITodo } from "../types";

const useFirestore = () => {
  const dispatch = useAppDispatch();

  const todosList = useAppSelector((state) => state.todos);
  const categoriesList = useAppSelector((state) => state.categories);

  // USE EFFECT
  useEffect(() => {
    getTodosList();
    getCategoriesList();
  }, []);

  // FETCHING DATA
  const getCategoriesList = async () => {
    const categoriesCollection = collection(database, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categories = categoriesSnapshot.docs.map((category) => ({
      id: category.id,
      ...category.data(),
    }));

    dispatch(setCategories(categories));
  };

  const getTodosList = async () => {
    const tasksCollection = collection(database, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasks = tasksSnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data(),
    }));

    dispatch(setTodos(tasks));
  };

  // CRUD OPERATIONS
  const createTask = async (todo: ITodo) => {
    const todosCollection = collection(database, "tasks");
    const todoDocument = await addDoc(todosCollection, todo);

    dispatch(createTodo(todo));
    getTodosList();
    return todoDocument;
  };

  const updateTask = async (
    todoID: string,
    newData: { [key: string]: string | boolean }
  ) => {
    const selectedTask = doc(database, "tasks", todoID);
    await updateDoc(selectedTask, newData);

    dispatch(updateTodo({ todoID, newData }));
    getTodosList();
  };

  const deleteTask = async (todoID: string) => {
    const selectedTask = doc(database, "tasks", todoID);
    await deleteDoc(selectedTask);

    dispatch(deleteTodo(todoID));
    getTodosList();
  };

  const updateCategory = async (categoryID: string) => {
    const selectedCategory = doc(database, "categories", categoryID);
    const categorySnap = await getDoc(selectedCategory);
    const fullData = categorySnap?.data();
    const currentNumber = fullData?.tasksNumber;

    await updateDoc(selectedCategory, {
      ...selectedCategory,
      tasksNumber: currentNumber + 1,
    });

    getCategoriesList();
  };

  //TODO =======================================================================

  const createCategory = async (category: ICategory) => {
    try {
      const categoryRef = collection(database, "categories");
      const document = await addDoc(categoryRef, category);
      return document;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return {
    dispatch,
    todosList,
    categoriesList,
    createTask,
    updateTask,
    deleteTask,
    createCategory,
    updateCategory,
  };
};

export default useFirestore;
