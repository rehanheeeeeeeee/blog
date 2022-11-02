import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./articlesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
