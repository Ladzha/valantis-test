import React from 'react'

const BrandSelector = (brands) => {
  return (
    <div>
      {brands ? 
      <select name="" id="">
        {brands.map((brand)=>{
          <option value={brand}>{brand}</option>
        })
        }
      </select> : null}
    </div>
  )
}

export default BrandSelector