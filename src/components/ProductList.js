import { useContext } from 'react'

import { ProductContext } from '../context'
import Product from './Product'
import Title from './Title'

function ProductList() {
  const state = useContext(ProductContext)

  return (
    <>
      <div className='py-5'>
        <div className='container'>
          <div className='row'>
            <Title name='our' title='products' />

            <div className='row'>
              {state.products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList
