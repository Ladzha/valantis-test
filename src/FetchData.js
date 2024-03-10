// import { useState, useEffect } from 'react';
// import axios from 'axios';

// import {URL_FIRST, URL_SECOND, headers} from './fetchProperties.js'


// export default async function FetchData(){

//   const [filterBrand, setFilterBrand] = useState(null);
//   const [filterName, setFilterName] = useState('');
//   const [filterPrice, setFilterPrice] = useState(0);

//   let idList =[];

//   let nameValue = "Золотое колье";
//   let brandValue = 'Baraka'; 
//   let priceValue = 16500.0;

//   // setFilterName(nameValue)
//   // setFilterBrand(brandValue)
//   // setFilterPrice(priceValue)

//   const paramsPriceFilter = {
//     "action": "filter",
//     "params": {"price": filterPrice}
//   }
//   const paramsNameFilter = {
//     "action": "filter",
//     "params": {"name": nameValue}
//   }
//   const paramsBrandFilter = {
//     "action": "filter",
//     "params": {"brand": brandValue}
//   }

//   const paramsId = {
//     "action": "get_ids",
//     "params": {
//       "offset": 1,
//       "limit": 5
//     }
//   };

//   try {
//     // const responseFilter = await axios.post(URL_FIRST, paramsBrandFilter, {headers})
//     // responseFilter.data.result.map((item)=>idList.push(item))

//     const responseId = await axios.post(URL_FIRST, paramsId, {headers})

//     console.log(responseId.data.result);

//     if(responseId.data.result.length > 0){
//       responseId.data.result.map((itemId)=>idList.push(itemId))
//       console.log(responseId.data.result);
//     }else{
//       console.log('Список Id не получен');
//     }
   
//     if(idList.length > 0){
//       const paramsItem = {
//         "action": "get_items",
//         "params": {"ids": idList }
//       };  
//       const responseItem = await axios.post(URL_FIRST, paramsItem, {headers})
//       if(responseItem){
//         responseItem.data.result.map((item)=>{
//           console.log('From FetchData PRODUCT INFO => ', 
//           'ID => ', item.id, 
//           'PRODUCT => ', item.product,
//           'PRICE => ', item.price,
//           'BRAND => ', item.brand)
//         })
//       }else{
//         console.log('Список товаров не получен')
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//   }

// }