import { useEffect } from "react";
import{useDispatch,useSelector} from "react-redux"
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";


function CourseList(){
const dispatch=useDispatch()
const {courseData}=useSelector((state)=>state.course);
 async function   loadCourse(){
    await dispatch(getAllCourses());
}

useEffect(()=>{
loadCourse();
},[]);
return (
<HomeLayout>
    <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
   <h1 className="text-xl font-semibold  ">
     <div className="text-center mb-5 ">Explore the Courses made by 
         <span className="font-bold text-yellow-500"> Industry Experts</span></div>
         </h1>
     <div className="mb-10 flex flex-wrap gap-14">
       {courseData?.map((element)=>{
        return <CourseCard key={element._id} data={element}/>
       })}
     </div>

   





    </div>
</HomeLayout>

)
}
export default CourseList;