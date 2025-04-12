import React, { useEffect, useState } from "react";
import io from "socket.io-client";
  
var socket = io('http://127.0.0.1', {
    transports: ['websocket'],
    reconnection: true
});

const Notifications = () => {

    const [otpList, setOtpList] = useState([]);

    useEffect(() => {
        //Register the web socket
        socket.on("otp_generated", (data) => {
           
            setOtpList((prevList) => [
                ...prevList,
                {PhoneNumber: data.PhoneNumber, otp: data.otp_code},
            ]);
        });
        return () => {
            socket.off("otp_generated")
        };
    }, []);

    return (
        <div style={{textAlign: 'center', width: '90%'}}>
            <h2>Notifications</h2>
            {otpList.map((item, index) => (
                <li style={{listStyleType: 'none', borderWidth: '2px', borderColor: 'blue'}} key={index}>
                    <p>Dear {item.PhoneNumber}, your OTP is {item.otp}. Please Do NOT share it.</p>
                </li>
            ))}
        </div>
    )
}

export default Notifications;