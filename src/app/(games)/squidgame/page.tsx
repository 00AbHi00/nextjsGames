"use client";
import { useState } from "react";

export default function FunctionName() {
  const positionPlayer = [];
  const [inventory, setInventory] = useState({
    pushNearby: 1,
    swapPos: 1,
    moveEnd: 1,
  });
  return (
    <div className="p-2 bg-red-300/20 sm:mx-16 md:mx-64">
      Player Inventory:
      <div className="flex justify-between p-2">
        {Object.entries(inventory).map(([key, value]) => {
          return (
            <div className=" hover:bg-slate-700 cursor-pointer bg-slate-800 p-3 rounded-lg">
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
      <PopUp />
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
