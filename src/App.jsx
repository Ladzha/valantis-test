import { useState } from 'react';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import useProduct from './hooks/useProduct.js';
import Loading from './components/Loading.jsx';
import Filter from './components/Filter.jsx';
import './App.css';
import FetchData from './FetchData.js'

function App() {

  const { products, isLoading, error } = useProduct()

  const handlePrevPageClick=()=>{
    console.log('handlePrevPage');
  }

  const handleNextPageClick=()=>{
    console.log('handlePrevPage');
  }
  FetchData()
  return (
    <main className="main">
      <h1 className='main-title'>Наши продукты</h1>
      {isLoading && <Loading/>}
      {!isLoading && <>
      <Filter/>
      <ProductList products={products}/>
      <Pagination onPrevClick={handlePrevPageClick} onNextClick={handleNextPageClick}/>
      </>}
    </main>
  )
}

export default App
