import React, {useEffect} from 'react'
import backgroundVideo from '../img/backGround.mp4'
import backgroudimg from '../img/frontimg.jpg'
import room1 from '../img/4.jpg'
import room2 from '../img/5.jpg'
import room3 from '../img/6.jpg'
import spa from '../img/service1.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Home() {

        useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <>

            <div className='hero'>

                <video autoPlay loop muted playsInline className='backVideo'>
                    <source src={backgroundVideo} />
                </video>
                <div className='content'>
                    <h1>Where Serenity Meets Luxury</h1>
                    <p className='frontP'>River's Edge Villa offers a harmonious blend of tranquility and opulence, nestled in nature's embrace. Experience a haven of relaxation with breathtaking riverside views, sumptuous accommodations, and unparalleled serenity. Your escape to luxury begins here.</p>
                </div>
            </div>

<div className='container2'>

<h1 style={{textAlign:'center', fontSize:'50px', marginTop:'5px', marginBottom:'10px'}}>River's Edge Your Excellent Choice For Vacation.</h1>


            <div class="card mb-3 bs" data-aos="fade-right">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src={backgroudimg} class="card-img" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Luxury Rooms</h5>
                            <p class="card-text">
                            Indulge in comfort and style at River's Edge Villa. Our meticulously designed rooms offer modern amenities, 
                            serene river views, and a touch of luxury, ensuring an unforgettable stay in nature's lap.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mb-2 mt-2'>

                <div class="card mr-o" style={{width:'350px', height:'auto'}}  data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                    <img src={room1} class="card-img-top"/>                    
                </div>

                <div class="card ml-0 mr-o" style={{width:'350px'}}  data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                    <img src={room2} class="card-img-top"/>                    
                </div>

                <div class="card ml-0" style={{width:'350px'}}  data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                    <img src={room3} class="card-img-top"/>                    
                </div>

            </div>


            <div class="card mb-3 bs" data-aos="fade-left" >
                <div class="row no-gutters">

                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">
                            Indulge in a world of relaxation and rejuvenation at our luxurious spa. 
                            Pamper yourself with a range of soothing treatments designed to melt away stress and tension. 
                            From massages to facials, our professional therapists are dedicated to providing you with a blissful experience. 
                            Unwind in a tranquil atmosphere and emerge feeling refreshed, revitalized, and ready to take on the world.</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                    
                        <img src={spa} class="card-img" alt="..." />
                        

                    </div>
                </div>
            </div>

</div>

        </>
    )
}
