import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../../lib/Axios";
import { checkAuthToken } from "../../lib/checkAuthToken";
import { resetUser, setMessage, setUser } from "../slices/user";

export const authCheck = createAsyncThunk(
  "auth/authCheck",
  async (_, thunkAPI) => {
    try {
      const hasToken = checkAuthToken();

      if (!hasToken) {
        return thunkAPI.rejectWithValue();
      }

      let response = await Axios.get("/users/authtoken");

      thunkAPI.dispatch(setUser(response.data));

      localStorage.setItem("clientToken", response.data.token);

      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setMessage(error.response.message));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      let response = await Axios.post("/users/register", userData);

      localStorage.setItem("clientToken", response.data.token);

      thunkAPI.dispatch(authSuccess());

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

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      delete Axios.defaults.headers.common["Authorization"];

      let response = await Axios.post("/users/login", userData);

      localStorage.setItem("clientToken", response.data.token);

      thunkAPI.dispatch(authSuccess());

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

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) => {
  try {
    localStorage.removeItem("clientToken");
    thunkAPI.dispatch(resetUser());
  } catch (error) {
    console.log(error);
  }
});
