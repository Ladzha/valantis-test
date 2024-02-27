import axios from 'axios';
import { md5 } from 'js-md5';

export default async function FetchData(){

  const url ='http://api.valantis.store:40000/';
  const password = 'Valantis';
  const timestamp =new Date().toISOString().slice(0, 10).replace(/-/g,'');

  const string = `${password}_${timestamp}`
  const xAuth = md5(string)
  
  const headers = {
    'X-Auth': xAuth,
    'Content-Type': 'application/json'
  };

  const paramsFilter = {
    "action": "filter",
    "params": {"price": 16500.0}
  }

  const params = {
    "action": "get_ids",
    "params": {"limit": 5}
  };

  let arrId = [];

  try {
    const responseFilter = await axios.post(url, paramsFilter, {headers})
    const responseId = await axios.post(url, params, {headers})

    // responseFilter.data.result.map((item)=>arrId.push(item))
    responseId.data.result.map((itemId)=>arrId.push(itemId))

    const paramsItem = {
      "action": "get_items",
      "params": {"ids": arrId }
    };

    const responseItem = await axios.post(url, paramsItem, {headers})

    responseItem.data.result.map((item)=>{
      console.log('From FetchData PRODUCT INFO => ', 
      'ID => ', item.id, 
      'PRODUCT => ', item.product,
      'PRICE => ', item.price,
      'BRAND => ', item.brand)
    })

  } catch (error) {
    console.log('Что-то пошло не так...');
  }
  return(FetchData)
}