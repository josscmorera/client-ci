import { createSlice, current } from "@reduxjs/toolkit";

import {
  getCommunities,
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
} from "../thunks/community";
import { addItemArray, replacleItemArray } from "../../helpers/functions";

const initialState = {
  communities: [],
  community: {},
  loading: false,
  error: "",
  loadingSave: false,
  errorSave: "",
  status: null,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetCommunity: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommunities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCommunities.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCommunities.fulfilled, (state, action) => {
      return {
        communities: action.payload.data,
        //status: "fulfilled",
        loading: false,
        error: "",
      };
    });
    builder.addCase(getCommunity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCommunity.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCommunity.fulfilled, (state, action) => {
      return {
        ...state,
        community: action.payload.data,
        status: "fulfilled",
        loading: false,
        error: "",
      };
    });
    builder.addCase(createCommunity.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(createCommunity.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(createCommunity.fulfilled, (state, action) => {
      const communities = current(state.communities);
      return {
        ...state,
        community: action.payload.data,
        communities: addItemArray(communities, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(updateCommunity.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updateCommunity.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updateCommunity.fulfilled, (state, action) => {
      return {
        ...state,
        community: action.payload.data,
        communities: replacleItemArray(state.communities, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(deleteCommunity.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(deleteCommunity.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(deleteCommunity.fulfilled, (state, action) => {
      return {
        ...state,
        community: action.payload.data,
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(joinCommunity.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(joinCommunity.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(joinCommunity.fulfilled, (state, action) => {
      return {
        ...state,
        community: action.payload.data,
        communities: replacleItemArray(state.communities, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(leaveCommunity.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(leaveCommunity.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(leaveCommunity.fulfilled, (state, action) => {
      return {
        ...state,
        community: action.payload.data,
        communities: replacleItemArray(state.communities, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
  },
});

export const { resetStatus, setMessage, resetCommunity } =
  communitySlice.actions;

export default communitySlice.reducer;
