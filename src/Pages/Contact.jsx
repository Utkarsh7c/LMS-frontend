import { useId, useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail, validPassword } from "../Helpers/regexMatch";
import axiosInstance from "../Helpers/axiosInstance";

function Contact(){
const[userInput,setUserInput]=useState({
    name:"",
    email:"",
    message:"",

});
 function  handleInputChange(e){
    const{name,value}=e.target;
    console.log(name,value);
    setUserInput({
        ...userInput,
        [name]:  value

 })
 }
 async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.email || !userInput.name||! userInput.message){
        toast.error("All fields are mandatory");
        return ;
    }
    if(!isEmail(userInput.email)){
        return toast.error("Invalid email ");
    }
    try{
const res=  axiosInstance.post("/contact",userInput);
toast.promise({
    loading:"Submitting your message ",
    success:"form submitted",
    error:"failed to submit the form"
});
const contactResponse=await res;
if(contactResponse?.data?.success){
    setUserInput({
        name:"",
        email:"",
        message:"",
    })
}

    }
    catch(error){
        toast.error("process failed....")
    }
 }

return(
    <HomeLayout>
     <div className="flex items-center justify-center  h-[100vh]">
    <form  noValidate  
    onSubmit={onFormSubmit}
     className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_white] w-[22rem]  ">
     <h1 className="text-3xl font-semibold"> Contact Form </h1>
     <div className="flex flex-col w-full gap-1"> 
      <label htmlFor="name " className="text-lg font-semibold ">Name</label>
      <input type="text"className="bg-transparent border  px-2 py-1 rounded-sm" name="name" id="name"
       placeholder="Enter your name...."  onChange={handleInputChange} value={userInput.name}
      />
       
      </div>
      <div className="flex flex-col w-full gap-1"> 
      <label htmlFor="name " className="text-lg font-semibold ">Email</label>
      <input type="email"className="bg-transparent border  px-2 py-1 rounded-sm" name="email" id="email"
       placeholder="Enter your email...." onChange={handleInputChange} value={userInput.email}
      />
      </div>
       <div className="flex flex-col w-full gap-1"> 
      <label htmlFor="name " className="text-lg font-semibold ">Message</label>
      < textarea  type="text"className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40" name="message" id="message"
       placeholder="Enter your Message...." onChange ={handleInputChange} value={userInput.message}
      />
      
      </div>
      <button  type="Submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">Submit</button>

      
      
     </form>
     </div>



</HomeLayout>
)

}
export default Contact;