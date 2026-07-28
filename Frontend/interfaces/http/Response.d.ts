import { User } from "./DataTypes"

export default interface ResponseDefault<T>{
  statusCode: number
  httpStatus: string,
  message: string,
  timeStamp: string,
  data?: T
}

export interface tokenResponse {
  id: string,
  userId: string,
  token: string,
  tokenHash: string,
  expiresAt: string
}