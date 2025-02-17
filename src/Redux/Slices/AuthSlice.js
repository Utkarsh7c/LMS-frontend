import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance"
 import { toast } from "react-hot-toast";

 
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')||false,
    role:localStorage.getItem('role')||"",
    data:   localStorage.getItem('data') || {}

}

// for singIn
 export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
    try{
const res=axiosInstance.post("user/register",data);
toast.promise(res,{
    loading:"Wait! Creating your Account",
    success:(data)=>{
        return data?.data?.message
    },
    error:"Failed to Create Account",
})
return  (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message)
    }

 })
  // for Login
 export const login = createAsyncThunk("/auth/login",async(data)=>{
    try{
const res=axiosInstance.post("user/login",data);
toast.promise(res,{
    loading:"Wait! authentication is on process",
    success:(data)=>{
        return data?.data?.message
    },
    error:"Failed to  LoggedIn",
})
return  (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message)
    }

 })
 // logout 
 export const logout = createAsyncThunk("/auth/logout",async()=>{
    try{
const res=axiosInstance.get("user/logout");
toast.promise(res,{
    loading:"Wait! Logout is in progress....",
    success:(data)=>{
        return data?.data?.message
        
    },
    error:"Failed to  LoggedOut",
})
return  (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message)
       
    } 

 })
 export const updateProfile = createAsyncThunk("/user/update/profile",async(data)=>{
    try{
const res=axiosInstance.put(`user/update/${data[0]}`,data[1]);
toast.promise(res,{
    loading:"Wait! Profile Update is in progress....",
    success:(data)=>{
        return data?.data?.message
        
    },
    error:"Failed to  Update Profile",
})
return  (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message)
       
    } 

 })

 export const getUserData = createAsyncThunk("/user/details",async()=>{
    try{
const res=axiosInstance.get("user/me");
return  (await res).data;
    }catch(error){
        toast.error(error.message)
       
    } 

 })


 
 
const authSlice=createSlice({
    name:'auth',
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn=true;
             state.data=action?.payload?.user;
             state.role=action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            //  should update state once everu time 
            state.data={};
            state.isLoggedIn=false;;
            state.role="";
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn=true;
             state.data=action?.payload?.user;
             state.role=action?.payload?.user?.role;
        
        });
     }

})
// export const {} =authSlice.actions;
export default authSlice.reducer