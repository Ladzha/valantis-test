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
  const [filterPrice, setFilterPrice] = useState(null);

  const [totalPages, setTotalPages] = useState(161);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardCounter, setCardCounter] = useState(1);


  const handleBrandChange=(brand)=>{
    setFilterBrand(brand)
  }
  const { products, isLoading } = useProduct(filterBrand, filterName, filterPrice, currentPage)

  const handleSearchChange=(searchValue)=>{
    setFilterName(searchValue)
  }
  const handlePriceChange=(filterPrice)=>{
    setFilterPrice(filterPrice)
    // console.log('filterPrice', filterPrice);
  }
  const handlePageClick=(_, num)=>{
    setCurrentPage(num)
  }

  const handleCardCounter=(counter)=>{
    setCardCounter(counter)
  }
  return (
    <div className='page'>  
      <div className='filter-container'>
      <Filter 
        onBrandChange={handleBrandChange}
        onSearchChange={handleSearchChange}
        onPriceChange={handlePriceChange}
        />
      </div>  
      <main className="main">
        <h1 className='main-title'>Товары</h1>
        {products.length > 0 && <p>{products.length} + {cardCounter} наименований</p>}      
        {isLoading && <Loading/>}
        {!isLoading && Boolean(products.length) && <>
        <ProductList 
        products={products}
        cardCounter={cardCounter}
        onCardCount={handleCardCounter}/>
        {products.length > 1 ?
        <Pagination 
        totalPages={totalPages}
        // totalPages={Math.ceil(products.length / 10)}
        currentPage={currentPage}
        onPageClick={handlePageClick}
        />
        : null} </>}
      </main>
    </div>
  )
}

export default App
