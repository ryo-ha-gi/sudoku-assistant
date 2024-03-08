"use client"
import { useState,useEffect } from "react"

function Box({confirmed_num,preliminary_numbers}:{confirmed_num:number;preliminary_numbers?:number[]}){
    return(
        <div tabIndex={0}>
            {confirmed_num?confirmed_num:preliminary_numbers}
        </div>
    )
}

export default function Grid(){
    const [confirmed_nums,setConfirmed_nums] = useState([0])

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.code;
        if(!isNaN(Number(key.slice(-1)))){
            setConfirmed_nums([Number(key.slice(-1))])
        }
    }
    
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler}>
            <table>
                <tbody>
                    ;
                </tbody>
            </table>
        </div>
    )
}