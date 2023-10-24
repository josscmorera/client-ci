import { createSlice, current } from "@reduxjs/toolkit";

import {
  getUser,
  updateUser,
  followUser,
  unfollowUser,
  donateCoins,
  getUsers,
} from "../thunks/user";
import { copy } from "../../helpers/functions";

const initialState = {
  user: null,
  users: [],
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
        users: current(state).users,
        user: action.payload.data,
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
      const user = copy(current(state).user);
      return {
        user,
        users: current(state).users,
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
      const user = copy(current(state).user);
      user.followers.push(action.payload.data._id);
      return {
        user: user,
        users: current(state).users,
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
      const user = copy(current(state).user);
      const index = user.followers.indexOf(action.payload.data._id);
      user.followers.splice(index, 1);
      return {
        user: user,
        users: current(state).users,
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
      const user = current(state).user;
      return {
        user,
        users: current(state).users,
        status: "fulfilled",
        errorSave: "",
        loadingSave: false,
      };
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return {
        users: action.payload.data,
        error: "",
        loading: false,
      };
    });
  },
});

export const { setUser, resetStatus, setMessage, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
