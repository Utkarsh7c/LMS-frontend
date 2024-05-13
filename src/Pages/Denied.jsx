import { useNavigate } from "react-router-dom";

function Denied(){
 const navigate=useNavigate();
   //console.log("this is denied page ")
 return(
  
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2338]">
  <h1 className="text-9xl text-white  font-extrbold tracking-widest">   403  </h1>
      <div  className="bg-black text-white px-2 text-sm rounded-sm rotate-12 absolute">
        Acces Denied </div>
        <button  className=" text-white mt-5 " onClick={()=>{ navigate(-1)}}>
           <span className=""></span>
            <span className="relative block mt-4 px-8 py-3 bg-[#1A2238] border border-white">GO Back</span>
            
            </button>
 </main >
 
  
  
 
 )

}
export default Denied;