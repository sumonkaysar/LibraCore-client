import { useState } from "react";
import { Link } from "react-router";
import { useGetBooksQuery } from "../../redux/api/baseApi";
import type { TBook } from "../../types/book.type";
import DeleteBookModal from "../shared/DeleteBookModal";
import BookCard from "./BookCard";

const HomeBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [currentDeleteBookId, setCurrentDeleteBookId] = useState<string | null>(
    null
  );

  const openDeleteModal = (bookId: string) => setCurrentDeleteBookId(bookId);
  const closeDeleteModal = () => setCurrentDeleteBookId(null);

  if (isLoading) {
    return <p className="text-center py-10">Loading books...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load books.</p>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="w-11/12 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          📚 Featured Books
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.slice(0, 12)?.map((book: TBook) => (
            <BookCard
              book={book}
              key={book._id}
              openDeleteModal={openDeleteModal}
            />
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/books"
            className="inline-block bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            View All Books
          </Link>
        </div>
      </div>

      {currentDeleteBookId && (
        <DeleteBookModal
          bookId={currentDeleteBookId}
          closeModal={closeDeleteModal}
        />
      )}
    </section>
  );
};

export default HomeBooks;
