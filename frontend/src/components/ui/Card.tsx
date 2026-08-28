import { Copy, Trash } from "../../icons/PlusIcon"

interface cardProps{
    title:string,
    contentType:string,
    description?:string,
    tags?:string[],
    link:string
}
const contentAndTagStyles="inline-block text-xs bg-light-blue text-blue px-2 py-0.5 rounded font-medium"

const getEmbedUrl = (url: string) => {
  if (url.includes("embed/")) return url
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop()
  return `https://www.youtube.com/embed/${videoId}`
}
const getEmbedTwitter=(url:string)=>{
    url.replace("x.com","twitter.com");
    return url;
}
export const Card=(props:cardProps)=>{
    return (
        <div className="w-74 bg-white border rounded-lg flex flex-col items-left px-6 py-4 border-gray-200 m-6 shadow-md gap-6">
            {/* Tweet Media Wrapper */}
            {props.contentType==="twitter" &&(
                <div className="">
                <div className=" border border-gray-200 rounded-lg h-32 w-full overflow-hidden">
                 <blockquote className="twitter-tweet" >
                    <a href={ getEmbedTwitter(props.link)}></a>
                </blockquote>
                </div>
            </div> 
            )}
             {/* youtube embed */}
             {props.contentType==="youtube" && (
                <div > <iframe
                className="w-full h-full border-0 rounded-lg"
                src={getEmbedUrl(props.link)}
                title={props.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                
            /></div>
             )}
            {props.contentType=="link" &&(
               <div>
                    
               </div> 
            )}
            <div className="flex flex-col gap-2">
                {/* contentType */}
                <div> <span className={`${contentAndTagStyles} uppercase`}>
                {props.contentType}
                </span></div>
               
                {/* title */}
                 <div className="text-sm font-medium">
                {props.title}
                {/* description */}
                 {props.description &&(
                    <div className="text-xs text-gray-400">
                        {props.description}
                    </div>
                )}
                </div>
                {/* tags */}
                <div className="flex gap-1">
                {props.tags?.map((tag,index)=>(
                    <span key={index} className={`${contentAndTagStyles}`}>#{tag}</span>
                ))}
            </div>
            </div>
        {/* buttons */}
           <div className="flex w-full gap-1">
              <button className="flex-1  bg-blue text-white text-xs font-medium rounded-lg px-4 py-1.5 hover:bg-blue/95 hover:shadow-lg hover:shadow-blue/50 cursor-pointer transition transform duration-300 hover:-translate-y-0.5 flex justify-center items-center gap-1"><Copy size="md"/>Copy Link</button>
              <button className="bg-red-200 text-red-600 px-2 py-1 rounded-lg hover:shadow-lg hover:shadow-red-400/20 cursor-pointer transition transform duration-300 hover:-translate-y-0.5"><Trash size="md"/></button>

           </div>
        </div>
    )
}
