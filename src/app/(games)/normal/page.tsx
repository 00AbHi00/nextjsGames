"use client";
import "../normal/style.css";
import { useState, useEffect } from "react";
import winner from "./winning";

export default function AluCross() {
  const n = 3;
  const [turnState, setTurnState] = useState(true);
  const [boxes, setBoxes] = useState(Array(n ** 2).fill(""));
  const [moveX, setMoveX] = useState<number[]>([]);
  const [moveY, setMoveY] = useState<number[]>([]);
  const colorX = "rgba(255,255,0,0.3)";
  const colorY = "rgba(255,0,255,0.3)";

  const [player1Name, setPlayer1Name] = useState("Player X");
  const [player2Name, setPlayer2Name] = useState("Player O");

  const [gameCount, setGameCount] = useState(0);
  const [winners, setWinners] = useState<string | null>(null);

  const getWinningCombinations = winner(n);

  // Prompt for names only on first load (client-side only)
  useEffect(() => {
    if (gameCount === 0) {
      const temp1 = prompt("Enter player 1 Name") || "Player X";
      const temp2 = prompt("Enter player 2 Name") || "Player O";
      setPlayer1Name(temp1);
      setPlayer2Name(temp2);
      setGameCount(1);
    }
  }, [gameCount]);

  const changeState = (index: number) => {
    const newBoxes = [...boxes];

    if (winners === null && newBoxes[index] === "") {
      const isXTurn = turnState;
      newBoxes[index] = isXTurn ? "X" : "0";

      document.getElementById("box" + index)!.style.backgroundColor = isXTurn
        ? colorX
        : colorY;

      if (isXTurn) {
        setMoveX((prev) => [...prev, index]);
      } else {
        setMoveY((prev) => [...prev, index]);
      }

      setBoxes(newBoxes);
      setTurnState(!turnState);
    }
  };

  const equalCheck = (moves: number[], combination: number[]) => {
    return combination.every((val) => moves.includes(val));
  };

  const checkWinner = () => {
    for (let combo of getWinningCombinations) {
      if (equalCheck(moveX, combo)) {
        setWinners(`won by ${player1Name}`);
        colorBoard(colorX);
        return;
      }
      if (equalCheck(moveY, combo)) {
        setWinners(`won by ${player2Name}`);
        colorBoard(colorY);
        return;
      }
    }
    if (moveX.length + moveY.length === n * n) {
      setWinners("ended in a Draw");
    }
  };

  const colorBoard = (color: string) => {
    const elements = document.getElementsByClassName("boxy");
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.backgroundColor = color;
    }
  };

  useEffect(() => {
    checkWinner();
  }, [moveX, moveY]);

  const resetEverything = () => {
    setTurnState(true);
    setBoxes(Array(n ** 2).fill(""));
    setMoveX([]);
    setMoveY([]);
    setWinners(null);

    const elements = document.getElementsByClassName("boxy");
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.backgroundColor = "rgba(255,0,0,0.1)";
    }
  };

  return (
    <>
      <h1 className="text-center p-2">Alu Cross</h1>
      <div className="ml-20 mr-20">
        <div className="grid grid-cols-3 gap-2 items-center cursor-pointer">
          {boxes.map((val, index) => (
            <div
              key={index}
              id={`box${index}`}
              className="bg-red-600 bg-opacity-10 h-24 text-center place-content-center boxy rounded-lg text-3xl flex items-center justify-center"
              onClick={() => changeState(index)}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="text-center mt-4 text-xl font-semibold">
          Game {winners ? winners : `in progress`}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={resetEverything}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
