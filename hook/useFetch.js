import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint, query) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `https://80b586ca-2344-4519-9d65-b5359fb80611.mock.pstmn.io`,
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