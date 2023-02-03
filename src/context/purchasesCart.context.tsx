import { useQuery } from '@tanstack/react-query'
import { createContext, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { purchasesApi } from 'src/apis/purchases.api'
import { PurchasesCartExtended } from 'src/types/purchases.type'
interface PurchasesContextInterface {
  purchasesCart: PurchasesCartExtended[] | []
  setPurchasesCart: React.Dispatch<React.SetStateAction<PurchasesCartExtended[] | []>>
  quantityOnType: number[]
  setQuantityOnType: React.Dispatch<React.SetStateAction<number[]>>
  refetch: any
}

const initialAuthValue: PurchasesContextInterface = {
  purchasesCart: [],
  quantityOnType: [],
  setPurchasesCart: () => null,
  setQuantityOnType: () => null,
  refetch: () => null
}

export const PurchasesContext = createContext<PurchasesContextInterface>(initialAuthValue)

export const PurchasesProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useLocation()
  const { data: cartPurchase, refetch } = useQuery({
    queryKey: ['purchases', { status: -1 }],
    queryFn: () => purchasesApi.getCart(-1),
    staleTime: Infinity
  })

  const [purchasesCart, setPurchasesCart] = useState<PurchasesCartExtended[] | []>([])
  const [quantityOnType, setQuantityOnType] = useState<number[]>([])
  useLayoutEffect(() => {
    if (cartPurchase) {
      setQuantityOnType(
        cartPurchase.data.data.map((e) => {
          return e.buy_count
        })
      )
      setPurchasesCart(
        cartPurchase.data.data.map((e) => {
          return {
            ...e,
            disabled: false,
            checked: e.product._id === state
          }
        })
      )
    }
  }, [cartPurchase, state])
  return (
    <PurchasesContext.Provider value={{ purchasesCart, setPurchasesCart, quantityOnType, setQuantityOnType, refetch }}>
      {children}
    </PurchasesContext.Provider>
  )
}
