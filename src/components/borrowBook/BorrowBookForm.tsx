/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "../../redux/api/baseApi";
import type { TBorrowFormData } from "../../types/borrow.type";

const BorrowBookForm = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data, isLoading: bookLoading } = useGetBookByIdQuery(bookId!);
  const book = data?.data;
  const [borrowBook, { isLoading: isSubmitting }] = useBorrowBookMutation();

  const form = useForm<TBorrowFormData>({
    defaultValues: {
      book: bookId || "",
      quantity: 1,
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    form.setValue("book", bookId || "");
  }, [bookId, form]);

  const onSubmit: SubmitHandler<TBorrowFormData> = async (data) => {
    if (!book) return;
    if (data.quantity > book.copies) {
      form.setError("quantity", {
        type: "manual",
        message: `Only ${book.copies} copies are available`,
      });
      return;
    }

    data.quantity = Number(data.quantity);

    try {
      await borrowBook(data).unwrap();
      toast.success(`${book.title} is added successfully`);
      navigate("/borrow-summary");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something Went Wrong!");
    }
  };

  if (bookLoading)
    return <p className="text-center mt-10">Loading book info...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 shadow-2xl mt-10 mb-16">
      <h1 className="text-lg sm:text-2xl font-bold text-center">
        Borrow: {book?.title}
      </h1>
      <p className="text-sm mb-6 text-center">
        ({book?.copies} copies are available)
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="quantity"
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Minimum 1 copy required" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Quantity <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            rules={{ required: "Due date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Due Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      typeof field.value === "string"
                        ? field.value
                        : field.value?.toISOString().split("T")[0]
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Borrow Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BorrowBookForm;
