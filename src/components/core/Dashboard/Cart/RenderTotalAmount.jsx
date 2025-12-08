import { useSelector } from "react-redux"
import Iconbtn from "../../../common/Iconbtn"

export default function RenderTotalAmount(){
    const {total , cart } = useSelector((state)=>state.cart)

    const handleBuyCourse = () =>{
        const courses = cart.map((course) => course._id)
        console.log("Going to buy the course, BUY COURSE ")
        //TODO : function of payment integration<------------------------------------------
    }

    return (
        <div>
            <div>
                <p>Total:</p>
                <p>₹ {total}</p>
            </div>
            <Iconbtn 
            text={"Buy Now"}
            onclick={handleBuyCourse}
            customClasses="w-full justify-center"
            />

        </div>
    )
}