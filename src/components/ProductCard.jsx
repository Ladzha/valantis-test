import React from 'react'

const ProductCard = ({id, name, price, brand}) => {
  return (
    <div className='product-card'>
      <p>{id}</p>
      <p className='product-name'><strong>{name}</strong></p>
      <p>{price}</p>
      <p>{brand}</p>
    </div>
  )
}

export default ProductCard