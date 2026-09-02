import React from "react";
interface inputProps{
    label?:string,
    type:string,
    value:string,
    placeholder?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    required?:boolean
}
export const Input = (props:inputProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-xs font-medium uppercase flex gap-1">{props.label}{!props.required &&<span className="lowercase text-gray-400">(optional)</span>}</label>
      <input type={props.type}
      required
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange} 
      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue focus:shadow-[0_0_8px_rgba(226,234,251,1)] focus-within:shadow-[0_0_8px_rgba(226,234,251,1)]transition-colors"
      />
    </div>
  )
}

