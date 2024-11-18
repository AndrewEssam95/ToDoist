import { createSlice } from "@reduxjs/toolkit";
import { ICategory, ITodo } from "../types";

type TInitialState = {
  todos: ITodo[];
  categories: ICategory[];
};

const initialState: TInitialState = {
  todos: [],
  categories: [],
};

const todosReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { todoID, newData } = action.payload;

      state.todos = state.todos.map((todo) => {
        if (todo.id === todoID) {
          return { id: todoID, ...newData };
        } else {
          return { ...todo };
        }
      });
    },
    createTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
  },
});

export const { setTodos, setCategories, deleteTodo, updateTodo, createTodo } =
  todosReducer.actions;
export default todosReducer.reducer;
