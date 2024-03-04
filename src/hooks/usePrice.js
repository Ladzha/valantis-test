import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, headers} from  '../fetchProperties.js'
import axios from 'axios';

export default function usePrice(){
  const [prices, setPrices ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  const paramsFieldPrice = {
    "action": "get_fields",
    "params": {
      "field": "price", 
    }
  };

  let allPrices =[];

  const getAllPrices = (price) =>{
    if(price===null || price===undefined){
      return;
    }else{
      if(allPrices.includes(price)){
        return;
      }else{
        allPrices.push(price)
      }
    }
    allPrices.sort(function(a, b){return a-b});
  }

  const fetchData = useCallback(async()=>{

    try {
      setError('')
      setIsLoading(true)

      const responsePrices = await axios.post(URL_FIRST, paramsFieldPrice, {headers})

      if(responsePrices){
        responsePrices.data.result.map((price)=>getAllPrices(price))
        if(allPrices.length > 0){
          setPrices(allPrices)
        }
      }else{
        console.log('Список брендов не получен')
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
  }, [])

  return { prices, isLoading, error}
}