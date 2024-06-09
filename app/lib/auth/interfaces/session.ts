import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: number,
  username?: string,
  rol?: string 
}

export const sessionOptions : SessionOptions = {
    password: "mUWAtVS/I0IOR7NMRZNIeKDD2eKf1k4uazd3UApqXKw=",
    cookieName: "fundacion-dario-session",
    cookieOptions :{
      httpOnly: true,
      secure: "development"
    }
} 