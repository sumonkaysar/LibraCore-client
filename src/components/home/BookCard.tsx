import { Link } from "react-router";
import type { TBook } from "../../types/book.type";
import BookActions from "../shared/BookActions";

interface BookCardProps {
  book: TBook;
  openDeleteModal: (bookId: string) => void;
}

const BookCard = ({ book, openDeleteModal }: BookCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_10px_0px_#ccc] hover:shadow-[0_0_10px_0px_#999] p-4 text-left transition-all flex justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <p className="text-xs text-gray-500 mt-1">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-sm mt-2">
          <strong>Copies:</strong> {book.copies}
        </p>
        <Link
          to={`/books/${book._id}`}
          className="inline-block mt-3 text-blue-600 hover:underline text-sm"
        >
          View Details →
        </Link>
      </div>
      <div className="pt-1">
        <BookActions bookId={book._id} openDeleteModal={openDeleteModal} />
      </div>
    </div>
  );
};

export default BookCard;
