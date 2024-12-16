import { configureStore } from "@reduxjs/toolkit";
import { booksSlice } from "../features/book/booksSlice";

export default configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});
