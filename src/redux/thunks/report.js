import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";

export const getReports = createAsyncThunk(
  "report/getReports",
  async (_, thunkAPI) => {
    try {
      let response = await Axios.get("/reports");

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

export const getReport = createAsyncThunk(
  "report/getReport",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.get(`/reports/${id}`);

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

export const createReport = createAsyncThunk(
  "report/createReport",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.post("/reports/new", data);

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

export const updateReport = createAsyncThunk(
  "report/updateReport",
  async (data, thunkAPI) => {
    try {
      let response = await Axios.put(`/reports/${data.id}`, data);

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

export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (id, thunkAPI) => {
    try {
      let response = await Axios.delete(`/reports/${id}`);

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
