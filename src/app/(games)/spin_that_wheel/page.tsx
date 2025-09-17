"use client";
import { useEffect, useState } from "react";

export default function SpinThatWheel() {
  const [itemList, setItemList] = useState({
    id: Number,
    content: String,
    percentage: Number,
  });

  const [spin, setSpin] = useState(0);

  return (
    <div className="m-10">
      <div
        className="size-20 bg-red-50 m-auto "
        style={{
          rotate: "180deg",
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
        }}
      ></div>
      <div
        style={{ rotate: `${spin}deg`, animationDuration: "10000ms" }}
        className="
        after:bg-red-900 after:absolute after:top-3
        transition-all
        ease-out
        bg-gradient-to-tr relative from-purple-500 via-pink-700 to-orange-300  m-auto -mt-3  size-96 rounded-full"
      >
        {/* total items=2 360/2 */}
        {Array(3).fill(null).map((_, index) => {
          return (
            <div
              style={{ rotate: `${360/3*index}deg`,transformOrigin:'center' }}
              className="size-44  bg-red-400"
            >
                adasd
            </div>
          );
        })}
      </div>
      <div className="flex justify-center m-4">
        <button
          onClick={() =>
            setSpin((x) => {
              return Math.round(x + 2500 + Math.random() * 360);
            })
          }
          className="p-3 text-center bg-red-600 rounded "
        >
          Spin
          {spin}
        </button>
      </div>

     </div>
  );
}
