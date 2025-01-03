"use client";
import {  useEffect, useState } from "react";

export default function Fox() {
  const [getIndex, setgetIndex] = useState(0);
  const [box, setBox] = useState(Array(16).fill(""));
  const [random, setRandom] = useState(0);
  const [temp, setTemp] = useState("");
  const [win,setWin]=useState(false)
  const [letterArr, setLetterArr] = useState([
    "F",
    "F",
    "F",
    "F",
    "F",
    "O",
    "O",
    "O",
    "O",
    "O",
    "X",
    "X",
    "X",
    "X",
    "X",
    "X",
  ]);
  const [movesArr, setMovesArr] = useState([]);
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const handleClick = () => {
    const element = document.getElementById(`box${getIndex}`);
    if (element) {
      element.style.backgroundColor = "red";
      let random = getRandom(0, letterArr.length);
      element.innerHTML = letterArr[random];
      let tempArr = [...letterArr];
      let x = tempArr.splice(random, 1);

      setLetterArr(() => tempArr);
      setMovesArr((tempMove) => [...tempMove, x]);
      setgetIndex((prev) => prev + 1);
    }
  };
  const resetClick = () => {
    const elements = document.getElementsByClassName("boxy");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "rgba(0,0,0,0)";
      elements[i].innerHTML = "";
    }
    setgetIndex(0);
    setMovesArr([]);
    setLetterArr([
      "F",
      "O",
      "X",
      "F",
      "O",
      "X",
      "F",
      "O",
      "X",
      "F",
      "O",
      "X",
      "F",
      "O",
      "X",
      "X",
    ]);
  };
  useEffect(() => {
    const boardSize = 4;
    const board = [];

    // Convert movesArr into a 2D grid representation
    for (let i = 0; i < movesArr.length; i += boardSize) {
      board.push(movesArr.slice(i, i + boardSize));
    }

    const checkWin = (arr) => {
      if (arr.length === 3 && arr.every((val) => val !== undefined)) {
        return arr.join('') === 'FOX';
      }
      return false;
    };

    if (board.length < 3) return;
    // Check rows
    
    if (board.length < boardSize) return;
    
    for (let row = 0; row < boardSize; row++) {
      for (let i = 0; i <= boardSize - 3; i++) {
        if (checkWin([board[row][i], board[row][i + 1], board[row][i + 2]])) {
          endGame();
          return;
        }
      }
    }
    
    // Check columns
    for (let col = 0; col < boardSize; col++) {
      for (let i = 0; i <= boardSize - 3; i++) {
        if (board[i] && board[i + 1] && board[i + 2]) {
          const column = [board[i][col], board[i + 1][col], board[i + 2][col]];
          if (checkWin(column)) {
            endGame();
            return;
          }
        }
      }
    }

    // Check diagonals
    for (let i = 0; i <= boardSize - 3; i++) {
      if (board[i] && board[i + 1] && board[i + 2]) {
        const diagonal1 = [board[i][i], board[i + 1][i + 1], board[i + 2][i + 2]];
        if (checkWin(diagonal1)) {
          endGame();
          return;
        }

        const diagonal2 = [
          board[i][boardSize - 1 - i],
          board[i + 1][boardSize - 2 - i],
          board[i + 2][boardSize - 3 - i],
        ];
        if (checkWin(diagonal2)) {
          endGame();
          return;
        }
      }
    }
    if(movesArr.length>=16)
      {
        winGame()
      }
    
  }, [movesArr]);
   
  const winGame = () => {
    let winOver = document.getElementById("winOver");
    winOver.classList.remove("hidden");
    setTimeout(() => {
      winOver.classList.add("hidden");
    }, 2000);
    resetClick();
  };

  const endGame = () => {
    let over = document.getElementById("over");
    over.classList.remove("hidden");
    setTimeout(() => {
      over.classList.add("hidden");
    }, 2000);
    resetClick();
  };
  return (
    <>
      <div className="m-3 grid grid-cols-4 grid-rows-4 gap-2">
        {box.map((val, index) => (
          <div key={index} id={`box` + index} className="outline p-3 h-16 boxy">
            {val}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around">
        <button onClick={handleClick} className="bg-red-900 p-4 rounded-lg">
          NextLetter
        </button>

        <button onClick={resetClick} className="bg-red-900 p-4 rounded-lg">
          Reset
        </button>
      </div>
      this is moves:
      {movesArr}
      <div
        id="over"
        className="absolute top-0 left-0 text-center backdrop-blur-sm h-full w-full hidden grid place-content-center text-4xl"
      >
        Game-Over
      </div>
      <br />
      <div
        id="winOver"
        className="absolute text-green-700 top-0 left-0 text-center backdrop-blur-sm h-full w-full hidden grid place-content-center text-4xl"
      >
       You Won
      </div>
      <br />
      Arr:{letterArr}
    </>
  );
}
