"use client"
import { useState } from "react"
import { useContext } from "react";
import { BoardContext } from "@/contexts/gridContext";

function Box({confirmed_num,possible_numbers,id,focused_id,focused_num,status,isLocked,isUnique,hasTwins,setFocused_box}:{confirmed_num:number;possible_numbers?:number[];id:number;focused_id:number;focused_num:number;status:string;isLocked:boolean;isUnique:string;hasTwins:string[];setFocused_box: (index: number) => void;}){
    function boxClickHandler(){
        setFocused_box(id)
    }

    // frame
    const block_33_x_index = id%3
    const block_33_y_index = Math.floor(id/9) %3
    const outer_box_33block_border_css = (block_33_x_index===0?"border-l-2 ":(block_33_x_index===2?"border-r-2 ":" ")) + (block_33_y_index===0?"border-t-2 ":(block_33_y_index===2?"border-b-2 ":" "))
    const outer_box_neutral_css = "hover:bg-white hover:bg-opacity-90 border-slate-400 [aspect-ratio:1;] "
    // locked
    const locked_css = " hover:bg-slate-400 bg-slate-600 bg-opacity-80 border-slate-400 "

    // focus
    const same_col_or_row = " border-slate-300 bg-slate-200 dark:bg-slate-400 bg-opacity-20 w-full h-full "
    const same_col_css = (focused_id===id?" ":(focused_id%9===id%9?(same_col_or_row + " border-x-2 "):" border-x-2 "))
    const same_row_css = (focused_id===id?" ":(Math.floor(focused_id/9)===Math.floor(id/9)?(same_col_or_row + " border-y-2 "):" border-y-2 "))
    const focused_css = focused_id===id? " border-2 border-rose-500 bg-yellow-100 bg-opacity-100 ":" "
    // others
    const same_num_css = focused_num===confirmed_num&&confirmed_num!==0? " bg-yellow-200 dark:bg-yellow-400 bg-opacity-70 w-full h-full ":""
    const doubled_css = status==="doubled"?" text-red-700 ":""
    const confirmed_css = confirmed_num?" font-bold text-xl flex justify-center items-center ":""

    function inner_grid_css(num:number){
        const inner_grid_neutral_css = "text-sm font-normal flex justify-center w-full h-full [aspect-ratio:1] "
        const inner_grid_unique_css = " text-red-400 "
        const inner_grid_twins_css = " text-blue-400 "
        const inner_grid_the_other_css = " text-gray-500 "
        return inner_grid_neutral_css + (isUnique.slice(-1)===String(num)?inner_grid_unique_css:(hasTwins.filter((val)=>val.slice(-1)===String(num)).length?inner_grid_twins_css:(possible_numbers?.includes(num)?inner_grid_the_other_css:"")))
    }

    const inner_grid = ({numbers}:{numbers:number[]}) => {
        return (
            <div className="grid grid-cols-3 w-full h-full ">{
                [1,2,3,4,5,6,7,8,9].map((val,ind)=>{
                    return <div key={ind} className={inner_grid_css(val)}>{numbers.includes(val)?val:""}</div>
                })
            }</div>
            
        )

    }

    return(
        <div onClick={boxClickHandler} className={outer_box_neutral_css+outer_box_33block_border_css}>
            <div className="border-2 border-solid border-gray-300 w-full h-full">
                <div className={"w-full h-full "+ (isLocked?locked_css:"")}>
                    <div className={same_col_css+same_row_css+focused_css +" h-full w-full"}>
                        <div className={same_num_css+doubled_css+confirmed_css + "h-full w-full"}>
                            {confirmed_num?confirmed_num:inner_grid({numbers:possible_numbers?possible_numbers:[]})}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export default function Grid(){

    const {board,SetNum,SetFocusedId} = useContext(BoardContext)
    const [isCelebrated,setIsCelebrated] = useState(false)

    const confirmed_nums = board.grid_state.map((item)=>item.number)
    const box_status = board.grid_state.map((item)=>item.state)
    const focused_box = board.focused_id

    const setConfirmed_nums = (num:number) => {
        SetNum(num)
    }
    if(board.isCompleted==false&&isCelebrated)setIsCelebrated(false)
    if(board.isCompleted&&!isCelebrated){
        setTimeout(()=>{alert("Congraturations! おめでとう")},0.5)
        setIsCelebrated(true)
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
        <div tabIndex={0} onKeyDown={keyDownHandler} className="grid grid-cols-9 gap-0 w-[90%] ">
            {confirmed_nums.map((val,ind)=>{
                return(
                    <Box 
                        key={ind}
                        confirmed_num={Number(val)}
                        id={ind}
                        focused_id={focused_box}
                        focused_num={focused_box!==-1?board.grid_state[focused_box].number:-1}
                        status={box_status[ind]}
                        isLocked={board.isLocked[ind]}
                        possible_numbers={board.grid_state[ind].possible_numbers}
                        isUnique={board.grid_state[ind].isUnique}
                        hasTwins={board.grid_state[ind].hasTwins}
                        setFocused_box={SetFocusedId}
                    />
                )
            })}
        </div>
    )
}