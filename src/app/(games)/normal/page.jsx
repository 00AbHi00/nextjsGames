"use client";
import "../normal/style.css";
import { useState, useEffect } from "react";
import winner from "../normal/winning";

export default function AluCross() {
  const n = 3;
  const [turnState, setTurnState] = useState("true");
  const [boxes, setBoxes] = useState(Array(n ** 2).fill(""));
  const [moveX, setMoveX] = useState([]);
  const [moveY, setMoveY] = useState([]);
  const colorX = "rgba(255,255,0,0.3)";
  const colorY = "rgba(255,0,255,0.3)";
  
  const [player1Name,setPlayer1Name]=useState("")
  const [player2Name,setPlayer2Name]=useState("")
  
  const [gameCount,setGameCount]=useState(0)
  
  if (gameCount===0)
  {
    let temp=prompt("Enter player 1 Name")
    setPlayer1Name(temp)
    temp=prompt("Enter player 2 Name")
    setPlayer2Name(temp)
    setGameCount((prev)=>prev+1)
  }
  const [winners, setWinners] = useState(null);

  const changeState = (index) => {
    const newBoxes = [...boxes];

    if (winners === null) {
      if (newBoxes[index] == "") {
        setTurnState(!turnState);
        newBoxes[index] = turnState ? "X" : "0";
        document.getElementById("box" + index).style.backgroundColor = turnState
          ? colorX
          : colorY;

        if (turnState) {
          setMoveX((prev) => [...prev, index]);
        }
        if (!turnState) {
          setMoveY((prev) => [...prev, index]);
        }
      }
      setBoxes(newBoxes);
    }
  };
  const getWinningCombinations = winner(n);

  const equalCheck = (moves, combination) => {
    return combination.every((val) => moves.includes(val));
  };

  const checkWinner = () => {
    if (moveX.length >= n) {
      for (let i = 0; i < getWinningCombinations.length; i++) {
        if (equalCheck(moveX, getWinningCombinations[i])) {
          setWinners(() => "is won by "+player1Name);
          const elements = document.getElementsByClassName("boxy");
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorX;
          }
        }
        if (equalCheck(moveY, getWinningCombinations[i])) {
          setWinners(() => "is won by "+player2Name);
          const elements = document.getElementsByClassName("boxy");
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorY;
          }
        }
      }
    }
    // console.log("X:", moveX);
    // console.log("Y:", moveY);
  };

  useEffect(() => {
    if (moveX.length >= 5 && moveY.length >= 4) {
      setWinners(() => "has ended in Draw");
    }
    checkWinner();
  }, [moveX, moveY]);

  const resetEverything = () => {
    setTurnState(() => "true");
    setBoxes(() => Array(n ** 2).fill(""));
    setMoveX(() => []);
    setMoveY(() => []);
    setWinners(() => null);
    const elements = document.getElementsByClassName("boxy");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "rgba(255,0,0,0.1)";
    }
  };
  return (
    <>


      <h1 className="text-center p-2">Alu Cross</h1>
      <div className="ml-20 mr-20">
        <div
          className={` grid grid-cols-3 grid-flow-row-3 gap-2 items-center cursor-pointer `}
        >
          {boxes.map((val, index) => (
            <div
              key={index}
              id={`box${index}`}
              className={`bg-red-600 bg-opacity-10 h-24 text-center place-content-center checked:bg-opacity-0 boxy rounded-lg
                ${winners} && bg-green-400
                `}
              onClick={() => changeState(index)}
            >
              {val}
            </div>
          ))}
        </div>
        Game {winners}
        <br />
        <div className="flex justify-center">
          <button
            className="bg-red-600 p-3 rounded-lg"
            onClick={resetEverything}
          >
            Reset
          </button>
        </div>
        {/* X:{moveX}
        <br />
        Y:{moveY}
        <br /> */}
      </div>
    </>
  );
}
