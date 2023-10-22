import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getTags = createAsyncThunk("tag/getTags", async (_, thunkAPI) => {
  try {
    let response = await Axios.get("/tags");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || error.response?.message
    );
  }
});

export const getTag = createAsyncThunk("tag/getTag", async (id, thunkAPI) => {
  try {
    let response = await Axios.get(`/tags/${id}`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || error.response?.message
    );
  }
});

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post("/tags/new", data);

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

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/tags/${data.id}`, data);

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

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.delete(`/tags/${id}`);

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
