import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import { BiRupee } from "react-icons/bi";

import HomeLayout from "../../Layouts/HomeLayout";

function Checkout(){
const dispatch=useDispatch();
const navigate=useNavigate();
const razorpayKey=useSelector((state)=>state?.razorpay?.Key);
const subscritption_id=useSelector((state)=> state?.razorpay?.subscritption_id);
const userData=useSelector((state)=> state?.auth?.data);
const isPaymentVerified=useSelector((state)=> state?.razorpay?.isPaymentVerified);
const paymentDetails={
    razorpay_payment_id:"",
    razorpay_Subcription_id:"",
    razorpay_signature:"",
}
async function handleSubscription(e){
    e.preventDefault();
    if(!razorpayKey||!subscritption_id){
        toast.error("Something went wrong ");
        return ;

    }
    const options={
        key:razorpayKey,
        subscritption_id:subscritption_id,
        name:"Coursify Pvt .ltd.",
        description:"Subscription",
        theme:{
            color:'#F37254'
        },
        prefill:{
            email:userData.email,
            name:userData.name
        },
        handler:async function (response){
            paymentDetails.razorpay_payment_id=response.razorpay_payment_id;
            paymentDetails.razorpay_signature=response.razorpay_signature;
            paymentDetails.razorpay_Subcription_id=response.razorpay_Subcription_id;
            toast.success("payment successful");
            await dispatch(verifyUserPayment(paymentDetails));
!isPaymentVerified? navigate("/checkout/success"):navigate("/checkout/fail")
        }
    }
    const paymentObject=new window.Razorpay(options);
    paymentObject.open();

}
async function load(){
await dispatch(getRazorPayId());
await dispatch(purchaseCourseBundle());

}

useEffect(()=>{
load();
},[]);
return (
    <HomeLayout>
<form action="" onSubmit={handleSubscription} className="min-h-[90vh] flex items-center justify-center text-white ">
<div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative"><h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg ">Subscription Bundle </h1>
<div className="px-4 space-y-5 text-center ">
    <p className="text-[17px]"> This purchase will allow you to access all available course  of our platform for {" "}
    <span className="text-yellow-500 font-bold">
        <br />
        1 Year Duration
        </span>
        All  the Existing  and new launched courses will be also available
        
        </p>
        <p className="flex items-center gap-1 justify-center font-bold  text-2xl text-yelllow-500 "><BiRupee/> <span>999</span> ONLY </p>
         <div className=" text-gray-200">
            <p> 100% refundon cancellation </p>
            <span> * Terms and Conditions applied * </span>
         </div>
         <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out  duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2 "> By Now </button>
</div>
</div>
</form>
    </HomeLayout>
)

}
export default Checkout;