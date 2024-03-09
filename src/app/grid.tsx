"use client"
import { useState } from "react"
import { Dispatch,SetStateAction } from "react";

function Box({confirmed_num,preliminary_numbers,id,focused_id,setFocused_box}:{confirmed_num:number;preliminary_numbers?:number[];id:number;focused_id:number;setFocused_box:Dispatch<SetStateAction<number>>;}){
    function boxClickHandler(){
        setFocused_box(id)
    }
    const box_33_x_index = id%3
    const box_33_y_index = Math.floor(id/9) %3
    const outer_box_33border_css = (box_33_x_index===0?"border-l-2 ":(box_33_x_index===2?"border-r-2 ":" ")) + (box_33_y_index===0?"border-t-2 ":(box_33_y_index===2?"border-b-2 ":" "))
    const outer_box_neutral_css = "hover:bg-[rgba(255,255,255,0.6)] border-slate-400 "
    const inner_box_not_focused_css = " border-gray-300"
    const inner_box_neutral_css = " border-2 border-solid [aspect-ratio:1;] w-full h-full flex items-center justify-center relative "
    const inner_box_focused_css = " border-rose-500 bg-yellow-300"
    const inner_same_col_or_row = " before:content-[''] before:absolute before:border-slate-300 before:bg-slate-200 before:w-full before:h-full before:z-[-1] "
    const inner_same_col_css = (focused_id===id?" ":(focused_id%9===id%9?(inner_same_col_or_row + " before:border-x-2 "):" "))
    const inner_same_row_css = (focused_id===id?" ":(Math.floor(focused_id/9)===Math.floor(id/9)?(inner_same_col_or_row + " before:border-y-2 "):" "))

    const inner_css = inner_box_neutral_css + inner_same_col_css + inner_same_row_css + (id===focused_id?inner_box_focused_css:inner_box_not_focused_css)

    return(
        <div onClick={boxClickHandler} className={outer_box_neutral_css+outer_box_33border_css}>
            <div className={inner_css}>
                {confirmed_num?confirmed_num:preliminary_numbers}
            </div>
        </div>
    )
}

export default function Grid(){
    const [confirmed_nums,setConfirmed_nums] = useState(Array.from(Array(9*9).keys()).map((n)=>{return{number:0,id:n}}))
    const [focused_box,setFocused_box] = useState(-1)

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const pushed_key = e.code;
        if(focused_box===-1)setFocused_box(0)

        if(!isNaN(Number(pushed_key.slice(-1)))){
            setConfirmed_nums(confirmed_nums.toSpliced(focused_box,1,{number:Number(pushed_key.slice(-1)),id:focused_box}))
        }else if( pushed_key.startsWith("Arrow")){
            switch (pushed_key.slice(-2)){
                case "Up":
                    if(focused_box>=9)setFocused_box(focused_box-9)
                    break;
                case "ht":
                    if(focused_box%9<8)setFocused_box(focused_box+1)
                    break;
                case "wn":
                    if(focused_box<=72)setFocused_box(focused_box+9)
                    break;
                case "ft":
                    if(focused_box%9>0)setFocused_box(focused_box-1)
                default:
                    console.log(pushed_key.slice(-2))
                    break;
            }
        }else{
            // console.log(pushed_key)
            switch (pushed_key){
                case "Backspace":
                case "Delete":
                    setConfirmed_nums(confirmed_nums.toSpliced(focused_box,1,{number:0,id:focused_box}))
                default:
                    break;
            }
        }
    }
    
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler} className="grid grid-cols-9 gap-0 w-[90%] [aspect-ratio:1;]">
            {confirmed_nums.map((item)=>{
                return(
                    <Box 
                        key={item.id}
                        confirmed_num={item.number}
                        id={item.id}
                        focused_id={focused_box}
                        setFocused_box={setFocused_box}
                    />
                )
            })}
        </div>
    )
}