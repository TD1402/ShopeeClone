import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constans/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FromError>(error: unknown): error is AxiosError<FromError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
