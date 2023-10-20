import { createSlice } from "@reduxjs/toolkit";

import {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
} from "../thunks/tag";
import { addItemArray, replacleItemArray } from "../../helpers/functions";

const initialState = {
  tags: [],
  tag: {},
  loading: false,
  error: "",
  loadingSave: false,
  errorSave: "",
  status: null,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetTag: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTags.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      return {
        tags: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(getTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTag.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTag.fulfilled, (state, action) => {
      return {
        ...state,
        tag: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(createTag.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(createTag.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(createTag.fulfilled, (state, action) => {
      return {
        ...state,
        tag: action.payload.data,
        tags: addItemArray(state.tags, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(updateTag.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updateTag.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
      return {
        ...state,
        tag: action.payload.data,
        tags: replacleItemArray(state.tags, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(deleteTag.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(deleteTag.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(deleteTag.fulfilled, (state, action) => {
      return {
        ...state,
        tag: action.payload.data,
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
  },
});

export const { resetStatus, setMessage, resetTag } = tagSlice.actions;

export default tagSlice.reducer;
