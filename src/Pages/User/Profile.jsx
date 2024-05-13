import { useEffect } from "react";
import {  useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
function Profile(){
 const navigate=useNavigate();
const userData=useSelector((state)=>state?.auth?.data);
// const dispatch=useDispatch();
 async function   handleCancellation(){
  toast("Initiating Cancellation");
    await  dispatch(cancelCourseBundle);
    await getUserData();
    toast.success("Cancellation Completed")
    navigate("/");
}

return (
<HomeLayout>

 <div className="min-h-[90vh] flex items-center justify-center">
 <div className="my-10 flex flex-col  gap-4 rounded-lg p-4 text-white w-50 shadow-[0_0_10px_black]">
 <Link to="/" className="link text-accent cursor-pointer "><div><AiOutlineArrowLeft/></div></Link>
<img src={userData?.avatar?.secure_url}
className="w-40 m-auto rounded-full  border border-black"
alt="Image_Uploads"

/>
<h3 className="text-xl font-semibold text-center capitalize">{userData?.fullName}</h3>
<div className=" grid grid-cols-2  gap-2   ">
    <p> Email :   {userData?.email}  </p>
    <br />
     <p>Role:     {userData?.role}  </p>
     <br />
     <p>Subscription: {userData?.subscription?.status==="active"?"Action":"Inactive"}  </p>
     </div>
<div className="flex items-center justify-center gap-2 ">
<Link 
to="/changepassword" 
className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer  text-center">
    <button> Change Password </button>
    
</Link>  
<Link 
to="/user/editprofile" 
className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer  text-center">
    <button> Edit Profile </button>
    
</Link>
 </div>
 {userData?.subscription?.status === "active" && (
     <button onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300"> 
        Cancel Subscription
    </button>
 )}

 
 </div>

 </div>

</HomeLayout>

)
}
export default Profile;
