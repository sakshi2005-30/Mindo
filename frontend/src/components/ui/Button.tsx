import type { ReactElement } from "react"

interface ButtonProps{
    title:string,
    variant:"primary"|"secondary",
    startIcon?:ReactElement,
    endIcon?:ReactElement
}
const styleVariants={
    primary:"bg-blue text-white hover:bg-blue/90 hover:shadow-lg hover:shadow-blue/30",
    secondary:"bg-light-blue text-blue hover:shadow-lg hover:shadow-blue/20"
}
const defaultStyles= "px-6 py-1.5 rounded-lg text-sm flex justify-center items-center gap-2 transition-all  cursor-pointer hover:-translate-y-1 duration-200 transform"

export const Button=(props:ButtonProps)=>{
    return (
        <button className={`${defaultStyles} ${styleVariants[props.variant]}`}>
       {props.startIcon && <span className="shrink-0">{props.startIcon}</span>}
        {props.title}
        {props.endIcon && <span className="shrink-0">{props.endIcon}</span>}
        </button>
    )
}