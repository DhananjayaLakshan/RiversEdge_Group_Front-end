import React from 'react'
import { useState,CSSProperties  } from "react";
import HashLoader from "react-spinners/HashLoader";


function Loader() {
let [loading, setLoading] = useState(true);

return (
    <div style={{marginTop:'15%', marginLeft:'45%'}} className='center'>    
        <div className="sweet-loading" style={{textAlign:'center'}}>
        <HashLoader       
            color='#C18239'
            loading={loading}        
            size={80}       
        />
        </div>
    </div>
);
}

export default Loader
