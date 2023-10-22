import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import communityReducer from "./slices/community";
import postReducer from "./slices/post";
import tagReducer from "./slices/tag";
import commentReducer from "./slices/comment";
import reportReducer from "./slices/report";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    community: communityReducer,
    post: postReducer,
    tag: tagReducer,
    comment: commentReducer,
    report: reportReducer,
  },
});
