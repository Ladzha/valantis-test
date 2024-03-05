import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../fetchProperties.js';
import axios from 'axios';

export default function useProduct(filterBrand, filterName, filterPrice, activePage){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  let idList =[];

  const limit = 7;
  let offset = 0;

  if(activePage > 1){
    offset = offset+50
  }

  const paramsId = {
    "action": "get_ids",
    "params": {
      "offset": offset,
      "limit": 5
    }
  };

  const getThreeFilterCombination = (array1, array2, array3)=>{
    let intersectionId = [];
    for(let i=0; i < array1.length; i++){
      let currentItem = array1[i];
      if(array2.includes(currentItem) && array3.includes(currentItem)){
        intersectionId.push(currentItem)
      }
    }
    return intersectionId
  }

  const getTwoFilterCombination = (array1, array2)=>{
    let intersectionId = [];
    for(let i=0; i < array1.length; i++){
      let currentItem = array1[i];
      if(array2.includes(currentItem)){
        intersectionId.push(currentItem)
      }
    }
    return intersectionId
  }

  const array1 = ['apple', 'banana', 'orange']
  const array2 = ['mango', 'banana', 'orange']
  const array3 = ['apple', 'banana', 'watermelon']

  const intersection3 = getThreeFilterCombination(array1, array2, array3)
  const intersection2 = getTwoFilterCombination(array1, array2)

console.log('intersection2 =>', intersection2);
console.log('intersection3 =>', intersection3);

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

  const fetchPriceRangeIds = useCallback(async(filterPrice)=>{

    try {
      //Getting ids set filtered by price name and push it to id list
      if(filterPrice){

        for(let i = 0; i < filterPrice.length; i++){
          let paramsPriceFilter = {
            "action": "filter",
            "params": {"price": filterPrice[i]}
          } 
          const responseFilteredByPriceId = await axios.post(URL_FIRST, paramsPriceFilter, {headers})
          if(responseFilteredByPriceId.data.result.length > 0){
            responseFilteredByPriceId.data.result.map((itemId)=>getIdList(itemId))}
        }    
      }

    }catch (error) {
      console.log(error.message);
    }

  }, [])

  const fetchData = useCallback(async(filterBrand, filterName, filterPrice)=>{

    try {
      setError('')
      setIsLoading(true)

      //Getting ids set filtered id list
      if(filterBrand || filterName || filterPrice.length > 0){
        idList =[];
        console.log('GET IDS BY FILTER');

      //Getting ids set filtered by brand and push it to id list
      if(filterBrand){
        const paramsBrandFilter = {
          "action": "filter",
          "params": {"brand": `${filterBrand}`}
        }
        const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

        if(responseFilteredByBrandId.data.result.length > 0){
          responseFilteredByBrandId.data.result.map((itemId)=>getIdList(itemId))}
      }

      //Getting ids set filtered by product name and push it to id list
      if(filterName){
        const paramsNameFilter = {
          "action": "filter",
          "params": {"product": `${filterName}`}
        }
        const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})

        if(responseFilteredByNameId.data.result.length > 0){
          responseFilteredByNameId.data.result.map((itemId)=>getIdList(itemId))}
      }

      //Getting ids set filtered by price name and push it to id list
      if(filterPrice.length > 0){
        await fetchPriceRangeIds(filterPrice)
      }

      }else{
        idList =[];
        console.log('GET IDS PURE');

        const responseId = await axios.post(URL_FIRST, paramsId, {headers})
        
        if(responseId.data.result.length > 0){
          responseId.data.result.map((itemId)=>getIdList(itemId))}
      }

      //Getting products
        if(idList.length > 0){
          const paramsItem = {
            "action": "get_items",
            "params": {"ids": idList }
          };  

        const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})

        if(responseItem){
          getProductList(responseItem.data.result)
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