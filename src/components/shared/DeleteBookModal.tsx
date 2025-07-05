/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDeleteBookMutation } from "../../redux/api/baseApi";

interface DeleteBookModalProps {
  bookId: string;
  redirectTo?: string;
  closeModal: () => void;
}

const DeleteBookModal = ({
  bookId,
  redirectTo,
  closeModal,
}: DeleteBookModalProps) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Deleted successfully");
      closeModal();
      if (redirectTo) navigate(redirectTo);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Something Went Wrong!");
    }
  };

  return (
    <Dialog open={!!bookId} onOpenChange={closeModal}>
      <DialogContent className="bg-white border-0">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className="mt-1">
            This action will permanently delete this book from the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="block mt-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="cursor-pointer mr-4"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
