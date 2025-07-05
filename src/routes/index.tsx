import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import AddBook from "../pages/AddBook";
import BookDetails from "../pages/BookDetails";
import Books from "../pages/Books";
import BorrowBook from "../pages/BorrowBook";
import BorrowSummary from "../pages/BorrowSummary";
import EditBook from "../pages/EditBook";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "create-book",
        element: <AddBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
