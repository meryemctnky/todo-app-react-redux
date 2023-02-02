import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    try {
      const res = await axios(`${process.env.API_KEY}/todos`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    try {
      const res = await axios.post(`${process.env.API_KEY}/todos`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    try {
      const res = await axios.patch(`${process.env.API_KEY}/todos/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    try {
      const res = await axios.delete(`${process.env.API_KEY}/todos/${id}`);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCompletedTodosAsync = createAsyncThunk(
  "todos/removeCompletedTodosAsync",
  async () => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/todos?completed=true`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

console.log(process.env.API_KEY);