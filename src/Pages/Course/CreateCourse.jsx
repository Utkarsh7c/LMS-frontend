import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){
const dispatch=useDispatch()
const navigate=useNavigate();
const [userInput,setUserInput]=useState({
    title:"",
    category:"",
    createdBy:"",
    description:"",
    thumbnail:null,
    previewImage:"",
})
 function  handleImageUpload(e){
    e.preventDefault();
 const uploadedImage=e.target.files[0];
 if(uploadedImage){
    const fileReader=new FileReader();
    fileReader.readAsDataURL(uploadedImage)
fileReader.addEventListener("load",function(){
    setUserInput({
        ...userInput,
        previewImage:this.result,
        thumbnail:uploadedImage

    })
}) 
}    

}
function handleUserInput(e){
    const {name,value}=e.target;
    setUserInput({
        ...userInput,
        [name]:value,
    })
}
function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.title||!userInput.description||!userInput.category||!userInput.thumbnail||!userInput.createdBy){
         toast.error("All fields are mandatory"); 
        return ;
    }
    const response= dispatch(createNewCourse(userInput));
    // console.log("res is",response)
     if(response?.payload?.success){
        setUserInput({
    
    title:"",
    category:"",
    createdBy:"",
    description:"",
    thumbnail:null,
    previewImage:"",
        })
        navigate("/courses");
    }
   

}


    return (
     <HomeLayout>
<div className="flex flex-col  items-center justify-center h-[100vh]"> 
           <form noValidate onSubmit={onFormSubmit} 
         className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white  w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
            <Link className="absolute top-8 text-2xl link text-accent cursor-pointer ">
              <AiOutlineArrowLeft/>
            </Link>
            <h1 className="text-center text-2xl font-bold "> Create New Course</h1>
<main className="grid grid-cols-2 gap-x-10">
<div className="gap-y-6 ">
    <div >
        <label htmlFor="image_uploads" className="cursor-pointer">
            {userInput.previewImage? (
                 <img src={userInput.previewImage}  
                  className="w-full h-44 m-auto border"
                 />
            ):(
              <div className="w-full h-44  m-auto flex items-center justify-center border">
                <h1 className="   font-bold text-lg  ">Upload your Course thumbnail</h1>
              
              </div>
            )}
        </label>
        <input type="file"
          className="hidden"
          id="image_uploads"
          accept=".jpg,.jpeg,.png"
          name="image_uploads"
          onChange={handleImageUpload}
        />
    </div>
    <div className="flex flex-col gap-1 ">
        <label htmlFor="title"className="font-semibold text-lg ">Course Title</label>
        <input type="text" name="title" id="title" placeholder="Enter your title " className="bg-transparent    px-2 py-1 border" value={userInput.title} onChange={handleUserInput} />
       
    </div>
</div>
<div className="flex flex-col gap-1 ">
<div className="flex flex-col gap-1 ">
        <label htmlFor="createdBy"className="font-semibold text-lg ">Course Instructor</label>
        <input type="text" name="createdBy" id="createdBy" placeholder="Enter your Instructor " className="bg-transparent  px-2 py-1 border" value={userInput.createdBy}  onChange={handleUserInput}/>
    
    </div>
    <div className="flex flex-col gap-1 ">
        <label htmlFor="category"className="font-semibold text-lg ">Category</label>
        <input type="text" name="category" id="category" placeholder="Enter your Category " className="bg-transparent  px-2 py-1 border" value={userInput.category} onChange={handleUserInput}/>
    
    </div>
    <div className="flex flex-col gap-1 ">
        <label htmlFor="description"className="font-semibold text-lg ">Course Description</label>
        <textarea  required type="text" name="description" id="description" placeholder="Enter your Course Description " className="bg-transparent  px-2 py-1 h-24 overflow-y-scroll resize-none  border" value={userInput.description}  onChange={handleUserInput}/>
    
    </div>
    

</div>
</main>
<button type="submit " className="w-full py-2  rounded-sm font-smeibold text-lg  cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out 
 duration-300 ">Create Course </button> 



        </form>
        </div>

     </HomeLayout>
    
    

)
}
export default CreateCourse;