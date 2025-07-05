import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useGetBookByIdQuery } from "../../redux/api/baseApi";
import DeleteBookModal from "../shared/DeleteBookModal";

const BookDetailsSection = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const [currentDeleteBookId, setCurrentDeleteBookId] =
    useState<boolean>(false);

  const openDeleteModal = () => setCurrentDeleteBookId(true);
  const closeDeleteModal = () => setCurrentDeleteBookId(false);

  if (isLoading) {
    return <p className="text-center py-10">Loading book details...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load book.</p>
    );
  }

  const book = data?.data;

  return (
    <div className="py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">📖 Book Details</h1>
      <div className="bg-white shadow-[0px_3px_8px_0px_#ccc] rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Genre:</span>{" "}
            {book.genre}
          </div>
          <div>
            <span className="font-medium text-gray-700">ISBN:</span> {book.isbn}
          </div>
          <div>
            <span className="font-medium text-gray-700">Copies:</span>{" "}
            {book.copies}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-700">Available:</span>
            {book.available ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        {book.description && (
          <div className="mt-4">
            <p className="font-medium text-gray-700">Description:</p>
            <p className="text-sm text-gray-600 mt-1">{book.description}</p>
          </div>
        )}
        <div className="flex gap-3 mt-6">
          <Link
            to={`/edit-book/${book._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
          >
            Edit Book
          </Link>
          <Link
            to={`/borrow/${book._id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Borrow Book
          </Link>
          <button
            onClick={openDeleteModal}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
          >
            Delete Book
          </button>
        </div>
      </div>
      {currentDeleteBookId && (
        <DeleteBookModal
          bookId={id as string}
          closeModal={closeDeleteModal}
          redirectTo="/books"
        />
      )}
    </div>
  );
};

export default BookDetailsSection;
