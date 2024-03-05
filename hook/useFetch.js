import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint, query) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': "f773a2fc92mshc51eb769aa26e93p18ebbejsnc9e93e84baea",
      'X-RapidAPI-Host':'jsearch.p.rapidapi.com'
    },
    params: {
      ...query
    }
  };
  

  const fetchData = async () => {

    setIsLoading(true)

    try {

      const response = await axios.request(options);

      setData(response.data.data)
      setIsLoading(false)

    } catch(error){

      setError(error)
      alert("Something went wrong");

    } finally{
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch }
}

export default useFetch