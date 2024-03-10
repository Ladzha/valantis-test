import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, URL_SECOND, headers} from  '../utils/fetchProperties.js';
import axios from 'axios';
import {getCommonInTwoArrays, getCommonInThreeArrays} from '../utils/getCommonInArrays.js'
import removeDuplicateId from '../utils/removeDuplicateId.js'
import getUniqueProducts from '../utils/getUniqueProducts.js'

export default function useProduct(filterBrand, filterName, filterPrice, currentPage, setTotalPages){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  let idList =[];
  let subIdList =[];
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
      // console.log('getPriceSetIdList =>', priceSetIdList);
      return priceSetIdList
    }catch (error) {
      console.log(error.message);
    }
  }, [])

  const fetchData = useCallback(async(filterBrand, filterName, filterPrice, currentPage)=>{
    try {
      setError('')
      setIsLoading(true)

      //Getting ids set filtered id list
      if(filterBrand || filterName || filterPrice?.length > 0){

          const paramsNameFilter = {
            "action": "filter",
            "params": {"product": `${filterName}`}
          }
          const paramsBrandFilter = {
            "action": "filter",
            "params": {"brand": `${filterBrand}`}
          }
          
          idList =[];   
          subIdList =[];
          //Getting ids set filtered by 
          //BRAND and NAME and PRICE 
          //and push it to id list
          if(filterBrand && filterName && filterPrice.length > 0){
            setTotalPages(1)

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
            }

          }
          //Getting ids set filtered by 
          //BRAND and NAME 
          //and push it to id list
          if(filterBrand && filterName && filterPrice.length <=0){
            setTotalPages(1)

            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})
            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

  
            if(responseFilteredByNameId.data.result.length > 0 && responseFilteredByBrandId.data.result.length > 0){
              const uniqNameIds = removeDuplicateId(responseFilteredByNameId.data.result)
              const uniqBrandIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqNameIds, uniqBrandIds)

              totalIds.map((itemId)=>getIdList(itemId))
            }
          }
          //Getting ids set filtered by 
          //BRAND and PRICE 
          //and push it to id list
          if(filterBrand && !filterName && filterPrice.length > 0){
            setTotalPages(1)

            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)

            if(responseFilteredByBrandId.data.result.length > 0 && responseFilteredByPricedId.length > 0){
              const uniqPriceIds = removeDuplicateId(responseFilteredByPricedId)
              const uniqBrandIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqPriceIds, uniqBrandIds)

              totalIds.map((itemId)=>getIdList(itemId))
            }
          }
          //Getting ids set filtered by 
          //NAME and PRICE 
          //and push it to id list
          if(!filterBrand && filterName && filterPrice.length > 0){
            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers});

            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)

            if(responseFilteredByNameId.data.result.length > 0 && responseFilteredByPricedId.length > 0){
              const uniqPriceIds = removeDuplicateId(responseFilteredByPricedId)
              const uniqNameIds = removeDuplicateId(responseFilteredByNameId.data.result)
              
              const totalIds = getCommonInTwoArrays(uniqPriceIds, uniqNameIds)

              totalIds.map((itemId)=>getIdList(itemId))
              setTotalPages(Math.ceil(totalIds.length / 50))
            }
          }
          //Getting ids set filtered by 
          //BRAND and push it to id list
          if(filterBrand && !filterName && filterPrice.length <=0){
            setTotalPages(1)
            const responseFilteredByBrandId = await axios.post(URL_FIRST, paramsBrandFilter, {headers})       
            if(responseFilteredByBrandId.data.result.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByBrandId.data.result)
              uniqIds.map((itemId)=>getIdList(itemId))
            }
          }
          //Getting ids set filtered by  
          //NAME 
          //and push it to id list
          if(filterName && !filterBrand && filterPrice.length <=0){

            const responseFilteredByNameId = await axios.post(URL_FIRST, paramsNameFilter, {headers})

            if(responseFilteredByNameId.data.result.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByNameId.data.result)
              uniqIds.map((itemId)=>getIdList(itemId))
              setTotalPages(Math.ceil(uniqIds.length / 50))
            }
          }
          //Getting ids set filtered by 
          //PRICE 
          //and push it to id list
          if(filterPrice.length > 0 && !filterBrand && !filterName){
            const responseFilteredByPricedId = await fetchPriceRangeIds(filterPrice)
            if(responseFilteredByPricedId.length > 0){
              const uniqIds = removeDuplicateId(responseFilteredByPricedId)
              uniqIds.map((itemId)=>getIdList(itemId))
              setTotalPages(Math.ceil(uniqIds.length / 50))
            }            
          }

      }else{
        setTotalPages(161)
        idList =[];

        let newOffset = (currentPage * 50) - 50;

        const paramsId = {
          "action": "get_ids",
          "params": {
            "offset": newOffset,
            "limit": limit
          }
        };

        const responseId = await axios.post(URL_FIRST, paramsId, {headers})   

        if(responseId.data.result.length > 0){
          const uniqIds = removeDuplicateId(responseId.data.result)
          uniqIds.map((itemId)=>getIdList(itemId))
        }
      }

      //Getting products
      if(idList.length > 0){

        if(idList.length <= 52){
          subIdList = idList
        }
        else{
          subIdList=idList.slice(((currentPage * 50) - 50), (currentPage * 50))
        }
        const paramsItem = {
          "action": "get_items",
          "params": {"ids": subIdList }
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