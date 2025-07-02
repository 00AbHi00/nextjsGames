/*Custom hooks are also functions, for example this 
 Hook returns debouncedValue
*/ 

'use client';


import { useEffect, useState } from "react";

export default function useDebounce(value: String, delay: number = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const timer = setTimeout(() => {
        if(value!=debouncedValue)
          {
            setDebouncedValue(value)
          } 
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
