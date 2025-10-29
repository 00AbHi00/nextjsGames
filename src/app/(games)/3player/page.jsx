"use client";
// hero abhi
import "../normal/style.css";
import { useState, useEffect } from "react";
import winner from "../3player/winning";

export default function AluCross() {
  const [n, setN] = useState(5);
  const [turnState, setTurnState] = useState(0);
  const [boxes, setBoxes] = useState(Array(n ** 2).fill(""));
  const [moveX, setMoveX] = useState([]);
  const [moveY, setMoveY] = useState([]);
  const [moveZ, setMoveZ] = useState([]);

  const colorX = "rgba(255,0,0,0.5)";
  const colorY = "rgba(0,255,0,0.5)";
  const colorZ = "rgba(255,105,0,0.5)";

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

    if (winners === null && newBoxes[index] === "") {
      if (turnState % 3 === 0) {
        setMoveX((prev) => [...prev, index]);
        newBoxes[index] = "X";
        document.getElementById(`box-${index}`).style.backgroundColor = colorX; // Apply background color
      } else if (turnState % 3 === 1) {
        setMoveY((prev) => [...prev, index]);
        document.getElementById(`box-${index}`).style.backgroundColor = colorY; // Apply background color
        newBoxes[index] = "Y";
      } else if (turnState % 3 === 2) {
        setMoveZ((prev) => [...prev, index]);
        newBoxes[index] = "Z";
        document.getElementById(`box-${index}`).style.backgroundColor = colorZ; // Apply background color
      }
      setTurnState((prev) => prev + 1);
      setBoxes(newBoxes);
    }
  };

  const getWinningCombinations = breakDownWinningCombinations(winner(4), 3);
  const equalCheck = (moves, combination) => {
    return combination.every((val) => moves.includes(val));
  };

  const checkWinner = () => {
    // console.log("Winning Combinations:", getWinningCombinations);
    // console.log("X Moves:", moveX);
    // console.log("Y Moves:", moveY);
    // console.log("Z Moves:", moveZ);

    if (moveX.length >= 3 || moveY.length >= 3 || moveZ.length >= 3) {
      for (let i = 0; i < getWinningCombinations.length; i++) {
        const combination = getWinningCombinations[i];
        console.log("Checking Combination:", combination);
        if (equalCheck(moveX, combination)) {
          console.log("X Wins with Combination:", combination);
          setWinners("X");
          return; // Exit early once a winner is found
        }
        if (equalCheck(moveY, combination)) {
          console.log("Y Wins with Combination:", combination);
          setWinners("Y");
          return; // Exit early once a winner is found
        }
        if (equalCheck(moveZ, combination)) {
          console.log("Z Wins with Combination:", combination);
          setWinners("Z");
          return; // Exit early once a winner is found
        }
      }
    }
    console.log("No winner");
  };

  useEffect(() => {
    checkWinner();
  }, [moveX, moveY, moveZ]);

  const resetEverything = () => {
    if (winners === "X") {
      setTurnState(0);
    } else if (winners === "Y") {
      setTurnState(1);
    } else if (winners === "Z") {
      setTurnState(2);
    }
    boxes.map((val, index) => (
      document.getElementById(`box-${index}`)
    ))
    setBoxes(Array(n ** 2).fill(""));
    setMoveX([]);
    setMoveY([]);
    setMoveZ([]);
    setWinners(null);
  };

  return (
    <>
      <h1 className="text-center p-2">Alu Cross</h1>
      <div className="ml-20 mr-20">
        <div
          className={`grid grid-cols-5 grid-flow-row-5 gap-2 items-center cursor-pointer`}
        >
          {boxes.map((val, index) => (
            <div
              key={index}
              id={`box-${index}`}
              className={`bg-red-600 bg-opacity-10 h-24 text-center place-content-center ${
                winners ? "bg-green-800" : ""
              }`}
              onClick={() => changeState(index)}
            >
              {val} {index}
            </div>
          ))}
        </div>
        <div>Winner is: {winners}</div>
        <br />
        <button className="bg-red-600 p-3 rounded-lg" onClick={resetEverything}>
          Reset
        </button>
        <br />
        {/* <div>X: {moveX.join(", ")}</div>
        <div>Y: {moveY.join(", ")}</div>
        <div>Z: {moveZ.join(", ")}</div> */}
        <br />
        {/* {getWinningCombinations.map((e, index) => ( */}
        {/* <div key={index}> */}
        {/* {e.join(", ")} Convert array to string for display */}
        {/* </div> */}
        {/* // ))} */}
      </div>
    </>
  );
}
