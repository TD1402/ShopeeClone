import { Auth } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<Auth>('/register', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<Auth>('/login', body)
