import {useRef} from 'react'
import useBrands from '../hooks/useBrand.js';
import usePrice from '../hooks/usePrice.js';
import useName from '../hooks/useName.js';

const Filter = ({onBrandChange, onSearchChange, onPriceChange}) => {

  const { brands } = useBrands()
  const { prices } = usePrice()
  // const { names } = useName()

  const searchInput = useRef(null)
  const priceMinInput = useRef(null)
  const priceMaxInput = useRef(null)
  const brandSelect = useRef(null)

  const handleFilter=()=>{
    onBrandChange(brandSelect.current.value)
    onSearchChange(searchInput.current.value.toLowerCase())
    onPriceChange(getPriceRange(priceMinInput.current.value, priceMaxInput.current.value))
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
    <fieldset className='filter-container'>
      <legend>Фильтровать</legend>
      <input type="text" 
      id='search'
      autoFocus
      placeholder={"Поиск"} 
      ref={searchInput}
      />
      <fieldset className='fieldset-price'>
        <legend>Цена</legend>
        <input type="number" 
        min={1100}
        max={2350000}
        id='minPrice'
        placeholder={"от 1100"} 
        ref={priceMinInput}
        />
        <input type="number" 
        id='maxPrice'
        placeholder={"до 2350000"} 
        ref={priceMaxInput}
        />
      </fieldset>
    

      <select name="filter" id='filter' ref={brandSelect}>
        <option value="">Бренд</option>
        {brands.length > 0 && 
          brands.map((brand)=><option key={brand} value={brand}>{brand}</option>)
        }
      </select> 
      <button onClick={handleFilter}>Применить</button>

      </fieldset>
    </>
  )
}
export default Filter