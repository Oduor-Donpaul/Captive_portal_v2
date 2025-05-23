import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';

const GuestHome = () => {

    const [PhoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState('');
    const [paid, setPaid] = useState(false);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://127.0.0.1/login', {
                otp_code: otp,
                phone_number: PhoneNumber
                
            });
            

            const accessToken = response.data.access_token;

            setMessage('Login Successful')

            alert('Login successful')
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
            console.error('Error loggin in:', errorMessage)

            setMessage(`Login failed: ${errorMessage}`);
            alert(`Login failed ${errorMessage}`)
        }
    }

    const inititePayment = async (amount) => {
        
        try {
            const response = await axios.post("http://127.0.0.1/api/payment", {
                phone_number: PhoneNumber,
                amount: amount
            })

            if (response.data.ResponseCode === '0') {
                alert('Payment initiated. Check your phone to complete the transaction.')

                setPaid(true)

            } else {
                alert(`Error: ${response.data.errorMessage}`)
            }
        } catch (error) {
            console.error('Payment error', error)
            alert('Error processing payment')
        }
    }

    return (
        <div style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <h1><b>Welcome to Techpoint</b></h1>
                <p>Your One Stop for all Things Tech.</p>
            </div>
            <div>
                <div style={{
                    border: '5px solid blue',
                    width: '40%',
                    padding: '40px',
                    margin: '0 auto',
                    marginBottom: '10px'}}>
                    <h2><b>Sign in To Network</b></h2>
                    {!paid ?
                    (<div>
                        <label htmlFor="phone_number">
                            Enter <b>M-Pesa</b> Phone Number:
                        </label>
                        <input
                            name="phone_number"
                            type="tel"
                            value={PhoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="Example    254712345678"
                            style={{
                                marginBottom: '20px',
                                borderRadius: '5px'
                            }}
                        />
                        <br></br>
                        <div style={{marginBottom: '10px'}}>
                            <Button onClick={() => inititePayment(30)}>Pay Ksh 30 for a Day</Button>
                        </div>
                        <div>
                            <Button onClick={() => inititePayment(10)}>Pay Ksh 10 for 1 hour</Button>
                        </div>
                    </div> ) :
                    (<div>
                        <label htmlFor="phone_number">
                            Enter <b>M-Pesa</b> Phone Number:
                        </label>
                        <input
                            name="phone_number"
                            type="tel"
                            value={PhoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="Example    254712345678"
                            style={{
                                marginBottom: '20px',
                                borderRadius: '5px'
                            }}
                        />
                        <br></br>
                        <label htmlFor="otp">
                            Enter a valid OTP:
                        </label>
                        <br></br>
                        <input 
                            name="otp"
                            type="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="OTP  123456"
                            style={{
                                marginBottom: '10px',
                                borderRadius: '5px'
                            }}
                        />
                        <br></br>
                        <Button onClick={handleSignIn} >Sign In</Button>
                    </div>)
                    }            
                </div>
                <div>
                    <p style={{color: 'purple', fontSize: '20px'}}><b>Customer Support: 0112735500 </b></p>
                    <p>&#xA9; 2024 Techpoint</p>
                </div>
            </div>
        </div>
    );
};

export default GuestHome;