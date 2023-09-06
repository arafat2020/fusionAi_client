import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { token } from "../provider/features/userClice";
import { axiosInstance } from "../lib/deplument";

function useArtGroup({ artID }) {
  const [groupNames, setgroupNames] = useState([]);
  const [loading, setloading] = useState(true);
  const [LoadingType, setLoadingType] = useState();
  const tk = useSelector(token);
  useEffect(() => {
    setloading(true);
    setLoadingType("FETCH");
    axiosInstance
      .post(
        "/getGroupName",
        {
          artID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${tk}`,
          },
        }
      )
      .then((data) => setgroupNames(data.data))
      .catch((err) => console.log(err))
      .finally(() => {
        setloading(false);
        setLoadingType("IDLE");
      });
  }, []);
  const groupACtion = ({ chacked, cmpId, name }) => {
    setloading(true);
    if (chacked) {
      setLoadingType("ADD");
      axiosInstance
        .post(
          "/addToGroup",
          {
            artID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearar ${tk}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setloading(false);
          setLoadingType("IDLE");
        });
    } else {
      setLoadingType("REMOVE");
      axiosInstance
        .post(
          "/addToGroup",
          {
            id: cmpId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearar ${tk}`,
            },
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setloading(false);
          setLoadingType("IDLE");
        });
    }
  };
  const createGroup = ({ name }) => {
    setloading(true);
    setLoadingType("CREATE_GROUP");
    axiosInstance
      .post(
        "/createGroup",
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${tk}`,
          },
        }
      )
      .then((data) => setgroupNames([data.data,...groupNames]))
      .catch((err) => console.log(err))
      .finally(() => {
        setloading(false);
        setLoadingType("IDLE");
      });
  };
  const deleteGroup = ({ id }) => {
    setloading(true)
    setLoadingType("LOADING_TYPE")
    axiosInstance.post(
      "/deleteGroup",
      {
        id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearar ${tk}`,
        },
      }
    )
    .then(async()=>{
      const index = await groupNames.findIndex((e)=>e.id===id)
      const newArr = await [...groupNames]
      console.log(index);
      setgroupNames(()=>newArr.splice(index,1))
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{
      setloading(false)
      setLoadingType("IDLE")
    })
  };
  return {
    groupNames,
    loading,
    LoadingType,
    groupACtion,
    createGroup,
    deleteGroup
  };
}
export default useArtGroup;
