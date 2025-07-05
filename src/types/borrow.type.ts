export type TBorrowFormData = {
  book: string;
  quantity: number;
  dueDate: Date;
};

export type TBorrow = TBorrowFormData & {
  _id: string;
};

export type TBorrowSummary = {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};
