// Problem, Create a create usedebounce hook, which is capable of debouncing using setTimeout
// Implementations
// In the page.tsx, we create state input variable for storing the value,  hook which returns a value the 
'use client'
import  { useState, useRef } from "react";
import useDebounce from "./useDebounce";
export default function FunctionName() {
    const [input, setInput]= useState('');
  
    console.log("Hello")
    const debouncedInp=useDebounce(input,1000)
    // Using use State rerenders the component, so we can use ref to avoiod doing this

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
    {
        setInput(e.currentTarget.value)
     
    }

    return (
    <div className="grid h-screen place-items-center ">
        <div>
          <input 
            onChange={handleChange}
            className="p-3 text-2xl outline focus:outline-red-900"
            type="search" name="" id="" />              
        </div>
        <span className="">
          <div>
            Input
            {input}
          </div>
          <div>
            Debounced Input
            {debouncedInp}
          </div>
         
        </span>
    </div>
  );
}