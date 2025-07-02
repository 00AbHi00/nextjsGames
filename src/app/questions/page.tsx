import Link from "next/link"

const pages=["StateHandlingWithObjects",'Debounce',"fetch",'lazyLoad',"useContextHook"]

export default function Questions()
{
    return (
        <div className="grid place-items-center"> 
            <div className="grid items-center justify-center text-center mt-32 bg-gradient-to-bl from-pink-400 via-red-500 via  to-purple-900">
            {pages.map((item)=>
                <Link href={`/questions/${item}`} className="p-3 m-2 backdrop-blur-xl shadow-sm shadow-white bg-yellow-200/20 rounded-3xl">{item}</Link>
            )}
            </div>
        </div>
    )
}

