import { createContext, useState } from 'react'
import { PurchasesCart, PurchasesCartExtended } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenLS, getUserInfoLS } from 'src/utils/auth.ls'
interface AuthContextInterface {
  isAuthenticated: boolean
  userInfo: User | null
  purchasesCart: PurchasesCartExtended[] | []
  setPurchasesCart: React.Dispatch<React.SetStateAction<PurchasesCartExtended[] | []>>
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAuthValue: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenLS()),
  userInfo: getUserInfoLS(),
  purchasesCart: [],
  setPurchasesCart: () => null,
  setIsAuthenticated: () => null,
  setUserInfo: () => null
}

export const AuthContext = createContext<AuthContextInterface>(initialAuthValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthValue.isAuthenticated)
  const [userInfo, setUserInfo] = useState<User | null>(initialAuthValue.userInfo)
  const [purchasesCart, setPurchasesCart] = useState<PurchasesCartExtended[] | []>([])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo, purchasesCart, setPurchasesCart }}
    >
      {children}
    </AuthContext.Provider>
  )
}
