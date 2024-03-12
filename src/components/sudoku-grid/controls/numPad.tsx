"use client"
import { BoardContext } from "@/contexts/gridContext"
import { useContext } from "react"

export const NumberButton = ({number}:{number:number}) => {
    const {SetNum} = useContext(BoardContext)
    return (
        <div onClick={()=>SetNum(number)}>{number}</div>
    )
}