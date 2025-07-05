import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { TBorrowSummary } from "../../types/borrow.type";
import type { TError } from "../../types/response.type";

const BorrowSummarySection = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return (
      <div className="space-y-3 mt-10">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold text-xl my-16">
        {(error as TError)?.data?.message || "Something went wrong!"}
      </p>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Borrow Summary</h1>

      {!isLoading && data?.data?.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>📖 Book Title</TableHead>
                <TableHead>📘 ISBN</TableHead>
                <TableHead className="text-right">🔢 Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item: TBorrowSummary, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell className="text-right">
                    {item.totalQuantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-500 mt-4">
            No borrow summary found.
          </p>
        )
      )}
    </div>
  );
};

export default BorrowSummarySection;
