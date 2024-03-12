"use client"
import React, { createContext, useState } from 'react';

export const default_grid:Grid = {
    grid_state:[...Array(9*9)].map((v,ind)=>{return{number:0,id:ind,state:""}}),
    focused_id:-1
}

type Grid = {
    grid_state: { number:number; id: number; state: string; }[];
    focused_id: number;
}

type Board ={ 
    board: Grid;
    SetGrid: (grid:Grid) => void;
    SetNum:(index:number,num:number)=>void;
    SetStatus:(status:string[])=>void;
    SetFocusedId:(index:number)=>void;
}
const default_conttext_value:Board = {board:default_grid, SetGrid:(grid)=>{}, SetNum:(ind,num)=>{},SetStatus:(stateus)=>{},SetFocusedId:(index)=>{}}


export const BoardContext = createContext(default_conttext_value);

export const BoardProvider = ({ children }:{children:JSX.Element}) => {
  const [board, setBoard] = useState(default_grid);

  const SetGrid = (grid:Grid) => {
    setBoard(grid)
  }
  const SetNum = (index:number,number:number) => {
    const newBoard = {...board}
    newBoard.grid_state[index].number=number;
    setBoard(newBoard)
  }
  const SetStatus = (status:string[]) => {
    const newBoard = {...board};
    status.map((stat,index)=>newBoard.grid_state[index].state=stat)
    setBoard(newBoard)
  }
  const SetFocusedId = (index:number) => {
    const newBoard = {...board}
    newBoard.focused_id = index
    setBoard(newBoard)
  }

  return (
    <BoardContext.Provider value={ {board:board,SetGrid:SetGrid,SetNum:SetNum,SetStatus:SetStatus,SetFocusedId:SetFocusedId} }>
      {children}
    </BoardContext.Provider>
  );
};