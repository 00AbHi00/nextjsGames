import Link from "next/link"

const pages=["StateHandlingWithObjects",'Debounce',"fetch",'lazyLoad',"useContextHook"]

export default function Questions()
{
    return (
        <div className="grid place-items-center"> 
            <div className="grid items-center justify-center text-center mt-32 bg-red-900">
            {pages.map((item)=>
                <Link href={`/questions/${item}`} className="p-3 ">{item}</Link>
            )}
            </div>
        </div>
    )
}

