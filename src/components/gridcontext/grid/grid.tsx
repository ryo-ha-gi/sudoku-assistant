"use client"
import { useState,useEffect } from "react"
import { Dispatch,SetStateAction } from "react";
import { useSearchParams,useRouter } from "next/navigation";

function Box({confirmed_num,preliminary_numbers,id,focused_id,status,setFocused_box}:{confirmed_num:number;preliminary_numbers?:number[];id:number;focused_id:number;status:string;setFocused_box:Dispatch<SetStateAction<number>>;}){
    function boxClickHandler(){
        setFocused_box(id)
    }
    const block_33_x_index = id%3
    const block_33_y_index = Math.floor(id/9) %3
    const outer_box_33block_border_css = (block_33_x_index===0?"border-l-2 ":(block_33_x_index===2?"border-r-2 ":" ")) + (block_33_y_index===0?"border-t-2 ":(block_33_y_index===2?"border-b-2 ":" "))
    const outer_box_neutral_css = "hover:bg-[rgba(255,255,255,0.6)] border-slate-400 "
    const inner_box_not_focused_css = " border-gray-300"
    const inner_box_neutral_css = " border-2 border-solid [aspect-ratio:1;] w-full h-full flex items-center justify-center relative "
    const inner_box_focused_css = " border-rose-500 bg-yellow-300"
    const inner_box_doubled_css = status==="doubled"?" text-red-700 ":" "
    const inner_same_col_or_row = " before:content-[''] before:absolute before:border-slate-300 before:bg-slate-200 before:w-full before:h-full before:z-[-1] "
    const inner_same_col_css = (focused_id===id?" ":(focused_id%9===id%9?(inner_same_col_or_row + " before:border-x-2 "):" "))
    const inner_same_row_css = (focused_id===id?" ":(Math.floor(focused_id/9)===Math.floor(id/9)?(inner_same_col_or_row + " before:border-y-2 "):" "))

    const inner_css = inner_box_neutral_css + inner_same_col_css + inner_same_row_css + (id===focused_id?inner_box_focused_css:inner_box_not_focused_css) + inner_box_doubled_css

    return(
        <div onClick={boxClickHandler} className={outer_box_neutral_css+outer_box_33block_border_css}>
            <div className={inner_css}>
                {confirmed_num?confirmed_num:preliminary_numbers}
            </div>
        </div>
    )
}


export default function Grid(){

    const searchParams = useSearchParams()
    const param_state = searchParams.get("state")
    let confirmed_nums = (param_state?param_state:"" + Array(9*9+1).join('0')).slice(0,9*9)
    const router = useRouter()
    

    // const [confirmed_nums,setConfirmed_nums] = useState(Array.from(Array(9*9).keys()).map((n)=>{return{number:0,id:n}}))
    const [box_status,setBox_status] = useState(Array(9*9).map(()=>""))
    const [focused_box,setFocused_box] = useState(-1)

    const setConfirmed_nums = (nums:string,index:number,num:string) => {
        const regex = new RegExp(`(?<=^.{${index}}).`)
        confirmed_nums = nums.replace(regex,num)
        router.prefetch("?state="+confirmed_nums)
        router.push("?state="+confirmed_nums,{scroll:false})
    }

    useEffect(()=>{
        const doubleds = CheckDoubled(confirmed_nums.split("").map((char)=>Number(char)))
        let new_status = Array(9*9).map(()=>"")
        doubleds?.map((val)=>{
            new_status.splice(val,1,"doubled")
        })
        setBox_status(new_status)
        if(!doubleds?.length&&!confirmed_nums.split("").filter((char)=>Number(char)===0).length)setTimeout(Congrats,0.5)
    },[confirmed_nums])

    function Congrats(){
        alert("Congraturations! おめでとう！")
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

    const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const pushed_key = e.code;
        if(focused_box===-1)setFocused_box(0)

        if(!isNaN(Number(pushed_key.slice(-1)))){
            setConfirmed_nums(confirmed_nums,focused_box,pushed_key.slice(-1))
        }else if( pushed_key.startsWith("Arrow")){
            switch (pushed_key.slice(-2)){
                case "Up":
                    if(focused_box>=9)setFocused_box(focused_box-9)
                    break;
                case "ht":
                    if(focused_box%9<8)setFocused_box(focused_box+1)
                    break;
                case "wn":
                    if(focused_box<=72)setFocused_box(focused_box+9)
                    break;
                case "ft":
                    if(focused_box%9>0)setFocused_box(focused_box-1)
                default:
                    console.log(pushed_key.slice(-2))
                    break;
            }
        }else{
            // console.log(pushed_key)
            switch (pushed_key){
                case "Backspace":
                case "Delete":
                    setConfirmed_nums(confirmed_nums,focused_box,'0')
                default:
                    break;
            }
        }
    }
    
    return (
        <div tabIndex={0} onKeyDown={keyDownHandler} className="grid grid-cols-9 gap-0 w-[90%] [aspect-ratio:1;]">
            {confirmed_nums.split("").map((char,ind)=>{
                return(
                    <Box 
                        key={ind}
                        confirmed_num={Number(char)}
                        id={ind}
                        focused_id={focused_box}
                        status={box_status[ind]}
                        setFocused_box={setFocused_box}
                    />
                )
            })}
        </div>
    )
}