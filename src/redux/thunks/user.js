import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (username, thunkAPI) => {
    try {
      let response = await Axios.get(`/users/username/${username}`);
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/users/${data.id}`, data);
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

export const followUser = createAsyncThunk(
  "user/followUser",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post(`/users/${data.id}/follow`, data);
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

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post(`/users/${data.id}/unfollow`, data);
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

export const donateCoins = createAsyncThunk(
  "user/donateCoins",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post(`/users/${data.id}/donate`, data);
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
