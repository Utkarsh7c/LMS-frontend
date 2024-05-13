
import './App.css'

import { Routes,Route } from 'react-router-dom'
import Footer from './Components/footer'

import HomePage from './/Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/profile'
import Editprofile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
function App() {
  

  return (
  
 <>
  <Routes>
    <Route path='/'  element={<HomePage/>}></Route>
    <Route path='/about' element={<AboutUs/>}>     </Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/courses' element={<CourseList/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/denied' element={<Denied/>}></Route>
    <Route path='/course/description/' element={<CourseDescription/>}></Route>
    {/*  for Admins access*/}
    <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} > 
    <Route path='/course/create' element={<CreateCourse/>}></Route>
    </Route>
    <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>} >  
    <Route path='/user/profile' element={<Profile/>}></Route>
    <Route path='/user/editprofile' element={<Editprofile/>}></Route> 
    <Route path='/checkout' element={<Checkout/>}></Route> 
    <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route> 
    </Route>
   
  <Route path='*' element={<NotFound/>}> </Route>
  
  </Routes>
 {/* <Footer/> */}
 </> 
  )
}

export default App
