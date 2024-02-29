import React, {useState, useEffect} from 'react'
import { Select, MenuItem, InputLabel, FormControl, Autocomplete, TextField   } from '@mui/material';
import useBrands from '../hooks/useBrand.js';
import useInput from '../hooks/useInput.js';

const Filter = ({onBrandChange, onNameChange, onPriceChange}) => {
  const [userBrand, setUserBrand] = useState('')

  const { brands, isLoading, error } = useBrands()
  const inputName =useInput()
  const inputPrice =useInput()


  const handleBrandChange=(event)=>{
    setUserBrand(event.target.value)
    onBrandChange(event.target.value)
  }
  const handleNameChange=()=>{
    onNameChange()
  }

  const handlePriceChange=()=>{
    onPriceChange()
  }

  return (
    <div className="filter-container">
      <input type="text" 
      placeholder={"Введите название товара..."} 
      className='input-search'
      value={inputName.value}
      onChange={inputName.onChange}
      />
      <input type="number" 
      placeholder={"Введите цену..."} 
      className='input-search'
      value={inputPrice.value}
      onChange={inputPrice.onChange}
      />
      <select name="filter" id='filter' value={userBrand} onChange={handleBrandChange}>
        <option value="">Бренд</option>
        {brands.length > 0 && 
          brands.map((brand)=><option key={brand} value={brand}>{brand}</option>)
        }
      </select> 
    </div>
  )
}
export default Filter