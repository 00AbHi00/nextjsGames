"use client";
import { useState } from "react";

export default function FunctionName() {
  const positionPlayer = [];
  
  

// Case 1: no local storage magic
  const [inventory, setInventory] = useState({
    pushNearby: 3,
    swapPos: 3,
    moveEnd: 3,
  });

  // Case 2:Local storage magic
  // const [inventory, setInventory] = useState({
  //   pushNearby: 0,
  //   swapPos: 0,
  //   moveEnd: 0,
  // });
  // if(typeof window !== 'undefined'){
  //   // now access your localStorage
  //   const oldInventory = localStorage.getItem('data');
  //   console.log(oldInventory)
  // }

  const specialPowers = (key: string) => {
    const temp = {...inventory};
    switch (key) {
      case "pushNearby":
        if (temp.pushNearby>0){
          temp.pushNearby--;
        }        else{
          alert("You are out of this action")
        }
 
        break;

      case "swapPos":
        if (temp.swapPos>0){
          temp.swapPos--;
        }
        else{
          alert("You are out of this action, buy more")
        }
 
        break;
      case "moveEnd":
        if (temp.moveEnd>0){
          temp.moveEnd--;
        }
        else{
          alert("You are out of this action, buy more")
        }
        break;
      default:
        break;
    }
    setInventory(inventory=>({
      ...temp,
    }))
  };
  return (
    <div className="p-2 bg-red-300/20 md:mx-32">
      Player Inventory:
      <div className="flex justify-between p-2">
        {Object.entries(inventory).map(([key, value]) => {
          return (
            <div
              onClick={() => specialPowers(key)}
              className=" hover:bg-slate-700 cursor-pointer bg-slate-800 p-3 rounded-lg"
            >
              <span>{key}:</span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 grid-rows-3   bg-red-300">
        {Array.from({ length: 10 }).map((_, key) => {
          if (key == 3) {
            return (
              <Player
                className="m-3 bg-slate-300"
                key={key}
                id={`item${key}`}
              />
            );
          } else {
            return <Enemy key={key} id={`item${key}`} />;
          }
        })}
      </div>
      {/* <PopUp /> */}
    </div>
  );
}

const Player = ({
  id,
  key,
  className = "",
}: {
  id: string;
  key: number;
  className: string;
}) => {
  return <div id={id} key={key} className={`m-1 h-32 p-3  ${className}`}></div>;
};

const Enemy = ({
  id,
  key,
  className = "",
}: {
  id: string;
  key: number;
  className?: string;
}) => {
  return (
    <div
      id={id}
      key={key}
      className={`m-1 h-32 p-3 bg-blue-800 ${className}`}
    ></div>
  );
};

const PopUp = () => {
  return (
    <div className="h-screen w-screen absolute left-0 top-0 bg-red-900/20 backdrop-blur-3xl">
      <div className="absolute top-1/2 left-1/2 ">
        <div className="flex justify-between p-2">Are you sure</div>
      </div>
    </div>
  );
};
