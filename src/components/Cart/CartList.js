import React from 'react'
import CartItem from './CartItem'

const CartList = ({ state }) => {
  const { cart } = state

  return (
    <div className='container-fluid'>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} state={state} />
      ))}
    </div>
  )
}

export default CartList
