import { createContext, useContext } from "react"; //context api

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
