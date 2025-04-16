import React from "react";
import logo from '../assets/images/logo.webp';
import { useNavigate } from "react-router-dom";

const Home = () => {


    const pageStyle = {
        backgroundColor: '#C8C8C8',  // Light grayish-white color
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
        paddingTop: '20px',
    };

    return (
        <div  style={pageStyle}>
            <div>
                <h1 style={{ color: 'blue' }}><b>Welcome to Techpoint</b></h1>
                <img src={logo} width='200x' heigh='200px' alt='Techpoint logo' />
            </div>
            <div>
            <div>
                <h2>Dear Customer this service is Temporarily unavailable. Please contact your Network administrator for assistance.</h2>
            
            </div>
            </div>
            <div  style={{marginTop: '20px'}} >
                <p>&#xA9; 2025 Techpoint. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Home;