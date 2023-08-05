import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/deplument";

function useUsers() {
  const [loading, setloading] = useState(false);
  const [res, setres] = useState([]);
  const [err, seterr] = useState(null);
  useEffect(()=>{
    setloading(true)
    axiosInstance.get('/getPopulerUser')
    .then(data=>{
        setres(data.data)
    })
    .catch(err=>{
        seterr(err) 
    })
    .finally(()=>setloading(false))
  },[])
  return {
    loading,
    res,
    err,
  };
}

export default useUsers;
