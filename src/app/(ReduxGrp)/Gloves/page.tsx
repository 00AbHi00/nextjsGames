"use client"

import { FormEventHandler, useState } from "react";

export default function FunctionName() {
    let value= localStorage.getItem("favoriteNumber") ||""
    const [localValue,setLocalValue]=useState(value)
    const save =()=>
    {
        
    }

    return (
    <>
        <form onSubmit={save}>
            <input
            id="number"
            value={value}
            onChange={e => setLocalValue(e.target.value)}
            />
            <input type="submit" value="Save" />
      </form> 
    </>
  );
}