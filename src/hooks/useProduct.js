import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../fetchProperties.js';
import axios from 'axios';

export default function useProduct(filterBrand, filterName, filterPrice, activePage){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  let idList =[];

  let priceValue = 0;

  const paramsPriceFilter = {
    "action": "filter",
    "params": {"price": priceValue}
  }

  const limit = 7;
  const offset = 0;
  const paramsId = {
    "action": "get_ids",
    "params": {
      "offset": offset,
      "limit": limit
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

  const fetchData = useCallback(async(filterBrand, filterName, filterPrice)=>{

    try {
      setError('')
      setIsLoading(true)
      idList =[];

      if(filterBrand){
        const paramsBrandFilter = {
          "action": "filter",
          "params": {"brand": `${filterBrand}`}
        }

        const responseFilteredId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

        if(responseFilteredId.data.result.length > 0){
          responseFilteredId.data.result.map((itemId)=>getIdList(itemId))}

      }else if(filterName !==''){
        const paramsNameFilter = {
          "action": "filter",
          "params": {"name": `${filterName}`}
        }

        const responseFilteredId = await axios.post(URL_FIRST, paramsNameFilter, {headers})

        if(responseFilteredId.data.result.length > 0){
          responseFilteredId.data.result.map((itemId)=>getIdList(itemId))}

      // }else if(filterPrice){
      //   const paramsPriceFilter = {
      //     "action": "filter",
      //     "params": {"price": 0}
      //   }

      //   const responseFilteredId = await axios.post(URL_FIRST, paramsPriceFilter, {headers})

      //   if(responseFilteredId.data.result.length > 0){
      //     responseFilteredId.data.result.map((itemId)=>getIdList(itemId))}

      }else{
        const responseId = await axios.post(URL_FIRST, paramsId, {headers})
        
        if(responseId.data.result.length > 0){
          responseId.data.result.map((itemId)=>getIdList(itemId))}

        if(idList.length > 0){
          const paramsItem = {
            "action": "get_items",
            "params": {"ids": idList }
          };  

        const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})

        if(responseItem){
          getProductList(responseItem.data.result)
        }        
      }
      setIsLoading(false)
     }

    }catch (error) {
      const fetchError = error
      setIsLoading(false)
      setError(fetchError.message)
      console.log(fetchError.message);
    }

  }, [])

  useEffect(()=>{
    fetchData(filterBrand, filterName, filterPrice)

  }, [fetchData, filterBrand, filterName, filterPrice])

  return { products, isLoading, error}
}