import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
lectures : []
}
export const  getCourseLectures= createAsyncThunk("/course/lecture/get",async (cid)=>{
    try{
        const respnse=axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"Fetching course lectues ",
            success:"Lecturesfetched successfully ",
            error:"Failed to load the lecures "
        })
        return (await response).data

    }
    catch(error){
        toast.error(error?.response?.data?.message)

    }
})
// for adding lectures 
export const  addCourseLecture = createAsyncThunk("/course/lecture/add",async (data)=>{
    try{
        const formData= new FormData();
        FormData.append("lecture",data.lecture);
        FormData.append("title",data.title);
        FormData.append("description",data.description);
        
        const respnse=axiosInstance.post(`/courses/${data.id}`,formData);
        toast.promise(response,{
            loading:"Adding course lectues ",
            success:"Lectures Added successfully ",
            error:"Failed to add the lecures "
        })
        return (await response).data

    }
    catch(error){
        toast.error(error?.response?.data?.message)

    }
})
// for delete 
export const  deleteCourseLecture = createAsyncThunk("/course/lecture/delete",async (data)=>{
    try{
     
        
        
        const respnse=axiosInstance.delete(`/courses?courseId=${data.courseId}& lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"Deleting course lectues ",
            success:"Lectures Deleted successfully ",
            error:"Failed to Delete the lecures "
        })
        return (await response).data

    }
    catch(error){
        toast.error(error?.response?.data?.message)

    }
})
const lectureSlice=createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
         console.log(action);
            state.lectures=action?.payload?.lectures;

        })
        builder.addCase(addCourseLecture.fulfilled,(state,action)=>{
           console.log(action);
            state.lectures=action?.payload?.course?.lectures
        })
    }

});
export default lectureSlice.reducer;