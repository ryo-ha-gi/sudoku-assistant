"use client"
import { default_grid } from "@/contexts/gridContext"
import { BoardContext } from "@/contexts/gridContext"
import { useContext } from "react"
import Button from "@/components/Button"

export const LockButton = () => {
    const {board,SetLock} = useContext(BoardContext)
    const locked = board.grid_state.map((item)=>item.number!==0)
    return (
        <Button onClick={()=>SetLock(locked)}>LOCK</Button>
    )
}

export const UnlockButton = () => {
    const {SetLock} = useContext(BoardContext)
    return (
        <Button onClick={()=>SetLock(structuredClone(default_grid.isLocked))}>UNLOCK</Button>
    )
}