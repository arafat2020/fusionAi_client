import React, { useEffect, useState } from "react";

function useImageLoad({ url }) {
  const [imgLoad, setimgLoad] = useState(true);
  const [err, seterr] = useState();
  useEffect(() => {
    const imageInstance = new Image();
    if (url) {
      imageInstance.src = url;
      imageInstance.onload = () => {
        setimgLoad(false);
      };
      imageInstance.onerror = () => {
        seterr("Image Load Failed");
      };
    }
  }, [url]);
  return {
    imgLoad,
    err
  };
}

export default useImageLoad;
