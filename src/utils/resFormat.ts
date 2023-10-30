export default {
  successData: (status: number, message: string, data: any) => ({
    status,
    success: true,
    message,
    data,
  }),
  success: (status: number, message: string) => ({
    status,
    success: true,
    message,
  }),
  fail: (status: number, message: string) => ({
    status,
    success: false,
    message,
  }),
  failData: (status: number, message: string, errors: any) => ({
    status,
    success: false,
    message,
    errors,
  }),
};
