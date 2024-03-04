import { useState } from 'react';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination.jsx';
import useProduct from './hooks/useProduct.js';

import Loading from './components/Loading.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

function App() {
  
  const [filterBrand, setFilterBrand] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterPrice, setFilterPrice] = useState([null, null]);
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState(1);



  const handleBrandChange=(brand)=>{
    setFilterBrand(brand)
  }

  const { products, isLoading } = useProduct(filterBrand, filterName, filterPrice, activePage)

  const handleSearchChange=(searchValue)=>{
    setFilterName(searchValue)
  }

  const handlePriceChange=(filterPrice)=>{
    setFilterPrice(filterPrice)
    console.log('filterPrice', filterPrice);
  }

  const handlePageChange=(page)=>{
    console.log('handlePageChange');
  }
  // console.log('YA IS MAIN');

  return (
    <div className='page'>  
      <aside className='aside'>
      <Filter 
        onBrandChange={handleBrandChange}
        onSearchChange={handleSearchChange}
        onPriceChange={handlePriceChange}
        />
      </aside>  
      <main className="main">
        <h1 className='main-title'>Товары</h1>
        {isLoading && <Loading/>}
        {!isLoading && Boolean(products.length) && <>
        <ProductList products={products}/>
        {products.length > 50 ?
        <Pagination onPageChange={handlePageChange}/>
        : null} </>}
      </main>
    </div>

  )
}

export default App
