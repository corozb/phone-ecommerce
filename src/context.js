import React, { useState, useEffect } from 'react'

import { storeProducts, detailProduct } from './data'

export const ProductContext = React.createContext()

export const ProductProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  })

  const getProducts = () => {
    let products = []
    storeProducts.forEach((item) => {
      const singleItem = { ...item }

      products = [...products, singleItem]
    })

    return setState({ ...state, products })
  }

  const getItem = (id) => {
    const product = state.products.find((item) => item.id === id)
    return product
  }

  const handleDetail = (id) => {
    const product = getItem(id)

    setState({ ...state, detailProduct: product })
    addTotals()
  }

  const addToCart = (id) => {
    let tempProducts = [...state.products]

    const index = tempProducts.indexOf(getItem(id))
    const product = tempProducts[index]
    product.inCart = true
    product.count = 1

    const price = product.price
    product.total = price
    setState({ ...state, tempProducts, cart: state.cart.push(product) })

    addTotals()
  }

  const openModal = (id) => {
    const product = getItem(id)
    setState({ ...state, modalProduct: product, modalOpen: true })
  }

  const closeModal = () => setState({ ...state, modalOpen: false })

  const increment = (id) => {
    let tempCart = [...state.cart]
    const selectedProduct = tempCart.find((item) => item.id === id)

    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]

    product.count = product.count + 1
    product.total = product.count * product.price

    setState({ ...state, cart: [...tempCart] })
    addTotals()
  }

  const decrement = (id) => {
    let tempCart = [...state.cart]
    const selectedProduct = tempCart.find((item) => item.id === id)

    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]

    product.count = product.count - 1

    if (product.count === 0) {
      removeItem(id)
    } else {
      product.total = product.count * product.price

      setState({ ...state, cart: [...tempCart] })
      addTotals()
    }
  }

  const getTotals = () => {
    let subTotal = 0
    state.cart.map((item) => (subTotal += item.total))
    const tempTax = subTotal * 0.1
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax

    return {
      subTotal,
      tax,
      total,
    }
  }

  const addTotals = () => {
    const totals = getTotals()
    setState({ ...state, cartSubTotal: totals.subTotal, cartTax: totals.tax, cartTotal: totals.total })
  }

  const removeItem = (id) => {
    let tempProducts = [...state.products]
    let tempCart = [...state.cart]

    const index = tempProducts.indexOf(getItem(id))
    let removedProduct = tempProducts[index]
    removedProduct.inCart = false
    removedProduct.count = 0
    removedProduct.total = false

    tempCart = tempCart.filter((item) => item.id !== id)

    const totals = getTotals()

    setState({
      ...state,
      cart: tempCart,
      products: [...tempProducts],
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total,
    })
  }

  const clearCart = () => {
    const products = state.products.map((item) => ({
      ...item,
      inCart: (item.inCart = false),
    }))

    setState({ ...state, cart: [], cartSubTotal: 0, cartTax: 0, cartTotal: 0, products })
  }

  useEffect(() => {
    getProducts()
  }, []) // eslint-disable-line

  return (
    <ProductContext.Provider
      value={{
        ...state,
        getItem,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        increment,
        decrement,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
