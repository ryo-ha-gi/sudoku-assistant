import { default_grid } from "@/contexts/gridContext"
import { BoardContext } from "@/contexts/gridContext"
import { useContext } from "react"
const CLEAR_BOARD = "123456789456789123789123456234567891567891234891234567345678912678912345912345678"

export const ResetButton = () => {
    const {SetGrid} = useContext(BoardContext)
    return (
        <div onClick={()=>SetGrid(default_grid)}>RESET</div>
    )
}
export const ClearButton = () => {
    return (
        <div>CLEAR</div>
    )
}