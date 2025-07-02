// For this implementation, we create a context with createContext
// 
"use client";
import { useState, createContext } from "react";
import Component1 from "./comp1";
interface PropContextType {
  value: string;
  setValue: (val: string) => void;
}
export const PropContext = createContext<PropContextType | undefined>(
  undefined
);

export default function FunctionName() {
    const [value, setValue] = useState("Initial value");
    return (
    <PropContext.Provider value={{value,setValue}}>
      <div className="grid h-screen place-items-center ">
        <div className="border p-12">
          Component 1 
          <input
            onChange={(e)=>setValue(e.currentTarget.value)}
            type="text"
            className="outline m-1 bg-slate-900"
            name=""
            id=""
            value={value}
          />
        
          {value}
          <Component1 />
        </div>
      </div>
    </PropContext.Provider>
  );
}
