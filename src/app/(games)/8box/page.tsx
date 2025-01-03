"use client";

import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8,""]);
  const [moves,setMoves]=useState(0)
  const solution=[0,1,2,3,4,5,6,7,8,""]
  function findNeighbors() {
    const x=numbers.indexOf("")
    const neighbors = [];
    // Corner Cells
    if (x === 0) neighbors.push(1, 3, 4);
    else if (x === 2) neighbors.push(1, 4, 5);
    else if (x === 6) neighbors.push(3, 4, 7);
    else if (x === 8) neighbors.push(4, 5, 7);
  
    // Middle Edge Cells
    else if (x === 1) neighbors.push(0, 2, 3, 4, 5);
    else if (x === 3) neighbors.push(0, 1, 4, 6, 7);
    else if (x === 5) neighbors.push(1, 2, 4, 7, 8);
    else if (x === 7) neighbors.push(3, 4, 5, 6, 8);
  
    // Center Cell
    else if (x === 4) neighbors.push(0, 1, 2, 3, 5, 6, 7, 8);
    return neighbors;
  }
  const swap=(currentId:number,currentValue:number,gap:number)=>{
    let copy:Array<string | number>=[...numbers]
    console.log(copy)
    copy[currentId]=""
    copy[gap]=currentValue
    setNumbers(()=>copy)
  }
  useEffect(()=>{
    for (let i=0;i<numbers.length;i++)
    {
        
    }
  },[])

  const shuffle = () => {
    setNumbers([]);
    setMoves(0)
    let copy:Array<string | number> = [];
    let random2 = Math.floor(Math.random() * 8 + 1);
     while (copy.length < 8) {
      let random = Math.floor(Math.random() * 8 + 1);

      if (!copy.includes(random)) {
        copy.push(random);
      }
    }
    copy=copy.toSpliced(random2,0,"")
    setNumbers(() => copy);
  };
  const shift = (e: React.MouseEvent<HTMLDivElement>) => {
    let neighbors=findNeighbors();
    let gap=numbers.indexOf("")
    let currentId=parseInt(e.currentTarget.id)
    let currentValue=parseInt(e.currentTarget.innerText)
    
    if (neighbors.includes(currentId))
    {
        setMoves((moves)=>moves+1)
        swap(currentId,currentValue,gap)
        // alert(`shift ${e.currentTarget.id} to ${gap}`)
    }
};
  return (
    <>
      <button
        style={{
          boxShadow:
            "2px 2px 3px rgba(255,255,255,0.8) inset,-5px -5px 2px rgba(0,0,0,0.3) inset",
        }}
        className="bg-red-800 p-3 mx-64 my-2"
        onClick={shuffle}
      >
        Shuffle
      </button>
      {moves}
      <div className="transitaion-all grid p-3 outline m-10 h-lvh gap-x-2 gap-y-4 grid-cols-3 bg-red-600 place-items-center">
        {numbers.map((item, i) => {
          if (item == "") {
            return (
              <div
                className="font-xl w-full h-full m-2 border bg-gray-600/50 place-content-center text-center border-red-300"
                key={item}
              >
                {item}
              </div>
            );
          }
          return (
            <div
              className="text-6xl font-sans text-red-300 w-full h-full m-2 border bg-red-700 place-content-center text-center border-red-300 hover:bg-red-900 cursor-pointer"
              key={item}
              style={{
                boxShadow:
                  "5px 5px 3px rgba(255,255,255,0.8) inset,-5px -5px 2px rgba(0,0,0,0.3) inset",
              }}
              id={`${i}`}
              onClick={shift}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
