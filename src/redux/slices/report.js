import { createSlice } from "@reduxjs/toolkit";

import {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from "../thunks/report";
import {
  addItemArray,
  groupAndCountReports,
  replacleItemArray,
} from "../../helpers/functions";

const initialState = {
  reports: [],
  report: {},
  loading: false,
  error: "",
  loadingSave: false,
  errorSave: "",
  status: null,
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetReport: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getReports.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      return {
        reports: groupAndCountReports(action.payload.data),
        loading: false,
        error: "",
      };
    });
    builder.addCase(getReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getReport.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReport.fulfilled, (state, action) => {
      return {
        ...state,
        report: action.payload.data,
        loading: false,
        error: "",
      };
    });
    builder.addCase(createReport.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(createReport.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(createReport.fulfilled, (state, action) => {
      return {
        ...state,
        report: action.payload.data,
        reports: addItemArray(state.reports, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(updateReport.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(updateReport.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(updateReport.fulfilled, (state, action) => {
      return {
        ...state,
        report: action.payload.data,
        reports: replacleItemArray(state.reports, action.payload.data),
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
    builder.addCase(deleteReport.rejected, (state, action) => {
      state.loadingSave = false;
      state.errorSave = action.payload;
    });
    builder.addCase(deleteReport.pending, (state) => {
      state.loadingSave = true;
      state.errorSave = "";
    });
    builder.addCase(deleteReport.fulfilled, (state, action) => {
      return {
        ...state,
        report: action.payload.data,
        status: "fulfilled",
        loadingSave: false,
        errorSave: "",
      };
    });
  },
});

export const { resetStatus, setMessage, resetReport } = reportSlice.actions;

export default reportSlice.reducer;
