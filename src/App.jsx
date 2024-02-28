import { useState } from 'react';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination.jsx';
import useProduct from './hooks/useProduct.js';
import Loading from './components/Loading.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

function App() {

  const { products, isLoading, error } = useProduct()

  const handlePageChange=()=>{
    console.log('handlePageChange');
  }

  const handleFilterChange=()=>{
    console.log('handleFilterChange');
  }

  return (
    <main className="main">
      <h1 className='main-title'>Наши продукты</h1>
      {isLoading && <Loading/>}
      {!isLoading && Boolean(products.length) && <>
      <Filter onFilterChange ={handleFilterChange}/>
      <ProductList products={products}/>
      <Pagination onPageChange={handlePageChange}/>
      </>}
    </main>
  )
}

export default App
