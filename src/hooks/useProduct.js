import { useState, useEffect, useCallback} from 'react';
import axios from 'axios';

export default function useProduct(){
  const [products, setProducts ] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async()=>{
    try {
      setError('')
      setIsLoading(true)
      // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      // setProducts(response.data)
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