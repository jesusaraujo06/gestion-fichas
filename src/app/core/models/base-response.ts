export interface BaseResponse<T> {
  isSuccess: boolean,
  data: T,
  message: string | null,
  isException: boolean,
  exceptionMessage: string | null,
}

export interface BaseError {
  nombrePropiedad?: string;
  mensajeError?: string;
}

export interface BaseError {
  nombrePropiedad?: string;
  mensajeError?: string;
}

