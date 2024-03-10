import { useState, useEffect, useCallback} from 'react';
import {URL_FIRST, headers} from  '../utils/fetchProperties.js'
import axios from 'axios';

export default function useName(){
  const [names, setNames ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  const paramsFieldName = {
    "action": "get_fields",
    "params": {
      "field": "product", 
    }
  };

  let allNames =[];

  const getAllNames = (name) =>{
    if(name===null || name===undefined){
      return;
    }else{
      if(allNames.includes(name)){
        return;
      }else{
        allNames.push(name)
      }
    }
    allNames.sort(function(a, b){return a-b});
  }

  const fetchData = useCallback(async()=>{

    try {
      setError('')
      setIsLoading(true)

      const responseNames = await axios.post(URL_FIRST, paramsFieldName, {headers})

      if(responseNames){
        responseNames.data.result.map((name)=>getAllNames(name))
        if(allNames.length > 0){
          setNames(allNames)
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
    console.log('names from useName', names)
    fetchData()
  }, [])

  return { names, isLoading, error}
}