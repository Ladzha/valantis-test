import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../fetchProperties.js'
import axios from 'axios';

export default function useBrand(){
  const [brands, setBrands ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  const paramsFieldBrand = {
    "action": "get_fields",
    "params": {
      "field": "brand", 
    }
  };

  let allBrands =[];

  const getAllBrands = (brand) =>{
    if(brand===null || brand===undefined){
      return;
    }else{
      if(allBrands.includes(brand)){
        return;
      }else{
        allBrands.push(brand)
      }
    }
  }

  const fetchData = useCallback(async()=>{

    try {
      setError('')
      setIsLoading(true)

      const responseBrandFirstPart = await axios.post(URL_FIRST, paramsFieldBrand, {headers})
      const responseBrandSecondPart = await axios.post(URL_SECOND, paramsFieldBrand, {headers})

      if(responseBrandFirstPart){
        responseBrandFirstPart.data.result.map((brand)=>getAllBrands(brand))
      }
      if(responseBrandSecondPart){
        responseBrandSecondPart.data.result.map((brand)=>getAllBrands(brand))
      }

      if(allBrands.length > 0){
        setBrands(allBrands)
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
    console.log('brands', brands);

  }, [fetchData])

  return { brands, isLoading, error}
}