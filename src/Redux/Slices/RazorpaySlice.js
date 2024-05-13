import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    key:"",
    subscritption_id:"",
    isPaymentVerified: false,
    allPayemnts:{},
    finalMonths:{},
    monthlySalesRecord:[],

}
export const getRazorPayId=createAsyncThunk("/razorpay/getId",async ()=>{
    try{

const response= await axiosInstance.get("/payments/razorpay-key");
 return response.data
    }
    catch(error){
toast.error("Failed to load Data ");
    }
})

export const purchaseCourseBundle=createAsyncThunk("/purchaseCourse",async ()=>{
    try{

const response= await axiosInstance.post("/payments/subcribe");
 return response.data
    }
    catch(error){
toast.error("Failed to load Data ");
    }
})
export const verifyUserPayment=createAsyncThunk("/payment/verify",async (data)=>{
    try{

const response= await axiosInstance.post("/payments/verify",{
    razorpay_payment_id:data.razorpay_payment_id,
    razorpay_Subcription_id:data.razorpay_Subcription_id,
    razorpay_signature:data.razorpay_signature,

});
 return response.data
    }
    catch(error){
toast.error(error?.response?.data?.message);
    }
})
export const getPaymentRecord=createAsyncThunk("/payment/record",async ()=>{
    try{
        const response=  axiosInstance.get("/payments?count=100");
        toast.promise(response,{
    loading:"Getting the payment records",
    success:(data)=>{
        return data?.data?.message
    },
    error:"Failed to get payment records"
})

 return (await response).data
    }
    catch(error){
toast.error("Operation Failed ");
    }
})
export const cancelCourseBundle=createAsyncThunk("/payments/cancel",async ()=>{
    try{

const response= await axiosInstance.post("/payments/unsubscribe");
 
toast.promise(response,{
    loading:"unsubcribing the Bundle",
    success:(data)=>{
        return data?.data?.message
    },
    error:"Failed to  unsubcribe"
})
return (await response).data
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})




const razorpaySlice= createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscritption_id=action?.payload?.subscritption_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayemnts=action?.payload?.allPayemnts
          state.finalMonths=action?.payload?.finalMonths;
           state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
        })

    }
})
export default razorpaySlice.reducer;                                    