import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TCreateBook } from "../../types/book.type";
import type { TBorrowFormData } from "../../types/borrow.type";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://libracore.vercel.app" }),
  tagTypes: ["books", "singleBook", "borrows"],
  endpoints: (build) => ({
    // Book Endpoints
    getBooks: build.query({
      query: () => `/books`,
      providesTags: ["books"],
    }),
    getBookById: build.query({
      query: (id: string) => `/books/${id}`,
      providesTags: ["singleBook"],
    }),
    addBook: build.mutation({
      query: (body: TCreateBook) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: build.mutation({
      query: ({ id, data }: { id: string; data: Partial<TCreateBook> }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["books", "singleBook"],
    }),
    deleteBook: build.mutation({
      query: (id: string) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books", "borrows"],
    }),

    // Borrow Endpoints
    getBorrowSummary: build.query({
      query: () => "/borrow",
      providesTags: ["borrows"],
    }),
    borrowBook: build.mutation({
      query: (body: TBorrowFormData) => ({
        url: `/borrow`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["singleBook", "books", "borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetBorrowSummaryQuery,
  useBorrowBookMutation,
} = baseApi;
