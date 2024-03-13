"use client"
import React, { createContext, useState } from 'react';

export const default_grid:Grid = {
    grid_state:[...Array(9*9)].map((v,ind)=>{return{number:0,id:ind,state:""}}),
    focused_id:-1,
    isCompleted:0
}

export type Grid = {
    grid_state: { number:number; id: number; state: string; }[];
    focused_id: number;
    isCompleted:number;
}

type Board ={ 
    board: Grid;
    SetGrid: (grid:Grid) => void;
    SetNum:(num:number)=>void;
    SetStatus:(status:string[])=>void;
    SetFocusedId:(index:number)=>void;
}
const default_conttext_value:Board = {board:default_grid, SetGrid:(grid)=>{}, SetNum:(num)=>{},SetStatus:(stateus)=>{},SetFocusedId:(index)=>{}}


export const BoardContext = createContext(default_conttext_value);

export const BoardProvider = ({ children }:{children:JSX.Element}) => {
  const [board, setBoard] = useState(default_grid);

  const SetGrid = (grid:Grid) => {
    const newBoard:Grid = JSON.parse(JSON.stringify(grid))
    setBoard(AddState(newBoard))
  }
  const SetNum = (number:number) => {
    if(number<0)return;
    const newBoard:Grid = JSON.parse(JSON.stringify(board))
    newBoard.grid_state[board.focused_id].number=number;
    setBoard(AddState(newBoard))
  }
  const SetStatus = (status:string[]) => {
    const newBoard:Grid = JSON.parse(JSON.stringify(board))
    status.map((stat,index)=>newBoard.grid_state[index].state=stat)
    setBoard(newBoard)
  }
  const SetFocusedId = (index:number) => {
    const newBoard:Grid = JSON.parse(JSON.stringify(board))
    newBoard.focused_id = index
    setBoard(AddState(newBoard))
  }

  const AddState = (grid:Grid) => {
    const newBoard:Grid = JSON.parse(JSON.stringify(grid))
    const doubleds = CheckDoubled(newBoard.grid_state.map((item)=>item.number))
    newBoard.grid_state.map((item)=>{
      if(doubleds?.includes(item.id))newBoard.grid_state[item.id].state="doubled"
      else newBoard.grid_state[item.id].state=""
    })
    if( !doubleds?.length && !newBoard.grid_state.filter((item)=>item.number===0).length )newBoard.isCompleted = 1
    else newBoard.isCompleted = 0
    return newBoard
  }

  function CheckDoubled(confirmed_nums:number[]):number[]|undefined{
    let result:number[]=Array()
    confirmed_nums.map((num,ind,arr)=>{
      if(num===0)return

      //row
      const row = arr.slice(Math.floor(ind/9)*9,(Math.floor(ind/9)+1)*9)
      if(row.filter((val)=>val===num).length>1)return result.push(ind)

      //col
      const col = arr.filter((val,i)=> i%9===ind%9 )
      if(col.filter((val)=>val===num).length>1)return result.push(ind)

      //block
      const block = arr.filter((val,i)=>{
        return Math.floor(i/27)==Math.floor(ind/27)&&Math.floor((i%9)/3)===Math.floor((ind%9)/3)
      })
      if(block.filter((val)=>val===num).length>1)return result.push(ind)
    })
    return result
  }

  return (
    <BoardContext.Provider value={ {board:board,SetGrid:SetGrid,SetNum:SetNum,SetStatus:SetStatus,SetFocusedId:SetFocusedId} }>
      {children}
    </BoardContext.Provider>
  );
};