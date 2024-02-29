import { useState } from 'react';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination.jsx';
import useProduct from './hooks/useProduct.js';
import Loading from './components/Loading.jsx';
import Filter from './components/Filter.jsx';
import './App.css';

function App() {
  
  const [filterBrand, setFilterBrand] = useState('');

  const { products, isLoading, error } = useProduct(filterBrand)

  const handlePageChange=()=>{
    console.log('handlePageChange');
  }

  const handleNameChange=(name)=>{
    console.log('handleNameChange', name);
  }

  const handlePriceChange=(price)=>{
    console.log('handlePriceChange', price);
  }

  const handleBrandChange=(brand)=>{
    // setFilterBrand(brand)
    console.log('handleBrandChange', brand);
  }

  console.log('YA IS MAIN');

  return (
    <main className="main">
      <h1 className='main-title'>Наши продукты</h1>
       <Filter 
        onBrandChange={handleBrandChange}
        onNameChange={handleNameChange}
        onPriceChange={handlePriceChange}
        />
      {isLoading && <Loading/>}
      {!isLoading && Boolean(products.length) && <>
      <ProductList products={products}/>
      <Pagination onPageChange={handlePageChange}/>
      </>
      }
    </main>
  )
}

export default App
