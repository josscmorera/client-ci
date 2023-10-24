import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";
import { setUser } from "../slices/auth";

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
      let response = await Axios.put(`/users/${data._id}`, data);
      thunkAPI.dispatch(setUser(response.data));
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
  async (id, thunkAPI) => {
    try {
      let response = await Axios.put(`/users/${id}/follow`);

      thunkAPI.dispatch(setUser(response.data));

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
  async (id, thunkAPI) => {
    try {
      let response = await Axios.put(`/users/${id}/unfollow`);

      thunkAPI.dispatch(setUser(response.data));

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
      let response = await Axios.put(`/users/${data.user}/donate`, data);

      thunkAPI.dispatch(setUser(response.data));

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

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      console.log("call users");
      let response = await Axios.get(`/users`);

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
