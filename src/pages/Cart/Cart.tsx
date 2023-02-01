import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import produce from 'immer'
import { purchasesApi } from 'src/apis/purchases.api'
import MainButton from 'src/components/MainButton/MainButton'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { PurchasesAddItem, PurchasesCart } from 'src/types/purchases.type'

interface PurchasesCartExtended extends PurchasesCart {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [cartPurchaseList, setCartPurchaseList] = useState<PurchasesCartExtended[]>([])
  const { data: cartPurchase } = useQuery({
    queryKey: ['purchases', { status: -1 }],
    queryFn: () => purchasesApi.getCart(-1),
    staleTime: Infinity
  })
  const updateCartMutation = useMutation({
    mutationFn: (data: PurchasesAddItem) => purchasesApi.updateCart(data),
    onSuccess: () => {}
  })
  useEffect(() => {
    cartPurchase &&
      setCartPurchaseList(
        cartPurchase.data.data.map((e) => {
          return {
            ...e,
            disabled: false,
            checked: false
          }
        })
      )
  }, [cartPurchase])
  const isCheckedAll = useMemo<boolean>(() => cartPurchaseList.every((e) => e.checked), [cartPurchaseList])
  const cartPurchaseCheckedList = useMemo<PurchasesCartExtended[]>(
    () => cartPurchaseList.filter((e) => e.checked),
    [cartPurchaseList]
  )
  const totalMoney = useMemo<number>(
    () => cartPurchaseCheckedList.reduce((initial, value) => (initial += value.price * value.buy_count), 0),
    [cartPurchaseCheckedList]
  )
  const totalMoneyDiscount = useMemo<number>(
    () =>
      cartPurchaseCheckedList.reduce((initial, value) => (initial += value.price_before_discount * value.buy_count), 0),
    [cartPurchaseCheckedList]
  )
  const handleChangeCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    setCartPurchaseList((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          checked: value
        }
      })
    })
  }
  const handleQuantityFunc = (data: PurchasesAddItem) => {
    updateCartMutation.mutate(data)
  }
  const handleChangeChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    setCartPurchaseList((prev) => {
      return produce(prev, (draft) => {
        draft[index].checked = value
      })
    })
  }
  return (
    <div>
      <div className='container'>
        <div className='my-4 grid grid-cols-12 rounded-sm px-8 py-6 text-sm shadow-md'>
          <div className='col-span-5 flex items-center gap-4'>
            <input
              type='checkbox'
              className='h-4 w-4 accent-primary'
              checked={isCheckedAll}
              onChange={handleChangeCheckedAll}
            />
            <div>Sản Phẩm</div>
          </div>
          <div className='col-span-7'>
            <div className='grid grid-cols-5 text-stone-500'>
              <div className='col-span-2 text-center'>Đơn giá</div>
              <div className='col-span-1 text-center'>Số lượng</div>
              <div className='col-span-1 text-center'>Số tiền</div>
              <div className='col-span-1 text-center'>Thao tác</div>
            </div>
          </div>
        </div>
        {cartPurchaseList &&
          cartPurchaseList.map((e, index) => {
            return (
              <div key={e._id} className='mb-4 rounded-sm px-3 py-6 text-sm shadow-md'>
                <div className=' grid grid-cols-12 border border-stone-200 px-5 py-4'>
                  <div className='col-span-5 flex items-center gap-4'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 accent-primary'
                      checked={e.checked}
                      onChange={handleChangeChecked(index)}
                    />
                    <div className='flex gap-4'>
                      <img
                        src={e.product.image}
                        alt={e.product.name}
                        className='h-20 w-20 flex-shrink-0 object-cover'
                      />
                      <p className='h-max max-w-[60%] line-clamp-2'>{e.product.name}</p>
                    </div>
                  </div>
                  <div className='col-span-7'>
                    <div className='grid h-full grid-cols-5 '>
                      <div className='col-span-2 flex items-center justify-center gap-4'>
                        <p className='text-stone-500 line-through'>
                          ₫{new Intl.NumberFormat('de-DE').format(e.price_before_discount)}
                        </p>
                        <p>₫{new Intl.NumberFormat('de-DE').format(e.price)}</p>
                      </div>
                      <div className='col-span-1 flex items-center justify-center'>
                        <QuantityController
                          max={e.product.quantity}
                          quantity={e.buy_count}
                          handleFunc={handleQuantityFunc as () => void}
                        />
                      </div>
                      <div className='col-span-1 flex items-center justify-center text-primary'>
                        ₫{new Intl.NumberFormat('de-DE').format(e.price * e.buy_count)}
                      </div>
                      <div className='col-span-1 flex items-center justify-center'>Xoá</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        <div className='sticky bottom-0 my-4 grid grid-cols-12 rounded-sm border-t-[1px] border-dashed border-stone-300 bg-white px-8 py-6 text-sm shadow-md'>
          <div className='col-span-5 flex items-center'>
            <div className='col-span-5 flex items-center gap-4'>
              <input
                type='checkbox'
                className='h-4 w-4 accent-primary'
                checked={isCheckedAll}
                onChange={handleChangeCheckedAll}
              />
              <div className='text-[16px]'>Chọn Tất Cả ({cartPurchaseList?.length})</div>
              <div className='text-[16px]'>Xoá</div>
            </div>
          </div>
          <div className='col-span-7'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3 flex flex-col justify-between'>
                <div className='gap flex items-center justify-end gap-2'>
                  <p className='text-[16px]'>Tổng thanh toán sản phẩm ({cartPurchaseCheckedList.length}): </p>
                  <p className='text-[24px] text-primary'>₫{new Intl.NumberFormat('de-DE').format(totalMoney)}</p>
                </div>
                <div className='flex justify-end gap-4'>
                  <p>Tiết kiệm</p>
                  <p className='text-primary'>
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(totalMoneyDiscount).toLowerCase()}
                  </p>
                </div>
              </div>
              <div className='col-span-2'>
                <MainButton className='!w-full'>Mua hàng</MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
