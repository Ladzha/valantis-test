import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../fetchProperties.js'
import axios from 'axios';

export default function useProduct(){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('');

  let idList =[];

  let nameValue = "Золотое колье";
  let brandValue = 'Baraka';
  let priceValue = 16500.0;

  const paramsPriceFilter = {
    "action": "filter",
    "params": {"price": priceValue}
  }
  const paramsNameFilter = {
    "action": "filter",
    "params": {"name": nameValue}
  }
  const paramsBrandFilter = {
    "action": "filter",
    "params": {"brand": brandValue}
  }

  const paramsId = {
    "action": "get_ids",
    "params": {
      "offset": 1,
      "limit": 5
    }
  };

  const getIdList = (productId) =>{
    if(idList.includes(productId)){
      console.log("Id uzhe est");
    } 
    idList.push(productId)
  }

  const fetchData = useCallback(async()=>{

    try {
      setError('')
      setIsLoading(true)

      if(filter){
        const responseFilter = await axios.post(URL_FIRST, paramsBrandFilter, {headers})
        responseFilter.data.result.map((item)=>idList.push(item))
  
        if(responseFilter.data.result.length > 0){
          responseFilter.data.result.map((itemId)=>getIdList(itemId))
        }else{
          console.log('Список Id не получен');
        }
      }else{
      const responseId = await axios.post(URL_FIRST, paramsId, {headers})
      // const responseIdPart2 = await axios.post(URL_SECOND, paramsId, {headers})

      
      if(responseId.data.result.length > 0){
        responseId.data.result.map((itemId)=>getIdList(itemId))
      }else{
        console.log('Список Id не получен');
      }

      if(idList.length > 0){
        const paramsItem = {
          "action": "get_items",
          "params": {"ids": idList }
        };  

        const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})

        if(responseItem){
          setProducts(responseItem.data.result)
        }else{
          console.log('Список товаров не получен')
        }
      }     
    }
      setIsLoading(false)

    } catch (error) {
      const fetchError = error
      setIsLoading(false)
      setError(fetchError.message)
      console.log(fetchError.message);
    }
  }, [])

  useEffect(()=>{
    fetchData()
  }, [fetchData])

  return { products, isLoading, error}
}