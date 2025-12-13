import { useSelector } from "react-redux";

export default function Instructor(){
    const {token} = useSelector((state)=>state.auth)
    
}