/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
    data: any;
  };
};

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    error: any;
  };
};
