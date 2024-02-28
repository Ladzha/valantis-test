import React from 'react'

const ProductCard = ({id, name, price, brand}) => {
  return (
    <div className='product-card'>
      <div>
      <p className='product-id'>
        <strong>Id: </strong> <span>{id}</span></p>
        <p className='product-name'>{name}</p>
      </div>
      
      <div className='product-info'>
        <span className='product-price'>{price} &#8381;</span>  
        {brand ? <strong className='product-brand'>{brand}</strong> : null}
      </div>
    </div>
  )
}

export default ProductCard