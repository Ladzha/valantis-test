import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../utils/fetchProperties.js';
import axios from 'axios';
import {getCommonInTwoArrays, getCommonInThreeArrays} from '../utils/getCommonInArrays.js'
import removeDuplicateId from '../utils/removeDuplicateId.js'
import getUniqueProducts from '../utils/getUniqueProducts.js'

export default function useProduct(filterBrand, filterName, filterPrice, currentPage){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  let idList =[];
  const limit = 52;

  const getIdList = (productId) =>{
    if(!idList.includes(productId)){
      idList.push(productId)
    } 
  }

  let priceSetIdList =[];
  const getPriceSetIdList = (productId) =>{
    if(!priceSetIdList.includes(productId)){
      priceSetIdList.push(productId)
    } 
  }

  //Getting ids set filtered by price name and push it to id list
  const fetchPriceRangeIds = useCallback(async(filterPrice)=>{
    try {   
      if(filterPrice){
        for(let i = 0; i < filterPrice.length; i++){
          let paramsPriceFilter = {
            "action": "filter",
            "params": {"price": filterPrice[i]}
          } 
          const responseFilteredByPriceId = await axios.post(URL_FIRST, paramsPriceFilter, {headers})
          if(responseFilteredByPriceId.data.result.length > 0){
            responseFilteredByPriceId.data.result.map((itemId)=>getPriceSetIdList(itemId))
          }
        }
      }    
      console.log('idList =>', idList);
      console.log('getPriceSetIdList =>', priceSetIdList);
      return priceSetIdList
    }catch (error) {
      console.log(error.message);
    }
  }, [])

  const fetchData = useCallback(async(filterBrand, filterName, filterPrice, currentPage)=>{
    try {
      setError('')
      setIsLoading(true)

      let newOffset = (currentPage * 50) - 50;
      
      console.log('offset', newOffset);
      console.log('currentPage', currentPage);


      const paramsId = {
        "action": "get_ids",
        "params": {
          "offset": newOffset,
          "limit": limit
        }
      };

      console.log('paramsId', paramsId);


      //Getting ids set filtered id list
      if(filterBrand || filterName || filterPrice){
          console.log('GET IDS BY FILTER');
          console.log('filterBrand', filterBrand, 'filterName', filterName, 'filterPrice', filterPrice );

          const paramsNameFilter = {
            "action": "filter",
            "params": {"product": `${filterName}`}
          }
          const paramsBrandFilter = {
            "action": "filter",
            "params": {"brand": `${filterBrand}`}
          }
          
          idList =[];   
          //Getting ids set filtered by 
          //BRAND and NAME and PRICE 
          //and push it to id list
          if(filterBrand && filterName && filterPrice.length > 0){
            console.log("все фильтры");

            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})

            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)

            if(responseFilteredByNameId.data.result.length > 0 &&
              responseFilteredByBrandId.data.result.length > 0 && responseFilteredByPricedId.length > 0){
              const uniqNameIds = removeDuplicateId(responseFilteredByNameId.data.result)
              const uniqBrandIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              const uniqPriceIds = removeDuplicateId(responseFilteredByPricedId)
                
              const totalIds = getCommonInThreeArrays(uniqNameIds, uniqBrandIds, uniqPriceIds)

              totalIds.map((itemId)=>getIdList(itemId))

              console.log('UniqIds name =>', uniqNameIds);
              console.log('UniqIds brand =>', uniqBrandIds);
              console.log('UniqIds price =>', uniqPriceIds);
              console.log('Total =>', totalIds);
              console.log('idList =>', idList);
            }

          }
          //Getting ids set filtered by 
          //BRAND and NAME 
          //and push it to id list
          if(filterBrand && filterName && filterPrice.length <=0){
            console.log("бренд и имя");

            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})
            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

  
            if(responseFilteredByNameId.data.result.length > 0 && responseFilteredByBrandId.data.result.length > 0){
              const uniqNameIds = removeDuplicateId(responseFilteredByNameId.data.result)
              const uniqBrandIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqNameIds, uniqBrandIds)

              totalIds.map((itemId)=>getIdList(itemId))

              console.log('UniqIds name =>', uniqNameIds);
              console.log('UniqIds brand =>', uniqBrandIds);
              console.log('Total =>', totalIds);
              console.log('idList =>', idList);
            }
          }
          //Getting ids set filtered by 
          //BRAND and PRICE 
          //and push it to id list
          if(filterBrand && !filterName && filterPrice.length > 0){

            console.log("бренд и цена");

            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)

            if(responseFilteredByBrandId.data.result.length > 0 && responseFilteredByPricedId.length > 0){
              const uniqPriceIds = removeDuplicateId(responseFilteredByPricedId)
              const uniqBrandIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqPriceIds, uniqBrandIds)

              totalIds.map((itemId)=>getIdList(itemId))

              console.log('UniqIds price =>', uniqPriceIds);
              console.log('UniqIds brand =>', uniqBrandIds);
              console.log('Total =>', totalIds);
            }
            console.log('responseFilteredByPricedId =>', responseFilteredByPricedId);
          }
          //Getting ids set filtered by 
          //NAME and PRICE 
          //and push it to id list
          if(!filterBrand && filterName && filterPrice.length > 0){
            console.log("имя и цена");
            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers});

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)

            if(responseFilteredByNameId.data.result.length > 0 && responseFilteredByPricedId.length > 0){
              const uniqPriceIds = removeDuplicateId(responseFilteredByPricedId)
              const uniqNameIds = removeDuplicateId(responseFilteredByNameId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqPriceIds, uniqNameIds)

              totalIds.map((itemId)=>getIdList(itemId))

              console.log('UniqIds price =>', uniqPriceIds);
              console.log('UniqIds name =>', uniqNameIds);
              console.log('Total =>', totalIds);
            }
            console.log('responseFilteredByPricedId =>', responseFilteredByPricedId);

          }
          //Getting ids set filtered by 
          //BRAND and push it to id list
          if(filterBrand && !filterName && filterPrice.length <=0){

            console.log("бренд");

            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

            console.log('Primer brand =>', responseFilteredByBrandId.data.result);
            
            if(responseFilteredByBrandId.data.result.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              uniqIds.map((itemId)=>getIdList(itemId))
            }
          }
          //Getting ids set filtered by  
          //NAME 
          //and push it to id list
          if(filterName && !filterBrand && filterPrice.length <=0){

            console.log("имя");

            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})

            console.log('Primer name =>', responseFilteredByNameId.data.result);

            if(responseFilteredByNameId.data.result.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByNameId.data.result)
              uniqIds.map((itemId)=>getIdList(itemId))
            }
          }
          //Getting ids set filtered by 
          //PRICE 
          //and push it to id list
          if(filterPrice.length > 0 && !filterBrand && !filterName){

            console.log("цена");
            console.log('filterBrand', filterBrand, 'filterName', filterName, 'filterPrice', filterPrice );

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)
            if(responseFilteredByPricedId.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByPricedId)
              uniqIds.map((itemId)=>getIdList(itemId))
            }
            console.log('Primer responseFilteredByPricedId =>', responseFilteredByPricedId);
          }

      }else{
        console.log('GET IDS PURE');
        idList =[];
        const responseId = await axios.post(URL_FIRST, paramsId, {headers})   

        if(responseId.data.result.length > 0){
          const uniqIds = removeDuplicateId(responseId.data.result)
          uniqIds.map((itemId)=>getIdList(itemId))
        }
      }

      //Getting products
      if(idList.length > 0){
        const paramsItem = {
          "action": "get_items",
          "params": {"ids": idList }
        };  

      const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})

      if(responseItem){
        getUniqueProducts(responseItem.data.result, setProducts)
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
    fetchData(filterBrand, filterName, filterPrice, currentPage)

  }, [fetchData, filterBrand, filterName, filterPrice, currentPage])

  return { products, isLoading, error}
}