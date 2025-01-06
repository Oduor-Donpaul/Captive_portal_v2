import React from "react";
import logo from '../assets/images/logo.webp';

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
                <img src={logo} width='400vw' heigh='400vh' alt='Techpoint logo' />
            </div>
            <div  style={{marginTop: '20px'}} >
                <p><b>Your One Stop for all Things Tech</b></p>
            </div>
        </div>
    )
}

export default Home;