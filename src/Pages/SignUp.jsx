import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
 import { toast} from 'react-hot-toast'
// import { toast } from 'react-toastify';

import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, validPassword } from "../Helpers/regexMatch";

function SignUp(){

const dispatch=useDispatch();
const navigate= useNavigate();

const[previewImage,setImage]=useState("");
const[signupData,setSignupData]=useState({
    fullName:"",
    email:"",  
    password:"",
    avatar:""
});
const [isChecked, setIsChecked] = useState(false);
const [checkboxError, setCheckboxError] = useState(false);

  function handleUserInput(e){
    const {name,value}=e.target;
    setSignupData({
        ...signupData,
        [name]:value
        
    })
     
  }
  function getImage(event){
    event.preventDefault();
    // getting the image
    const uploadImage=event.target.files[0];
    if(uploadImage){
setSignupData({
    ...signupData,
    avatar: uploadImage
});
const fileReader=new FileReader();
fileReader.readAsDataURL(uploadImage);
fileReader.addEventListener("load",function(){
    console.log("result is ",this.result)
    setImage(this.result)

})
    }

    
  }
   async function createNewAccount(event){
         event.preventDefault();
         if(!signupData.fullName||!signupData.email||!signupData.password ){
                toast.error("Please fill all the  details ")   
                              return ;
   }
  

         // checking name fill length
         if(signupData.fullName.length<5){
            hotToast.error("Name  must be atleast of 5 charaters")
            return 
         }
         // checking valid email :regex is used
         if( ! isEmail(signupData.email)){
            toast.error("Invalid email id ");
            return 

         }
         // checking for valid password : gfg

         if( !validPassword(signupData.password)){
            toast.error("Password  used  must be valid ");
            return 
         }
         if (!isChecked) {
            setCheckboxError(true);
            return;
          }

         const formData=new FormData();
         formData.append("fullName",signupData.fullName);
         formData.append("email",signupData.email);
         formData.append("password",signupData.password);
         formData.append("avatar",signupData.avatar);
         // dispatch
         const response= await dispatch(createAccount(formData))
         console.log("response is ",response);  
         if(response?.payload?.success)
             // then  to home page 
             navigate("/")    
                
         setSignupData({
            fullName:"",
           email:"",  
           password:"",
             avatar:""
           }) 
           setImage("");
           setCheckboxError(false)
  }


  

 
return (
<HomeLayout>
{/* <div className="flex  justify-center items-center"> */}
{/* <img src="https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" /> */}


<div className=" flex items-center justify-center h-[100vh] ">
<form  noValidate  onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
<h1 className="text-center text-2xl font-bold "> Registration Page </h1>
<label htmlFor="image_uploads" className="cursor-pointer">
{previewImage?(
    <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
) :(
    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
)}
</label>
<input 
onChange={getImage}
className="hidden"  // so that only by clicking file is uploaded 
type="file"
id="image_uploads"
accept=".jpg,.jpeg,.png,.spg"
name="image_uploads"
/>
<div className="flex flex-col gap-1">
    <label htmlFor="fullName" className="font-semibold">Name</label>
    <input type="name" required  name="fullName"  id="email" placeholder="Enter your Name...."
    className="bg-transparent px-2 py-1 border" onChange={handleUserInput}
    
    value={signupData.fullName}
     
    />
    </div>

<div className="flex flex-col gap-1">
    <label htmlFor="email" className="font-semibold">Email</label>
    <input type="email" required  name="email" id="email" placeholder="Enter your email...."
    className="bg-transparent px-2 py-1 border" onChange={handleUserInput}
    value={signupData.email}
     
    />
    </div>
     <div>
     <label htmlFor="paasword" className="font-semibold ">Password</label>
     <br />
    <input type="password" required  name="password" id="password" placeholder="Enter your password...."
    className="bg-transparent px-2 py-1 border"
    onChange={handleUserInput}
    value={signupData.password}
    />

</div>
<button  disabled={!isChecked} type="submit"className=" mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-bold text-lg cursor-pointer" >Create Account</button>
<p className="text-center ">
<input type="checkbox" checked={isChecked} onChange={()=>{ setIsChecked(!isChecked)}}  /> I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>  
    
      {checkboxError && (
            <p className="text-red-500">
              Please agree to the terms and conditions
            </p>
          )}
     <br />
    Already Have an account ? <Link to="/login"  className="link text-accent cursor-pointer  "> Login</Link>
    
</p>
</form>
</div>
{/* </div> */}



</HomeLayout>


      
)
      }

export  default SignUp;