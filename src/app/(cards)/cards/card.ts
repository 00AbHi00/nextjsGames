const Suits=["♠","♥","♦","♣"]
const VALUES=[
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K"
    ]
      
    class PlayingCard {
        suit: string;
        rank: string;
        faceUp: boolean;
        
        constructor(suit: string, rank: string) {
            this.suit = suit;
            this.rank = rank;
            this.faceUp = false; // Default value for faceUp
        }
    }    
    export default class Deck{
        cards:PlayingCard[]
        constructor(cards=freshDeck())
        {
            this.cards=cards
        }
        getnumberOfCards(){
            return this.cards.length
        }
        shuffle()
        {
            for (let i:number= this.getnumberOfCards()-1;i>0;i--)
            {
                const newIndex=Math.floor(Math.random()*(i+1))
                const oldVal=this.cards[newIndex]
                this.cards[newIndex]=this.cards[i]
                this.cards[i]=oldVal
            }
        }
    }
    
    function freshDeck(){
     return Suits.flatMap(suit=>{
         return VALUES.map(value=>{
             return new PlayingCard(suit,value)
         })
     })
   }