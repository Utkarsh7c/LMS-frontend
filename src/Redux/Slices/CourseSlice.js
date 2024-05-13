import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    courseData:[]
}

export const getAllCourses= createAsyncThunk("/course/get",async ()=>{
    try{
const response= axiosInstance.get("/course");
toast.promise(response,{
    loading:"Loading course Data....",
    success:"Courses loaded Successfully",   // default printing
    error:"Failed to get the course",
});
return (await response).data.courses;
    }
    catch(error){
        toast.error(error?.response?.data?.message)
    }
})
export const createNewCourse= createAsyncThunk("/course/create",async (data)=>{
    try{
let formData=new  FormData();
formData.append("title",data?.title);
formData.append("description",data?.description);
formData.append("createdBy",data?.createdBy);
formData.append("category",data?.category);
formData.append("thumbnail",data?.thumbnail);
const response=axiosInstance.post("/course",formData);
toast.promise(response,{
    loading:"creating new Course",
    success:"Course successfully Created",
    error:"Failed to Create Course "
})
return (await response).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const courseSlice= createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // add cases 
        builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                //console.log("result is ",action.payload)
                state.courseData=[...action.payload];
            }
        })
    }

})
export default courseSlice.reducer;
