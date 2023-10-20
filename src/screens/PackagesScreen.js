import React,{ useState,useEffect } from "react";
import PackageCard from "../components/PackageCard";
import axios from "axios";
import Loader from '../components/Loader';
import Aos from "aos";
import "aos/dist/aos.css";
import pkg1 from '../img/pkg1.png';
import pkg2 from '../img/pkg2.png';
import pkg3 from '../img/pkg3.png';
import ServiceCarosal from "../components/ServiceCarosal";

export default function PackagesScreen() {

    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [dublicatePackage, setDublicatePackage] = useState([])

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        // Function to fetch room data from the server
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get('/api/package/getAllPackages');
                // Store the data in duplicaterooms and rooms state
                setDublicatePackage(response.data);
                setPackages(response.data);
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
            <ServiceCarosal img1={pkg1} img2={pkg2} img3={pkg3}/>
        
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" >            
                <h4 style={{ textAlign: 'center', fontSize: '50px', fontWeight: '700', paddingTop: '20px' }}>PACKAGES</h4>
            </div>

            <div className="row justify-content-center mt-5 ">
            
                {loading ? (

                    <div className=" justify-content-center" style={{justifyContent:'center', marginTop:'50px'}}>
                        <Loader />
                    </div>

                ) : (
                    packages.map((ppackage) => {
                        return <PackageCard key={ppackage._id} ppackage={ppackage} />;
                    })
                )}

            </div>
        </>
    )
}
