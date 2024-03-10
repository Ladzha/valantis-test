import {useRef} from 'react'
import useBrands from '../hooks/useBrand.js';
import usePrice from '../hooks/usePrice.js';

const Filter = ({onBrandChange, onSearchChange, onPriceChange}) => {

  const { brands } = useBrands()
  const { prices } = usePrice()

  const searchInput = useRef(null)
  const priceMinInput = useRef(null)
  const priceMaxInput = useRef(null)
  const brandSelect = useRef(null)

  const handleFilter=()=>{
    if(!searchInput && !priceMinInput && !priceMaxInput && !brandSelect){
      console.log('primer');

    }else{
      onBrandChange(brandSelect.current.value)
      onSearchChange(searchInput
        // .current.value.toLowerCase()
        )
      onPriceChange(getPriceRange(priceMinInput.current.value, priceMaxInput.current.value))
    }
  }

  const reset=()=>{
    brandSelect.current.value='';
    searchInput.current.value='';
    priceMinInput.current.value=null;
    priceMaxInput.current.value=null;
  }

  function getPriceRange(min, max){
    if(!min && max){
      min = 2500;
    }
    if(!max && min){
      max = 2350000;
    }
    const priceRange = prices.filter((price)=>{
      if(price >= min && price <= max)
      return price
    }) 
    return priceRange;  
  }

  return (
    <>
    <fieldset className='filter'>
      <legend>Фильтровать</legend>
      <input type="text" 
      id='search'
      placeholder={"Поиск"} 
      ref={searchInput}
      />
      <fieldset className='fieldset-price'>
        <legend>Цена</legend>
        <input type="number" 
        min='1100'
        max='2350000'
        step='100'
        id='minPrice'
        placeholder={"от 1100"} 
        ref={priceMinInput}
        />
        <input type="number" 
        min='1100'
        max='2350000'
        step='100'
        id='maxPrice'
        placeholder={"до 2350000"} 
        ref={priceMaxInput}
        />
      </fieldset>  
        <select name="filter" id='filter' ref={brandSelect}>
          <option value="">Бренд</option>
          {brands.length > 0 && 
            brands.map((brand)=><option key={brand} value={brand}>{brand}</option>)}
        </select> 
        <button onClick={handleFilter}>Применить</button>
        <button onClick={reset} className='reset'>Сбросить</button>

      </fieldset>
    </>
  )
}
export default Filter