import { useState } from "react";
import API from "../services/api";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchFunction = async ({ url, method, body = null }) => {
    setIsLoading(true);
    setError(false);
    
    try {
      const response = await API({
        url,
        method,
        data: body,
      });    

      if(!response.data.status) {
        setError(true);
        setData(response.data);
        return response.data;
      }
      
      setData(response.data);
      return response.data;

    } catch (err) {  
      setError(true);
      setData(err.message);
      return err.message;

    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const get = (url) => fetchFunction({ url, method: "GET" });
  const post = (url, body) => fetchFunction({ url, method: "POST", body });
  const patch = (url, body) => fetchFunction({ url, method: "PATCH", body });
  const del = (url) => fetchFunction({ url, method: "DELETE" });

  return { isLoading, data, error, get, post, patch, del };
};

export default useApi;