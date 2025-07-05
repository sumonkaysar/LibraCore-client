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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useEditBookMutation,
  useGetBookByIdQuery,
} from "../../redux/api/baseApi";
import type { TCreateBook } from "../../types/book.type";
import type { TError } from "../../types/response.type";

const UpdateBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: bookData,
    isLoading: bookLoading,
    isError: bookLoadingError,
    error: bookError,
  } = useGetBookByIdQuery(id!);
  const [editBook, { isLoading: updateLoading }] = useEditBookMutation();

  const form = useForm<TCreateBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
    },
  });

  const onSubmit: SubmitHandler<TCreateBook> = async (data: TCreateBook) => {
    try {
      data.copies = Number(data.copies);
      await editBook({ id, data } as {
        id: string;
        data: Partial<TCreateBook>;
      }).unwrap();
      toast.success(`${data.title} is added successfully`);
      navigate("/books");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something Went Wrong!");
    }
  };

  useEffect(() => {
    if (bookData?.data) {
      const book = bookData.data;
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [bookData, form]);

  if (bookLoadingError) {
    const error = bookError as TError;
    switch (error.status) {
      case 404:
        return (
          <p className="text-center mt-10 text-red-500 font-semibold text-xl py-10">
            {error.data.message}
          </p>
        );
      default:
        return (
          <p className="text-center mt-10 text-red-500 font-semibold text-xl py-10">
            Something Went Wrong!!
          </p>
        );
    }
  }

  if (bookLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 shadow-2xl mt-10 mb-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            rules={{ required: "Title is required" }}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Title<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Book Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: "Author is required" }}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Author<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Author Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: "Genre is required" }}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Genre<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: "ISBN is required" }}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  ISBN<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="ISBN Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            rules={{ required: "Copies is required" }}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="gap-0">
                  Copies<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of copies"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBookForm;
