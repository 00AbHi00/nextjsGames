"use client";

import { useState } from "react";
import { Box } from "./box";

export default function FunctionName() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    color: string
  ) => {
    e.dataTransfer.setData("text/plain", color);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const color = e.dataTransfer.getData("text/plain");
    
    const posX = e.clientX 
    const posY = e.clientY 
    const newBox = new Box(color, posX, posY); // Example position (you can modify this)
    setBoxes([...boxes, newBox]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      {/* Draggable items */}
      <div className="grid gap-3 m-10">
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "red")}
          className={`w-10 h-10 bg-red-500 cursor-pointer`}
        ></div>
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "green")}
          className={`w-10 h-10 bg-green-500 cursor-pointer`}
        ></div>

        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, "blue")}
          className={`w-10 h-10 bg-blue-500 cursor-pointer`}
        ></div>
      </div>

      {/* Droppable area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="grid relative grid-cols-3 grid-rows-3 gap-3 p-3 bg-slate-300 outline flex-1"
      >
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`w-20 h-20 fixed`}
            style={{ backgroundColor: box.color, opacity:"30%",
              top: `${box.posY}px`,
              left: `${box.posX}px`,}}
          ></div>
        ))}
      </div>
    </div>
  );
}
