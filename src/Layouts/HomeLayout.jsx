import { AiFillCloseCircle} from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/footer';
import { logout } from '../Redux/Slices/AuthSlice';
import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';



function HomeLayout({ children }) {
    
    //console.log('this is HomeLayout')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    
   
    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';

       
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
    async function handleLogout(e){
        e.preventDefault();
        const res= await dispatch(logout())
        if(res?.payload?.data)
        navigate("/")

    }
    function handleButtonClick() {
         setIsButtonClicked(!isButtonClicked);
        console.log("buttonnnnn");
    }

    
    return (
        
        // <div className={`min-h-[90vh] bg-${isButtonClicked ? 'black' : 'neutral'}`} >
        <div className={`min-h-[90vh] bg-neutral`} >
            <div className="drawer absolute left-0 z-50 w-full  ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content  ">
                    <label htmlFor="my-drawer">
                        <FiMenu onClick={changeWidth} size={"32px"} className='font-bold text-white m-4'  />
                    </label>
            
                </div>
                
        

                <div className="drawer-side    w-0">                   
                    <label htmlFor="my-drawer" className="drawer-overlay  "></label>
                    <ul className='menu p-4 w-48 h-[100%] sm:w-80 bg-gray-400   text-base-content relative'>
                        <li className='w-fit absolute right-2 z-50 '>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}/>
                            </button>
                        </li>
                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                       
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/admin/dashboard">AdminDashboard</Link>
                            </li>
                        )}
                        {isLoggedIn && role === "ADMIN" && (
                            <li>
                                <Link to="/course/create">Create new Course</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses"> All Courses </Link>
                        </li>
                        <li>
                            <Link to="/contact"> Contact us </Link>
                        </li>
                        <li>
                            <Link to="/about"> About Us</Link>
                        </li>
                       
                        {!isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="  w-full flex items-center justify-center ">
                                    <button  className='btn btn-neutral px-1 py-1 font-semibold rounded-md w-36 '>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <Link to="/signup"><button className=" btn btn-neutral px-1 py-1 font-semibold rounded-md w-36">
                                          Signup 
                                    </button></Link> 
                                </div>
                            </li>
                        )}
                        {isLoggedIn &&
                        (
                            <li className="absolute bottom-4 w-[90%]">
                            <div className="  w-full flex items-center justify-center">
                                <button  className='btn btn- px-1 py-1 font-semibold rounded-md w-36 '>
                                    <Link to="/user/profile">Profile</Link>
                                </button>
                                <button onClick={handleLogout} className=" btn btn-neutral px-1 py-1 font-semibold rounded-md w-36">
                                      <Link to="/logout">LogOut</Link>  
                                </button>
                            </div>
                        </li>


                        )
                        
                        }

                        
                    </ul>
                </div>
            
                <div className="fixed mt-4 mr-2 right-4 bg-yellow-500 rounded-sm">
                <button onClick={handleButtonClick}>
                    {isButtonClicked ? <FiMoon size={24} /> : <FiSun size={24} />}
                </button>
            </div>
                       
            </div>
           

            {children}

            <Footer />

        </div>
        
    );
}

export default HomeLayout;