import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import toast from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API,GET_RAZORPAY_KEY_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading(
      <div className='flex items-center justify-center gap-1'>
          <p>Loading...</p>
      </div>
    )
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }


        let razorpayKey = localStorage.getItem('razorpayKey');
        if (!razorpayKey) {
            const keyResponse = await apiConnector("GET", GET_RAZORPAY_KEY_API);
            if (!keyResponse.data.success) {
                throw new Error("Could not fetch payment configuration");
            }
            razorpayKey = keyResponse.data.key;
            localStorage.setItem('razorpayKey', razorpayKey);
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        console.log("orderResponse me data.data me kya hai..:",orderResponse?.data?.data)
        console.log("key is :........",process.env.RAZORPAY_KEY)
        //options
        const options = {
            key:razorpayKey,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "WisdomVersa",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // Send successful payment email
                sendPaymentSuccessEmail(
                    response,
                    orderResponse.data.data.amount,
                    token
                );
                
                // Verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        }

        const paymentObject = new window.Razorpay(options);
        
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed");
            console.log("Payment Failed Response:", response.error);
        });
    } catch(error){
        console.log("Error in buy course api......:",error)
        toast.error(error?.response?.data?.message || "Unable to buy course , Please try again")
    }
    toast.dismiss(toastId )
}


async function verifyPayment(bodyData , token ,navigate , dispatch){
    const toastId = toast.loading(
        <div className='flex items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
    dispatch(setPaymentLoading(true))
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API ,bodyData,{
            Authorization: `Bearer${token}`
        })

        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        toast.success("Payment Successful! You are enrolled in the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch(error){
        console.log("ERROR in verifyPayment....:",error)
        toast.error(error?.response?.data?.message || "Unable to verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}


async function sendPaymentSuccessEmail(response , amount , token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API ,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },{
                Authorization:`Bearer${token}`
            }
        )
    } catch(error){
        console.log("Error in sendPaymentSuccessEmailAPI..:",error)
    }
}


