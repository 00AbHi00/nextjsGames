"use client";
import { use, useEffect, useState } from "react";
import Deck from "./card";
import CardComp from "./cardComp";

type CardType = {
  rank: string;
  suit: string;
  faceUp: boolean;
};

export default function Cardss() {
  const [cardsArr, setCardsArr] = useState<CardType[]>([]);
  const [playerArr, setPlayerArr] = useState<CardType[]>([]);
  const [oppArr, setOppArr] = useState<CardType[]>([]);
  const [oppCardShow,setOppCardShow]=useState(false)

  const [shuffleCount, setShuffleCount] = useState(0); // Counter to trigger reshuffle

 
  useEffect(() => {
    const deck = new Deck();
    deck.shuffle(); // Shuffle only on the client side
    setCardsArr(deck.cards); // Set the shuffled cards in state

    let playerArrayTemp = new Deck(deck.cards.splice(0, 3));
    setPlayerArr(playerArrayTemp.cards);

    let oppArrTemp = new Deck(deck.cards.splice(0, 3));
    setOppArr(oppArrTemp.cards);
  }, [shuffleCount]);

  const resuffle = () => {
    setShuffleCount((prevCount) => prevCount + 1); // Increment count to trigger reshuffle
    setOppCardShow(false)
  };

  const showCard=()=>{
    setOppCardShow(true)
  }

  return (
    <>
      <h3>Opp Arr</h3>
      <OppCards oppArr={oppArr} oppCardShow={oppCardShow}/>

      <h3>Total Arr</h3>
      <TotalCards cardsArr={cardsArr} />

      <button className="absolute bg-red-400 rounded p-2 left-1/2 top-2/3"
        onClick={resuffle}> 
        Resuffle
      </button>

      <button className="absolute bg-red-400 rounded p-2 left-2/3 top-2/3"
        onClick={showCard}> 
        Show
      </button>

      <h3>Player Arr</h3>
      <PlayerCards playerArr={playerArr} />
      
    </>
  );
}

// Pass cardsArr as a prop to the TotalCards component
function TotalCards({ cardsArr }: { cardsArr: CardType[] }) {
  return (
    <div className="relative" style={{ width: "100%", height: "300px" }}>
      {cardsArr.map((val: CardType, index: number) => (
        <div
          className="absolute"
          style={{
            left: `${index * 0.2}px`,
            top: 0,
            transform: `rotate(${Math.random() * 10 - 10}deg)`,
          }}
          key={index}
        >
          <CardComp rank={val.rank} suit={val.suit} faceUP={false} />
        </div>
      ))}
    </div>
  );
}

function PlayerCards({ playerArr }: { playerArr: CardType[] }) {
  return (
    <div className="relative grid grid-cols-3 gap-4 mt-4">
      {playerArr.map((val: CardType, index: number) => {
        return (
          <CardComp key={index} rank={val.rank} suit={val.suit} faceUP={true} />
        );
      })}
    </div>
  );
}

function OppCards({ oppArr,oppCardShow }: { oppArr: CardType[],oppCardShow: boolean }) {
  return (
    <div className="grid grid-cols-3">
      {oppArr.map((val: CardType, index: number) => {
        return <CardComp key={index} rank={val.rank} suit={val.suit} faceUP={oppCardShow} />;
      })}
    </div>
  );
}
