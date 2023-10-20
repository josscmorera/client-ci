import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      let response = await Axios.post("/posts");

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

export const getPost = createAsyncThunk(
  "post/getPost",
  async (slug, thunkAPI) => {
    try {
      let response = await Axios.get(`/posts/slug/${slug}`);

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

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post("/posts/new", data);

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

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/posts/${data.id}`, data);

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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.delete(`/posts/${id}`);

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

export const upvotePost = createAsyncThunk(
  "post/upvotePost",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.post(`/posts/${id}/upvote`);

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

export const downvotePost = createAsyncThunk(
  "post/downvotePost",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.post(`/posts/${id}/downvote`);

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
