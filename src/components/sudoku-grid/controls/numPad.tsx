"use client"
import { BoardContext } from "@/contexts/gridContext"
import { useContext } from "react"
import Button from "@/components/Button"

export const NumberButton = ({number}:{number:number}) => {
    const {SetNum} = useContext(BoardContext)
    return (
        <Button onClick={()=>SetNum(number)}>
            {number?number:"delete"}
        </Button>
    )
}

export const NumPad = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-2">
            {[...Array(10)].map((num,index)=><NumberButton key={index} number={Number((index+1).toString().slice(-1))}/>)}
        </div>
    )
}