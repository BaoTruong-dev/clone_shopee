import { useMutation } from '@tanstack/react-query'
import produce from 'immer'
import _ from 'lodash'
import React, { useContext, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { purchasesApi } from 'src/apis/purchases.api'
import MainButton from 'src/components/MainButton/MainButton'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { PurchasesContext } from 'src/context/purchasesCart.context'
import { PurchasesAddItem, PurchasesCart, PurchasesCartExtended } from 'src/types/purchases.type'
import empty_cart from '../../assets/cart.png'
export default function Cart() {
  const { purchasesCart, setPurchasesCart, quantityOnType, setQuantityOnType, refetch } = useContext(PurchasesContext)
  const timer = useRef<NodeJS.Timeout | number>(0)
  const updateCartMutation = useMutation({
    mutationFn: (data: PurchasesAddItem) => purchasesApi.updateCart(data),
    onSuccess: () => {
      refetch()
    }
  })

  const buyCartMutation = useMutation({
    mutationFn: (data: PurchasesAddItem[]) => purchasesApi.buyCart(data),
    onSuccess: () => {
      refetch()
    }
  })
  const deleteCartMutation = useMutation({
    mutationFn: (data: string[]) => purchasesApi.deleteCart(data),
    onSuccess: () => {
      refetch()
    }
  })

  const quantityOnTypeValue = useMemo(() => quantityOnType, [quantityOnType])
  const isCheckedAll = useMemo<boolean>(() => purchasesCart?.every((e) => e.checked), [purchasesCart])
  const cartPurchaseCheckedList = useMemo<PurchasesCartExtended[]>(
    () => purchasesCart.filter((e) => e.checked),
    [purchasesCart]
  )
  const totalMoney = useMemo<number>(
    () => cartPurchaseCheckedList?.reduce((initial, value) => (initial += value.price * value.buy_count), 0),
    [cartPurchaseCheckedList]
  )
  const totalMoneyDiscount = useMemo<number>(
    () =>
      cartPurchaseCheckedList?.reduce(
        (initial, value) => (initial += (value.price_before_discount - value.price) * value.buy_count),
        0
      ),
    [cartPurchaseCheckedList]
  )
  const itemCheckedList = useMemo<PurchasesCart[]>(() => purchasesCart.filter((e) => e.checked), [purchasesCart])
  const itemCheckedListDelete = useMemo<string[]>(() => itemCheckedList.map((e) => e._id), [itemCheckedList])

  const itemCheckedListBuy = useMemo<PurchasesAddItem[]>(
    () =>
      itemCheckedList.map((e) => {
        return {
          product_id: e.product._id,
          buy_count: e.buy_count
        }
      }),
    [itemCheckedList]
  )

  const handleQuantity = (id: string) => (data: number) => {
    updateCartMutation.mutate({
      product_id: id,
      buy_count: data
    })
  }
  const handleOnType = (id: string, index: number) => (data: number) => {
    clearTimeout(timer.current)
    setQuantityOnType((prev) => {
      const clone = _.cloneDeep(prev)
      clone[index] = data
      return clone
    })
    timer.current = setTimeout(() => {
      updateCartMutation.mutate({
        product_id: id,
        buy_count: data
      })
    }, 300)
  }

  const handleChangeCheckedAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    setPurchasesCart((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          checked: value
        }
      })
    })
  }

  const handleChangeChecked = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked
    setPurchasesCart((prev) => {
      return produce(prev, (draft) => {
        draft[index].checked = value
      })
    })
  }
  const handleDeletePurchases = (id?: string) => {
    if (id) {
      deleteCartMutation.mutate([id])
      return
    }
    deleteCartMutation.mutate(itemCheckedListDelete)
  }
  const handleBuyPurchases = () => {
    itemCheckedListBuy.length > 0 && buyCartMutation.mutate(itemCheckedListBuy)
  }
  if (purchasesCart.length <= 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <img src={empty_cart} alt='empty_cart' width={100} />
        <p className='mt-[20px] text-sm font-bold text-stone-400'>Giỏ hàng của bạn còn trống</p>
        <Link to='/'>
          <MainButton className='text-md mt-[20px] flex h-[36px] w-[160px] items-center justify-center uppercase'>
            Mua ngay
          </MainButton>
        </Link>
      </div>
    )
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
        {purchasesCart &&
          purchasesCart.map((e, index) => {
            const link = `${e.product.name.replace(
              // eslint-disable-next-line no-useless-escape
              /\s|!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
              ''
            )}-i,${e.product._id}`
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
                    <Link to={`/${link}`} className='flex gap-4'>
                      <img
                        src={e.product.image}
                        alt={e.product.name}
                        className='h-20 w-20 flex-shrink-0 object-cover'
                      />
                      <p className='h-max max-w-[60%] line-clamp-2'>{e.product.name}</p>
                    </Link>
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
                          quantity={quantityOnTypeValue[index]}
                          handleQuantity={handleQuantity(e.product._id)}
                          handleOnType={handleOnType(e.product._id, index)}
                        />
                      </div>
                      <div className='col-span-1 flex items-center justify-center text-primary'>
                        ₫{new Intl.NumberFormat('de-DE').format(e.price * e.buy_count)}
                      </div>
                      <button
                        className='col-span-1 flex items-center justify-center hover:text-primary'
                        onClick={() => handleDeletePurchases(e._id)}
                      >
                        Xoá
                      </button>
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
              <div className='text-[16px]'>Chọn Tất Cả ({purchasesCart.length})</div>
              <button className='text-[16px]' onClick={() => handleDeletePurchases()}>
                Xoá
              </button>
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
                <MainButton className='!w-full' onClick={handleBuyPurchases}>
                  Mua hàng
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
