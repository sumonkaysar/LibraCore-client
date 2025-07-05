import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router";

interface BookActionsProps {
  bookId: string;
  openDeleteModal: (bookId: string) => void;
}

const BookActions = ({ bookId, openDeleteModal }: BookActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white">
        <DropdownMenuItem asChild>
          <Link
            to={`/books/${bookId}`}
            className="text-blue-600 hover:underline cursor-pointer w-fit"
          >
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={`/edit-book/${bookId}`}
            className="text-sm text-yellow-600 hover:underline cursor-pointer w-fit"
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={`/borrow/${bookId}`}
            className="text-green-600 hover:underline cursor-pointer w-fit"
          >
            Borrow
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 hover:underline cursor-pointer w-fit"
          onClick={() => openDeleteModal(bookId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookActions;
