import "intersection-observer";
import { useEffect, useState } from "react";

function useObserver({ componentRef }) {
  const [isInviewport, setisInviewport] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisInviewport(true);
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px", // No margin
        threshold: 0.5, // Trigger at 50% visibility
      }
    );
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [componentRef]);
  return {
    isInviewport,
  };
}

export default useObserver;
