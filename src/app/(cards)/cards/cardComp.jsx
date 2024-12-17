import "@/app/(cards)/cards/cardCompstyle.css"


export default function CardComp({rank="A",suit="♥",faceUP=false})
{
    let heightCard=300
    let widthCard=200
    
    if (!faceUP)
    {
        return(
            <>
               <div className="bg-slate-900 p-3 rounded-lg m-2 relative" 
                id="cardBack2"
               style={{height:heightCard+"px",width:widthCard +"px"}}>
                
                </div>
            </>
        )
    }

    let textClr="text-blue-800"
    if (suit === "♥" || suit === "♦" )
    {
        textClr="text-red-800"
    }
    return(
        <div className="bg-slate-800 p-3 rounded-lg m-2 relative" style={{height:heightCard+"px",width:widthCard +"px"}}>
            <span className=" leading-5 text-xl">
                <p>{rank}</p>
                <p
                  className={`${textClr}`}
                >
                   {suit}
                </p> 
            </span>

            <span
              className={`${textClr}`}
                id="bigRank"
                >
                {suit}
            </span>

            <span className="absolute leading-5 text-xl" style={{top:85+"%",left:85+"%",scale:-1}}>
            <p>{rank}</p>
                <p
                  className={`${textClr}`}
                >
                   {suit}
                </p> 
            </span>

        </div>
    )
}