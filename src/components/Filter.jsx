import React, {useState, useEffect, useRef} from 'react'
import { Select, MenuItem, InputLabel, FormControl, Autocomplete, TextField   } from '@mui/material';
import useBrands from '../hooks/useBrand.js'

import fetchBrands from '../fetchBrands'

const Filter = () => {
  const [filterBrand, setFilterBrand] = useState('');
  const [input, setInput] = useState('');


  const { brands, isLoading, error } = useBrands()

  // const input = useRef()

  const handleChange=(event)=>{
    setFilterBrand(event.target.value)
  }

  console.log('brands', brands);
  return (
    <div className="filter-container">
      {input}
      <input type="search" name="" id="" placeholder='Найти товар...'
      value={input}
      onSubmit={(event)=>{setInput(event.target.value)}}/>
      {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={allBrands}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Производитель" 
      onChange={handleChange}/>}
    /> */}
      
      {/* <FormControl fullWidth> */}
        {/* <InputLabel id="demo-simple-select-label">Производитель</InputLabel> */}
        <select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={brands}
          // label="Производитель"
          onChange={handleChange}
        >
          <option value='' disabled>Производитель</option>
          {brands.length > 0 && 
          brands.map((brand)=>
            <option
            key={brand} 
            value={brand}>{brand}</option>
          )}
          
        </select>
      {/* </FormControl> */}
    </div>
  )
}
export default Filter