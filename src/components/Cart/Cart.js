import React, { useContext } from 'react'
import { ProductContext } from '../../context'
import Title from '../Title'
import CartColumns from './CartColumns'
import CartList from './CartList'
import CartTotals from './CartTotals'
import EmptyCart from './EmptyCart'

function Cart() {
  const state = useContext(ProductContext)

  return (
    <section>
      {state.cart.length > 0 ? (
        <>
          <Title name='your' title='cart' />
          <CartColumns />
          <CartList state={state} />
          <CartTotals state={state} />
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  )
}

export default Cart
