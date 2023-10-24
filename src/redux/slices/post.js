import { createSlice } from "@reduxjs/toolkit";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
} from "../thunks/post";
import {
  addItemArray,
  removeItemArray,
  replacleItemArray,
} from "../../helpers/functions";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: "",
  loadingSave: false,
  errorSave: "",
  status: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetPost: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        posts: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(createPost.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        posts: addItemArray(state.posts, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        posts: replacleItemArray(state.posts, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        posts: removeItemArray(state.posts, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(upvotePost.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(upvotePost.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(upvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        posts: replacleItemArray(state.posts, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(downvotePost.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(downvotePost.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(downvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.data,
        posts: replacleItemArray(state.posts, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
  },
});

export const { resetStatus, setMessage, resetPost } = postSlice.actions;

export default postSlice.reducer;
