"use client";
import React, { useEffect, useState } from "react";

export default function memGame() {
  const SUITS = ["♧", "♥", "♦", "&"];
  const [SuitsArr, setSuitsArr] = useState<Array<string>>([]);
  const [cardConditions, setCardConditions] = useState<boolean[]>(
    new Array(SuitsArr.length).fill(false)
  ); // Track card flip status
  const [selectedCards, setSelectedCards] = useState<
    Array<{ index: number; value: string }>
  >([]); // Track clicked cards

  const createSuitsArr = () => {
    return SUITS.flatMap((val) => {
      return Array(2).fill(val);
    });
  };

  //   This was my try
  //   const display = (index: number) => {
  //     const newConditions = [...cardConditions];
  //     newConditions[index] = true;
  //     setCardConditions(newConditions);
  //     setTimeout(() => {
  //       setCardConditions(Array(SuitsArr.length).fill(false));
  //     }, 2000);
  //     // need to get the value inside the card and if two values matches, the card should be popped out
  //   };
  const display = (index: number) => {
    const newConditions = [...cardConditions];
    newConditions[index] = true;
    setCardConditions(newConditions);

    const clickedCard = { index, value: SuitsArr[index] };

    if (selectedCards.length < 2) {
      setSelectedCards((prev) => [...prev, clickedCard]);
    }

    if (selectedCards.length === 1) {
      setTimeout(() => {
        const [firstCard, secondCard] = [selectedCards[0], clickedCard];

        if (firstCard.value === secondCard.value) {
          // Match found: remove the cards
          setSuitsArr((prev) =>
            prev.map((val, idx) =>
              idx === firstCard.index || idx === secondCard.index ? "" : val
            )
          );
        } else {
          // No match: flip the cards back
          const resetConditions = [...cardConditions];
          resetConditions[firstCard.index] = false;
          resetConditions[secondCard.index] = false;
          setCardConditions(resetConditions);
        }

        setSelectedCards([]); // Reset selected cards
      }, 1000);
    }
  };
  // my try
    // useEffect(() => {
    //   let tempArr = createSuitsArr();
    //   let temp2 = () => {
    //     let xtemp;
    //     let ytemp = [];
    //     for (let i = tempArr.length; i > 0; i--) {
    //       xtemp = tempArr.splice(Math.abs(Math.random() * tempArr.length), 1);
    //       ytemp.push(xtemp);
    //     }
    //     return ytemp;
    //   };
    //   tempArr = temp2();
    //   setSuitsArr(tempArr);
    //   setCardConditions(new Array(tempArr.length).fill(false));  
    // }, []);

  useEffect(() => {
    let tempArr = createSuitsArr();

    // Shuffle the array
    let shuffledArr = tempArr.sort(() => 0.5 - Math.random());
    setSuitsArr(shuffledArr);

    // Initialize card conditions after setting SuitsArr
    setCardConditions(new Array(shuffledArr.length).fill(false));
  }, []);


  if(SuitsArr.length==0)
  {
    return(
        <>
            YOU WON
        </>
    )
  }
  
  return (
    <>
      <div className="grid grid-cols-4 gap-2 ">
        {SuitsArr.map((val, index) => {
          return (
            <div
              key={index}
              id={`box${index}`}
              onClick={() => display(index)}
              className="place-self-center"
            >
              <Card value={val} condition={cardConditions[index]} key={index} />
            </div>
          );
        })}
      </div>
      <button
        className="bg-red-800 rounded-xl p-3 m-2"
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
    </>
  );
}

function Card({
  value,
  condition = false,
  key = 0,
}: {
  value: string;
  condition: boolean;
  key: number;
}) {
  if (!condition) {
    return (
      <div
        id={`box${key}`}
        className="size-32 bg-gray-800 rounded-xl p-3 m-3 text-white"
      ></div>
    );
  }
  return (
    <>
      <div className="size-32 bg-slate-500 cursor-pointer rounded-xl m-3 p-3 text-7xl text-center">
        {value}
      </div>
    </>
  );
}
