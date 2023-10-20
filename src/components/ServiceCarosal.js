import React , { useEffect } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function ServiceCarosal({img1,img2,img3}) {
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
                </div>
                <div className="carousel-item">
                    <img src={img2} alt="" />

                </div>
                <div className="carousel-item">
                    <img src={img3} alt="" />

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
  )
}
