import React, {useState, useEffect} from 'react'
import ServiceCard from '../components/ServiceCard'
import axios from "axios";
import Loader from '../components/Loader';
import Aos from "aos";
import "aos/dist/aos.css";
import service1 from '../img/service1.jpg';
import service2 from '../img/service2.jpg';
import service3 from '../img/service3.jpg';
import Carousel from '../components/Carosal';

export default function ServiceScreen() {

    const [services, setServices] = useState([])
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [duplicateService, setDuplicateService] = useState([])

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        // Function to fetch room data from the server
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get('/api/service/getAllServices');
                // Store the data in duplicaterooms and rooms state
                setDuplicateService(response.data);
                setServices(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
                setLoading(false);
            }
        }

        // Fetch data when the component mounts
        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount



    return (
        <>            
            <Carousel img1={service1} img2={service2} img3={service3} />

            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" >            
                <h4 style={{ textAlign: 'center', fontSize: '50px', fontWeight: '700', paddingTop: '20px' }}>SERVICES</h4>
            </div>

            <div className="row justify-content-center mt-5 ">

                {loading ? (

                    <div className=" justify-content-center" style={{ justifyContent: 'center', marginTop: '50px' }}>
                        <Loader />
                    </div>

                ) : (
                    services.map((service) => {
                        return <ServiceCard key={service._id} service={service} />
                    })
                )}

            </div>
        </>

    )
}
