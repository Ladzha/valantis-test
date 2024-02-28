import axios from 'axios';
import {URL_FIRST, URL_SECOND, headers} from './fetchProperties.js'

export default async function fetchBrands(){

  const paramsFieldBrand = {
    "action": "get_fields",
    "params": {
      "field": "brand", 
    }
  };

  let allBrands = [];

  const getAllBrands = (brand) =>{
    if(brand !== null){
      if(allBrands.includes(brand)) return;
      allBrands.push(brand)
    }
  }

  try {
    const responseBrandFirstPart = await axios.post(URL_FIRST, paramsFieldBrand, {headers})
    const responseBrandSecondPart = await axios.post(URL_SECOND, paramsFieldBrand, {headers})

    if(responseBrandFirstPart){
      responseBrandFirstPart.data.result.map((brand)=>getAllBrands(brand))
    }
    if(responseBrandSecondPart){
      responseBrandSecondPart.data.result.map((brand)=>getAllBrands(brand))
    }
    // return allBrands
    console.log('allBrands =>', allBrands);

  } catch (error) {
    console.log(error.message);
  }
  
  
}