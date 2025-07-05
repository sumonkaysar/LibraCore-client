import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { useGetBooksQuery } from "../../redux/api/baseApi";
import type { TBook } from "../../types/book.type";
import BookActions from "../shared/BookActions";
import DeleteBookModal from "../shared/DeleteBookModal";

const AllBooksSection = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [currentDeleteBookId, setCurrentDeleteBookId] = useState<string | null>(
    null
  );

  const openDeleteModal = (bookId: string) => setCurrentDeleteBookId(bookId);
  const closeDeleteModal = () => setCurrentDeleteBookId(null);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold my-10 text-center">
        📚 All Books
      </h2>
      {isLoading && <p className="text-center">Loading books...</p>}
      {isError && (
        <p className="text-red-500 text-center">Failed to load books.</p>
      )}

      {!isLoading && !isError && (
        <div className="border-y overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead className="text-center">Copies</TableHead>
                <TableHead className="text-center">Availability</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.length > 0 ? (
                data.data.map((book: TBook) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell className="text-center">{book.copies}</TableCell>
                    <TableCell>
                      {book.available ? (
                        <CircleCheck className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <BookActions
                        bookId={book._id}
                        openDeleteModal={openDeleteModal}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {currentDeleteBookId && (
            <DeleteBookModal
              bookId={currentDeleteBookId}
              closeModal={closeDeleteModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooksSection;
