import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, headers} from  '../utils/fetchProperties.js'
import axios from 'axios';

export default function useBrand(){
  const [brands, setBrands ] = useState([]);

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
      const responseBrands = await axios.post(URL_FIRST, paramsFieldBrand, {headers})

      if(responseBrands){
        responseBrands.data.result.map((brand)=>getAllBrands(brand))
        if(allBrands.length > 0){
          setBrands(allBrands)
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  }, [])

  useEffect(()=>{
    fetchData()
  }, [])

  return { brands }
}