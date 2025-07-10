import Link from "next/link";
export default function Home() {
  const gamesList=["normal","cards", "memgame","3player","4player","foxgame","8box","randomtries" ]
  return <div className="grid place-items-center h-screen">
    <ul className="border p-3 rounded-md flex flex-col text-center">
    <span> All games Lists</span> 
    
      {gamesList.map((item, key)=>
      {
        return(
          <ul className="p-2 hover:bg-slate-800 bg-slate-700 my-2" key={key}>
            <Link href={item}> {item}</Link>
          </ul>
        )
      })}
    </ul>

  
  </div>;
}
