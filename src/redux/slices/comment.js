import { createSlice } from "@reduxjs/toolkit";

import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
} from "../thunks/comment";
import {
  replaceItemContent,
  replaceUpvotesComment,
  replacleItemArray,
  searchAndAddReplyItem,
  serchAndRemoveReplyItem,
  sortComments,
} from "../../helpers/functions";

const initialState = {
  comments: [],
  comment: {},
  loading: false,
  error: "",
  loadingSave: false,
  errorSave: "",
  status: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetComment: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.comments = [];
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      return {
        comments: sortComments(action.payload.data),
        loading: false,
        error: "",
      };
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getComment.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(createComment.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data,
        comments: searchAndAddReplyItem(state.comments, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data,
        comments: replaceItemContent(state.comments, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: serchAndRemoveReplyItem(state.comments, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(upvoteComment.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(upvoteComment.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(upvoteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data,
        comments: replaceUpvotesComment(state.comments, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(downvoteComment.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(downvoteComment.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(downvoteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comment: action.payload.data,
        comments: replaceUpvotesComment(state.comments, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
  },
});

export const { resetStatus, setMessage, resetComment } = commentSlice.actions;

export default commentSlice.reducer;
