import Link from "next/link"

const CLEAR_BOARD = "123456789456789123789123456234567891567891234891234567345678912678912345912345678"
const RESET_BOARD = "000000000000000000000000000000000000000000000000000000000000000000000000000000000"

export const ResetButton = () => {
    return (
        <Link href={"?state="+RESET_BOARD} scroll={false}>RESET</Link>
    )
}
export const ClearButton = () => {
    return (
        <Link href={"?state="+CLEAR_BOARD} scroll={false}>RESET</Link>
    )
}