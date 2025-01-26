"use client";

import { useEffect, useRef } from "react";

export default function Golf() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(10, 10, 10, 100);

        // Example: Draw a circle
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }
  }, []);
  return (
    <>
      <canvas
        ref={canvasRef}
        className=" bg-red-800 m-12 "
        style={{
          width: "calc(100vw - 6rem)",
          height: "calc(100vh - 6rem)",
        }}
      ></canvas>
    </>
  );
}
