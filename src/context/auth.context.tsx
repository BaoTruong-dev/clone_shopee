import { createContext, useState } from 'react'
import { getAccessTokenLS } from 'src/utils/auth.ls'
interface AuthContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValue: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenLS()),
  setIsAuthenticated: () => null
}

export const AuthContext = createContext<AuthContextInterface>(initialValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue.isAuthenticated)
  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}
