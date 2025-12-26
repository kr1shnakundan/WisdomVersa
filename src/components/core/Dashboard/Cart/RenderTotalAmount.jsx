import { useDispatch, useSelector } from "react-redux";
import Iconbtn from "../../../common/Iconbtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const {user} = useSelector((state)=>state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Proceeding to buy:", courses);
    buyCourse(token,courses,user,navigate,dispatch)
  };

  return (
    <div className="sticky top-20 rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      
      <p className="text-sm text-richblack-400">Total Amount</p>

      <p className="my-2 text-3xl font-semibold text-yellow-100">
        ₹ {total}
      </p>

      <p className="mb-6 text-sm text-richblack-400">
        Including all taxes
      </p>

      <Iconbtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
      />
    </div>
  );
}
