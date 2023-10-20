import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getCommunities = createAsyncThunk(
  "community/getCommunities",
  async (_, thunkAPI) => {
    try {
      let response = await Axios.get("/communities");

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

export const getCommunity = createAsyncThunk(
  "community/getCommunity",
  async (slug, thunkAPI) => {
    try {
      let response = await Axios.get(`/communities/slug/${slug}`);

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

export const createCommunity = createAsyncThunk(
  "community/createCommunity",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post("/communities/new", data);

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

export const updateCommunity = createAsyncThunk(
  "community/updateCommunity",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/communities/${data.id}`, data);

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

export const deleteCommunity = createAsyncThunk(
  "community/deleteCommunity",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.delete(`/communities/${id}`);

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

export const joinCommunity = createAsyncThunk(
  "community/joinCommunity",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.post(`/communities/${id}/join`);

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

export const leaveCommunity = createAsyncThunk(
  "community/leaveCommunity",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.post(`/communities/${id}/leave`);

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
