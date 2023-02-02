import { createSlice } from "@reduxjs/toolkit";
import { getTodosAsync, addTodoAsync, toggleTodoAsync, removeTodoAsync, removeCompletedTodosAsync } from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    ///////////////////////////////////////////////
    [addTodoAsync.pending]: (state) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },
    ///////////////////////////////////////////////
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { _id, completed } = action.payload;
      const index = state.todos.findIndex((item) => item._id === _id);
      state.todos[index].completed = completed;
    },
    ///////////////////////////////////////////////
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const filteredIndex = state.todos.findIndex((item) => item._id === id);
      state.todos.splice(filteredIndex, 1);
    },
    ///////////////////////////////////////////////
    [removeCompletedTodosAsync.fulfilled]: (state, action) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      }
  },
});

export const selectTodos = (state) => state.todos.todos;

export const { changeActiveFilter } = todosSlice.actions;

export default todosSlice.reducer;
