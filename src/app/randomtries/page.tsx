"use client"
import React, { useState, useEffect } from "react";
import '@/app/randomtries/style.css'

const Faliure=()=>{
  return (
    <>
      <div>
        You failed to complete your task in time
      </div>
    </>
  )
}
const Sucess=()=>{
  return (
    <>
      <div>
        You are a winner
      </div>
    </>
  )
}

function App() {
  const times=12
  const [fail,setFail]=useState(false)
  const [sucess,setSucess]=useState(false)
  
  const [count, setCount] = useState(times);
  
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
            if (count<=10)
            {
              document.getElementById("shaker")?.classList.add("red")
              setTimeout(()=>{
                document.getElementById("shaker")?.classList.remove("red")
              },300)  
            }
            if (count<=0){
              setFail(()=>true)
            }
        }, 1000);
 
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
 
    const ss=()=>{
      setSucess(true)
    }
    if(fail)
      {
        return <Faliure/>
      }
      if(sucess)
        {
          return <Sucess/>
        }      
      return (
        <>
          <div
              className=""
              style={{
                  display: "flexbox",
                  textAlign: "center",
                  fontSize:80 +"px",
                }}
          >
              <h1  id="shaker">{count}</h1>
          </div>
          <div
          onClick={ss}>
              1. Click Me
        </div>
      </>
    );
};
 
export default App;