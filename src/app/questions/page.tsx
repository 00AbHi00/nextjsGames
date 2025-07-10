import Link from "next/link"

const pages=["StateHandlingWithObjects",'Debounce',"fetch",'lazyLoad',"useContextHook"]

export default function Questions()
{
    return (
        <div className="grid place-items-center"> 
            <div className="grid items-center justify-center text-center mt-32 bg-gradient-to-bl shadow-blue-300 shadow-sm rounded-md p-3 from-pink-400 via-red-500 via  to-purple-900">
            {pages.map((item)=>
                <Link href={`/questions/${item}`} className="p-3 m-2 backdrop-blur-3xl shadow-sm shadow-white bg-gray-200/20 rounded-3xl hover:bg-red-600/30"
                    style=
                    {
                        {boxShadow: 
                            "2px 2px 2px inset white, 2px 2px 3px #ff5765, ",
                            
                        }}
                
                >{item}</Link>
            )}
            </div>
        </div>
    )
}

