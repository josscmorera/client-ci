import { createSlice } from "@reduxjs/toolkit";

import { logout, authCheck, register, login } from "../thunks/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    loading: false,
    status: null,
    error: "",
  },
  reducers: {
    authSuccess: (state) => {
      state.isAuth = true;
    },
    authFailure: (state) => {
      state.isAuth = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetUser: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authCheck.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.data;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        error: "",
        loading: false,
        isAuth: true,
      };
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        error: "",
        loading: false,
        isAuth: true,
      };
    });
  },
});

export const {
  authSuccess,
  authFailure,
  resetStatus,
  resetUser,
  setMessage,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
