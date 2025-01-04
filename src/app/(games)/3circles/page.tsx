"use client";
import { use, useState } from "react";
import "./style.css";
export default function threeCircles() {
  const [turn, setTurn] = useState(1);


  const stop = () => {
    const c1 = document.getElementById("card1ref");
    const c2 = document.getElementById("card2ref");
    const c3 = document.getElementById("card3ref");
  
    if (turn == 1) {
      c1?.classList.add("stopped");
    }
    if (turn == 2) {
      c2?.classList.add("stopped");
    }
    if (turn == 3) {
      c3?.classList.add("stopped");
      setTimeout(()=>{
        alert("You WIN YOURE HERO ASDJlkskdjashdjlashdfkahsdflashldf")
      },2000)
    }
    setTurn((turn)=>turn+1)
};

  const begin = () => {
    const c1 = document.getElementById("card1ref");
    const c2 = document.getElementById("card2ref");
    const c3 = document.getElementById("card3ref");
  
    if (turn == 1) {
        c1?.classList.add("move1");
        c1?.classList.remove("stopped");
    }
    if (turn == 2) {
        c2?.classList.add("move2");
        c2?.classList.remove("stopped");
    }
    if (turn == 3) {
        c3?.classList.add("move3");
        c3?.classList.remove("stopped");
    }
};
  return (
    <>
      <div className="relative grid h-screen">
        <div className=" place-self-center size-[200px] bg-red-50 rounded-full "></div>
        <span className="place-self-center">
          <button onClick={begin} className="p-3 bg-red-800 w-fit h-fit ">
            Begin
          </button>
          <button
            onClick={stop}
            className="p-3 bg-red-800 w-fit h-fit place-self-center"
          >
            Stop
          </button>
        </span>
      </div>
      <div
        id="card1ref"
        className="absolute top-12 size-[211px] bg-red-800 rounded-full "
      ></div>
      <div
        id="card3ref"
        className="absolute  top-24 left-12 size-[211px]  bg-red-300 rounded-full "
      ></div>
      <div
        id="card2ref"
        className="absolute -top-10 size-[211px] right-36   bg-red-500 rounded-full "
      ></div>
    </>
  );
}
