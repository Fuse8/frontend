import { AppError, ERROR_CODES } from '@shared/core/errors';

type RequestErrorData = {
  error?: {
    code?: string;
    details?: string;
    message?: string;
  };
};

export const createRequestError = ({
  data: requestData,
  error,
}: {
  data: RequestErrorData | unknown;
  error: unknown;
}): AppError => {
  if (
    typeof requestData === 'object' &&
    requestData !== null &&
    'error' in requestData
  ) {
    const requestDataError = requestData as RequestErrorData;

    return {
      type: ERROR_CODES.request,
      data: {
        code: requestDataError.error?.code || ERROR_CODES.unknown,
        details: requestDataError.error?.details || 'Неизвестная ошибка',
        message: requestDataError.error?.message || 'Неизвестная ошибка',
      },
      error,
    };
  }

  return {
    type: ERROR_CODES.request,
    data: {
      code: ERROR_CODES.unknown,
      details: 'Неизвестная ошибка',
      message: 'Неизвестная ошибка',
    },
    error,
  };
};
