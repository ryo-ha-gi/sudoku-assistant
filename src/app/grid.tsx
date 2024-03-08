"use client"
import { useState,useEffect,useCallback,createRef } from "react"
import { Dispatch,SetStateAction,RefObject } from "react";

function Box({confirmed_num,preliminary_numbers,id,setFocused_box}:{confirmed_num:number;preliminary_numbers?:number[];id:number;setFocused_box:Dispatch<SetStateAction<number>>;}){
    function boxClickHandler(){
        setFocused_box(id)
    }
    return(
        <div tabIndex={0} onClick={boxClickHandler}>
            {confirmed_num?confirmed_num:preliminary_numbers}
        </div>
    )
}

export default function Grid(){
    const [confirmed_nums,setConfirmed_nums] = useState(Array.from(Array(9*9).keys()).map((n)=>{return{number:1,id:n}}))
    const [focused_box,setFocused_box] = useState(3)

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const pushed_key = e.code;
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
            switch (pushed_key){
                case "Tab":
                    if(focused_box>0 && focused_box<80)setFocused_box(focused_box+1)
                    break;
                default:
                    break;
            }
        }
    }
    
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler} className="grid grid-cols-9 gap-4">
            {confirmed_nums.map((item)=>{
                return(
                    <Box 
                        key={item.id}
                        confirmed_num={item.number}
                        id={item.id}
                        setFocused_box={setFocused_box}
                    />
                )
            })}
        </div>
    )
}