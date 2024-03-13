"use client"
import { useState } from "react"
import { useContext } from "react";
import { BoardContext } from "@/contexts/gridContext";

function Box({confirmed_num,possible_numbers,id,focused_id,status,setFocused_box}:{confirmed_num:number;possible_numbers?:number[];id:number;focused_id:number;status:string;setFocused_box: (index: number) => void;}){
    function boxClickHandler(){
        setFocused_box(id)
    }
    const block_33_x_index = id%3
    const block_33_y_index = Math.floor(id/9) %3
    const outer_box_33block_border_css = (block_33_x_index===0?"border-l-2 ":(block_33_x_index===2?"border-r-2 ":" ")) + (block_33_y_index===0?"border-t-2 ":(block_33_y_index===2?"border-b-2 ":" "))
    const outer_box_neutral_css = "hover:bg-white bg-opacity-0.9 border-slate-400 "
    const inner_box_not_focused_css = " border-gray-300"
    const inner_box_neutral_css = " border-2 border-solid [aspect-ratio:1;] w-full h-full text-4xl font-bold flex items-center justify-center relative "
    const inner_box_focused_css = " border-rose-500 bg-yellow-300"
    const inner_box_doubled_css = status==="doubled"?" text-red-700 ":" "
    const inner_same_col_or_row = " before:content-[''] before:absolute before:border-slate-300 before:bg-slate-200 before:dark:bg-slate-400 before:bg-opacity-0.2 before:w-full before:h-full before:z-[-1] "
    const inner_same_col_css = (focused_id===id?" ":(focused_id%9===id%9?(inner_same_col_or_row + " before:border-x-2 "):" "))
    const inner_same_row_css = (focused_id===id?" ":(Math.floor(focused_id/9)===Math.floor(id/9)?(inner_same_col_or_row + " before:border-y-2 "):" "))

    const inner_css = inner_box_neutral_css + inner_same_col_css + inner_same_row_css + (id===focused_id?inner_box_focused_css:inner_box_not_focused_css) + inner_box_doubled_css

    const inner_grid = ({numbers}:{numbers:number[]}) => {
        return (
            <div className="grid grid-cols-3 w-full">{
                [1,2,3,4,5,6,7,8,9].map((val,ind)=>{
                    return <div key={ind} className="text-gray-500 text-sm font-normal flex justify-center [aspect-ratio:1]">{numbers.includes(val)?val:""}</div>
                })
            }</div>
            
        )

    }

    return(
        <div onClick={boxClickHandler} className={outer_box_neutral_css+outer_box_33block_border_css}>
            <div className={inner_css}>
                {confirmed_num?confirmed_num:inner_grid({numbers:possible_numbers?possible_numbers:[]})}
            </div>
        </div>
    )
}


export default function Grid(){

    const {board,SetNum,SetFocusedId} = useContext(BoardContext)
    const [isCelebrated,setIsCelebrated] = useState(0)

    const confirmed_nums = board.grid_state.map((item)=>item.number)
    const box_status = board.grid_state.map((item)=>item.state)
    const focused_box = board.focused_id

    const setConfirmed_nums = (num:number) => {
        SetNum(num)
    }
    if(board.isCompleted==0&&isCelebrated)setIsCelebrated(0)
    if(board.isCompleted&&!isCelebrated){
        setTimeout(()=>{alert("Congraturations! おめでとう")},0.5)
        setIsCelebrated(1)
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const pushed_key = e.code;
        if(focused_box===-1)SetFocusedId(0)

        if(!isNaN(Number(pushed_key.slice(-1)))){
            setConfirmed_nums(Number(pushed_key.slice(-1)))
        }else if( pushed_key.startsWith("Arrow")){
            switch (pushed_key.slice(-2)){
                case "Up":
                    if(focused_box>=9)SetFocusedId(focused_box-9)
                    break;
                case "ht":
                    if(focused_box%9<8)SetFocusedId(focused_box+1)
                    break;
                case "wn":
                    if(focused_box<72)SetFocusedId(focused_box+9)
                    break;
                case "ft":
                    if(focused_box%9>0)SetFocusedId(focused_box-1)
                    break;
                default:
                    console.log(pushed_key.slice(-2))
                    break;
            }
        }else{
            // console.log(pushed_key)
            switch (pushed_key){
                case "Backspace":
                case "Delete":
                    setConfirmed_nums(0)
                default:
                    break;
            }
        }
    }
    
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler} className="grid grid-cols-9 gap-0 w-[90%] [aspect-ratio:1;]">
            {confirmed_nums.map((val,ind)=>{
                return(
                    <Box 
                        key={ind}
                        confirmed_num={Number(val)}
                        id={ind}
                        focused_id={focused_box}
                        status={box_status[ind]}
                        possible_numbers={board.grid_state[ind].possible_numbers}
                        setFocused_box={SetFocusedId}
                    />
                )
            })}
        </div>
    )
}