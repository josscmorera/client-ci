import { createSlice } from "@reduxjs/toolkit";

import {
  getUser,
  updateUser,
  followUser,
  unfollowUser,
  donateCoins,
} from "../thunks/user";

const initialState = {
  user: null,
  status: null,
  error: "",
  loading: false,
  loadingSave: false,
  errorSave: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        message: "",
      };
    },
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        error: "",
        loading: false,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        errorSave: "",
        loadingSave: false,
      };
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(followUser.pending, (state, action) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        errorSave: "",
        loadingSave: false,
      };
    });
    builder.addCase(unfollowUser.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(unfollowUser.pending, (state, action) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      return {
        user: action.payload.data,
        status: "fulfilled",
        errorSave: "",
        loadingSave: false,
      };
    });
    builder.addCase(donateCoins.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(donateCoins.pending, (state, action) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(donateCoins.fulfilled, (state, action) => {
      return {
        status: "fulfilled",
        errorSave: "",
        loadingSave: false,
      };
    });
  },
});

export const { setUser, resetStatus, setMessage, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
