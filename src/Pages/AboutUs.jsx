import HomeLayout from "../Layouts/HomeLayout";
import AboutusImage from '../assets//Images//AboutusImage.png'

import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/Celebrities";
function AboutUs(){

  return(
 <HomeLayout>    
<div className="pl-20 pt-20 flex flex-col text-white" >
    <div className="flex items-center gap-5 mx-10">
        <section  className="w-1/2 space-y-10">
        <h1 className="text-5xl text-yellow-500 font-semibold"> 
            Affordable and Quality Education 
        </h1>
           <p className="text-xl text-gray-200">
           Main  GOAL to provide  afforadable and quality education to the world
           we  ARE   providing platforms to aspiring teachers and students to share their skills and creativity
           and knowledge  to each other to empower and contribute in their wellness 

           </p>

        </section>
        <div className="w-1/2">
            <img 
            id="test1"
            style={{
                filter:"drop-shadow(0px 10px 10px rgb(0,0,0));"
            }}
            
            
            className="drop-shadow-2xl"  
            src={AboutusImage} alt="Aboutmain" />

        </div>
    </div>
    <div className="carousel w-1/2 my-16 m-auto">
      {celebrities&& celebrities.map(celebrity=>(<CarouselSlide  {...celebrity} key={celebrity.slideNumber} totalSlides={celebrities.length } />))}
</div>
</div>
</HomeLayout>
)
}
export default AboutUs;