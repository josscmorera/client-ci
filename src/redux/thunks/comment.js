import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.get("/comments", { params: data });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.get(`/comments/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post("/comments/new", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/comments/${data._id}`, data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.delete(`/comments/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const upvoteComment = createAsyncThunk(
  "comment/upvoteComment",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.put(`/comments/${id}/upvote`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);

export const downvoteComment = createAsyncThunk(
  "comment/downvoteComment",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.put(`/comments/${id}/downvote`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          error.response?.message
      );
    }
  }
);
