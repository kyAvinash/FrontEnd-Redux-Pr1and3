import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://reduxtoolkit-book-list-onepractice.vercel.app/books";

// async thunk for fetching books

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(URL);
  //console.log(response.data);
  return response.data;
});

export const deleteBookAsync = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    //console.log(id);
    await axios.delete(
      `https://reduxtoolkit-book-list-onepractice.vercel.app/books/${id}`
    );
    return id;
  }
);

export const addBookAsync = createAsyncThunk(
  "books/addBook",
  async (newBook) => {
    const response = await axios.post(URL, newBook);
    return response.data;
  }
);

export const updateBookAsync = createAsyncThunk(
  "books/updateBook",
  async ({ id, updatedBook }) => {
    const response = await axios.put(
      `https://reduxtoolkit-book-list-onepractice.vercel.app/books/${id}`,
      updatedBook
    );
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBookAsync.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book._id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
