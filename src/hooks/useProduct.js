import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../fetchProperties.js'
import axios from 'axios';

export default function useProduct(userFilter){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(null)


  // if(userFilter !==''){
  //   setFilter(userFilter)
  //   console.log('filter', userFilter);
  // }else{
  //   console.log('filter', userFilter);
  // }


  let idList =[];

  // let nameValue = "Золотое";
  // let brandValue = 'Bibigi';
  // let priceValue = 1500.0;



  // const paramsPriceFilter = {
  //   "action": "filter",
  //   "params": {"price": priceValue}
  // }
  // const paramsNameFilter = {
  //   "action": "filter",
  //   "params": {"name": nameValue}
  // }
  const paramsBrandFilter = {
    "action": "filter",
    "params": {"brand": userFilter}
  }

  const paramsId = {
    "action": "get_ids",
    "params": {
      "offset": 0,
      "limit": 5
    }
  };

  const getIdList = (productId) =>{
    if(!idList.includes(productId)){
      idList.push(productId)
    } 
  }

  const getProductList = (productsData) =>{
    let uniqueIdProductList = [];
    let uniqueProductItem = {};
    for (let i in productsData) {
      let itemId = productsData[i]['id'];
      uniqueProductItem[itemId] = productsData[i];
    }
    for (let i in uniqueProductItem) {
      uniqueIdProductList.push(uniqueProductItem[i]);
    }
    setProducts(uniqueIdProductList)
  }    

  const fetchData = useCallback(async(userFilter)=>{

    try {
      setError('')
      setIsLoading(true)

      if(userFilter){
        const responseFilteredId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

        if(responseFilteredId.data.result.length > 0){
          responseFilteredId.data.result.map((itemId)=>getIdList(itemId))
          console.log('Список фильтрованных Id');

        }else{
          console.log('Список фильтрованных Id не получен');
        }
      }else{
        const responseId = await axios.post(URL_FIRST, paramsId, {headers})
        
        if(responseId.data.result.length > 0){
          responseId.data.result.map((itemId)=>getIdList(itemId))
          console.log('Список Id');

        }else{
          console.log('Список Id не получен');
        }
      }

      if(idList.length > 0){
        const paramsItem = {
          "action": "get_items",
          "params": {"ids": idList }
        };  

        const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})

        if(responseItem){
          getProductList(responseItem.data.result)
        }else{
          console.log('Список товаров не получен')
        }         
    }
      setIsLoading(false)

    } catch (error) {
      const fetchError = error
      setIsLoading(false)
      setError(fetchError.message)
      console.log(fetchError.message);
    }

    console.log('FROM FETCH DATA FUNCTION');
  }, [])

  useEffect(()=>{
    fetchData(userFilter)
    console.log('FROM USEEFFECT', products);

  }, [userFilter])

  return { products, isLoading, error}
}