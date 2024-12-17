"use client";
import "../normal/style.css";
import { useState, useEffect } from "react";
import winner from "./winning";

export default function AluCross() {
  const n = 5;
  const [turnState, setTurnState] = useState("X");
  const [boxes, setBoxes] = useState(Array(n ** 2).fill(""));
  const [moveX, setMoveX] = useState([]);
  const [moveY, setMoveY] = useState([]);
  const [moveZ, setMoveZ] = useState([]);
  const [moveW, setMoveW] = useState([]);

  // const [moveA, setMoveA] = useState([]);
  // const [moveB, setMoveB] = useState([]);

  const colorX = "rgba(255,0,0,0.5)";
  const colorY = "rgba(0,255,0,0.5)";
  const colorZ = "rgba(255,105,0,0.5)";
  const colorW = "rgba(0,255,100,0.5)";

  const [winners, setWinners] = useState(null);

  function generateOverlappingSubsets(array, subsetSize) {
    const subsets = [];
    for (let i = 0; i <= array.length - subsetSize; i++) {
      subsets.push(array.slice(i, i + subsetSize));
    }
    return subsets;
  }

  function breakDownWinningCombinations(combinations, winningSize) {
    return combinations.flatMap((combination) =>
      generateOverlappingSubsets(combination, winningSize)
    );
  }

  const changeState = (index) => {
    const newBoxes = [...boxes];
    console.log(index);
    if (winners === null && newBoxes[index] === "") {
      if (turnState === "X") {
        setMoveX((prev) => [...prev, index]);
        document.getElementById(`box-${index}`).style.backgroundColor = colorX; // Apply background color
        newBoxes[index] = "X";
        setTurnState(()=>"Y")
      } else if (turnState === "Y") {
        setMoveY((prev) => [...prev, index]);
        document.getElementById(`box-${index}`).style.backgroundColor = colorY; // Apply background color
        setTurnState(()=>"Z")
        
        newBoxes[index] = "Y";
      } else if (turnState === "Z") {
        setMoveZ((prev) => [...prev, index]);
        document.getElementById(`box-${index}`).style.backgroundColor = colorZ; // Apply background color

        newBoxes[index] = "Z";
        setTurnState(()=>"W")
      
      } else if (turnState === "W") {
        setMoveW((prev) => [...prev, index]);
        document.getElementById(`box-${index}`).style.backgroundColor = colorW; // Apply background color
        newBoxes[index] = "W";
        setTurnState(()=>"X")
      }
      setBoxes(newBoxes);
    }
  };

  const getWinningCombinations = breakDownWinningCombinations(winner(n), 3);
  const equalCheck = (moves, combination) => {
    return combination.every((val) => moves.includes(val));
  };

  const checkWinner = () => {
    if (
      moveX.length >= 3 ||
      moveY.length >= 3 ||
      moveZ.length >= 3 ||
      moveW.length >= 3
    ) {
      for (let i = 0; i < getWinningCombinations.length; i++) {
        const combination = getWinningCombinations[i];
        if (equalCheck(moveX, combination)) {
          setWinners("X");
          const elements=document.getElementsByClassName("boxy")
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorX;
          }
          return; // Exit early once a winner is found
        }
        if (equalCheck(moveY, combination)) {
          setWinners("Y");
          const elements=document.getElementsByClassName("boxy")
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorY;
          }
          return; // Exit early once a winner is found
        }
        if (equalCheck(moveZ, combination)) {
          setWinners("Z");
          const elements=document.getElementsByClassName("boxy")
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorX;
          }
          return; // Exit early once a winner is found
        }
        if (equalCheck(moveW, combination)) {
          setWinners("W");
          const elements=document.getElementsByClassName("boxy")
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = colorZ;
          }
          return; // Exit early once a winner is found
        }
      }
    }
    console.log("No winner");
  };

  useEffect(() => {
    checkWinner();
  }, [moveX, moveY, moveZ, moveW]);

  const resetEverything = () => {
    setTurnState("X");
    setBoxes(Array(n ** 2).fill(""));
    setMoveX([]);
    setMoveY([]);
    setMoveZ([]);
    setMoveW([]);
    setWinners(null);
    const elements = document.getElementsByClassName("boxy");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "rgba(255,0,0,0.1)";
    }
  };

  const handleclick = (e) => {
    console.log(e);
  };

  return (
    <>
      <h1 className="text-center p-2">Alu Cross</h1>
      <div className="ml-20 mr-20">
        <div
          className={`grid grid-cols-${n} grid-flow-row-${n} gap-2 items-center cursor-pointer`}
        >
          {boxes.map((val, index) => (
            <div
              key={index}
              id={`box-${index}`} // Add a unique ID to each box
              className={`bg-red-600 bg-opacity-10 h-24 text-center place-content-center boxy ${
                winners && "bg-green-400"
              }`}
              onClick={() => changeState(index)}
            >
              {val}
            </div>
          ))}
        </div>
        <div>Winner is: {winners}</div>
        <br />
        <div className="flex justify-evenly">
          <button
            className="bg-red-600 p-3 rounded-lg"
            onClick={resetEverything}
          >
            Reset
          </button>
          <h1>
           Next Turn: {turnState}
          </h1>
          
        </div>
        {/* <br />
        <div>X: {moveX.join(", ")}</div>
        <div>Y: {moveY.join(", ")}</div>
        <div>Z: {moveZ.join(", ")}</div>
        <div>W: {moveW.join(", ")}</div>
        <br /> */}

        {/* {getWinningCombinations.map((e, index) => ( */}
        {/* <div key={index}> */}
        {/* {e.join(", ")} Convert array to string for display */}
        {/* </div> */}
        {/* ))} */}
      </div>
    </>
  );
}
