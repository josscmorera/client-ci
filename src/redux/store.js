import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import communityReducer from "./slices/community";
import postReducer from "./slices/post";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    community: communityReducer,
    post: postReducer,
  },
});
