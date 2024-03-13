"use client"
import { BoardContext } from "@/contexts/gridContext"
import { useContext } from "react"
import Button from "@/components/Button"

export const NumberButton = ({number}:{number:number}) => {
    const {SetNum} = useContext(BoardContext)
    return (
        <Button onClick={()=>SetNum(number)}>
            {number}
        </Button>
    )
}