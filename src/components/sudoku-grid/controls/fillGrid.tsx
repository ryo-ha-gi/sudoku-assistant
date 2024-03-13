"use client"
import { default_grid } from "@/contexts/gridContext"
import { BoardContext,Grid } from "@/contexts/gridContext"
import { useContext } from "react"
import Button from "@/components/Button"
const CLEAR_BOARD = "123456789456789123789123456234567891567891234891234567345678912678912345912345678"

export const ResetButton = () => {
    const {SetGrid} = useContext(BoardContext)
    return (
        <Button onClick={()=>SetGrid(default_grid)}>RESET</Button>
    )
}
export const ClearButton = () => {
    const {SetGrid} = useContext(BoardContext)
    const newGrid:Grid = JSON.parse(JSON.stringify(default_grid))
    CLEAR_BOARD.split("").map((num,index)=>newGrid.grid_state[index].number=Number(num))
    return (
        <Button onClick={()=>SetGrid(newGrid)}>CLEAR</Button>
    )
}