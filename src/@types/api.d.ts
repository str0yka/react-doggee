type ApiSuccessResponse<T> = {
  data: T;
  success: true;
};

type ApiFailedResponse = {
  data: { message: string };
  success: false;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailedResponse;
