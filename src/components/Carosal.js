import React , { useEffect } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Carousel({img1,img2,img3}) {

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div data-aos="zoom-out-up" id="carouselExampleCaptions" 
        className="carousel slide" 
        data-ride="carousel" 
        >

            <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner caroContainer">
                <div className="carousel-item active">
                    <img className="caro" src={img1} alt="" />
                    <div className="carousel-caption d-none d-md-block" data-aos="flip-down">
                        <h5 style={{fontSize:'50PX'}}>Where Luxury Meets Nature's Symphony</h5>
                        <p >Discover serenity at River's Edge, a haven where opulent luxury seamlessly blends with the soothing 
                            melody of nature's beauty.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={img2} alt="" />
                    <div className="carousel-caption d-none d-md-block">    
                        <h5 style={{fontSize:'50PX'}}>Luxury Rooms</h5>                       
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={img3} alt="" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5 style={{fontSize:'50PX'}}>Great View</h5>                        
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
}
