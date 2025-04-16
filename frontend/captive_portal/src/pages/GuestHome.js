import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from 'axios';

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}



const GuestHome = () => {

    const [ClientData, setClientData] = useState({
        clientMac: '',
        clientIp: '',
        token: ''
    });
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState('');
    const [paid, setPaid] = useState(false);

    const query = useQuery();
    const navigate = useNavigate()
    const location = useLocation();
    
    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (/^[0-9]*$/.test(input)) {
            setPhoneNumber(input)
        }
    }

    useEffect(() => {
        const clientMac = query.get("clientMac");
        const clientIp = query.get("clientIp");
        const token = query.get("t");

        setClientData({
            clientMac,
            clientIp,
            token
        })

    }, [location.search])

    const validatePhoneNumber = (number) => {
        const regex = /^2547\d{8}$/;
        return regex.test(number)
    }

    const normalizePhoneNumber = (number) => {
        if (number.startsWith('07')) {
            return '254' + number.slice(1);
        }
        return number
    }
    
    const handleSignIn = async (amount) => {
        if (!/^\d{10}/.test(PhoneNumber) || !PhoneNumber.startsWith('07')){
            alert('Enter a valid phone number')
            return;
        }

        if (!validatePhoneNumber(PhoneNumber)) {
            const normalized = normalizePhoneNumber(PhoneNumber);
            setPhoneNumber(normalized);
        }

        try {
            const response = await axios.post('http://192.168.0.127/api/payment', {
                //client_data: ClientData,
                phone_number: PhoneNumber,
                amount: amount
                
            });
        
            const accessToken = response.data.access_token;
            
            console.log(
                 ClientData,
                 PhoneNumber,
                 amount
            )
            if (response.data.ResponseCode === '0' && response.status == '200') {
                alert('Payment initiated. Check your phone to complete the transaction.')

                setPaid(true)

            }
            if (response.status == 200) {
                navigate('/waiting')
               // alert(`Error: ${response.data.errorMessage}`)
            }
        } catch (error) {
            console.error('Payment error', error)
            alert(`Error processing payment: ${error}`)
        }

    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f5f5f5'
          }}>
            <div style={{textAlign: 'center'}}>
                <h2><b>Welcome to Mwer Connect</b></h2>
            </div>
            <div>
                <div style={{
                    border: '5px solid blue',
                    width: '90%',
                    maxWidth: '500px',
                    padding: '20px',
                    margin: '20px auto',
                    backgroundColor: '#fff',
                    borderRadius: '10px'
                }}>
                    <h3><b>Sign in To Network</b></h3>
                    {!paid ?
                    (<div>
                        <label htmlFor="phone_number">
                            Enter <b>M-Pesa</b> Phone Number:
                        </label>
                        <br></br>
                        <input
                            name="phone_number"
                            type="tel"
                            value={PhoneNumber}
                            onChange={handlePhoneNumberChange}
                            placeholder="Example    254712345678"
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '20px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                              }}
                        />
                        <br></br>
                        <div style={{marginBottom: '10px'}}>
                            <Button onClick={() => handleSignIn(30)}>Pay Ksh 30 for a Day</Button>
                        </div>
                        <div>
                            <Button onClick={() => handleSignIn(10)}>Pay Ksh 10 for 1 hour</Button>
                        </div>
                    </div> ) :
                    (<div>
                        <label htmlFor="phone_number">
                            Enter <b>M-Pesa</b> Phone Number:
                        </label>
                        <br></br>
                        <div>
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
                        </div>
                       <br></br>
                        <Button onClick={handleSignIn} >Sign In</Button>
                    </div>)
                    }            
                </div>
                <div>
                    <p style={{color: 'purple', fontSize: '20px'}}><b>Customer Support: 0113398418</b></p>
                    <p><b>Powered by Techpoint</b></p>
                    <p>&#xA9; 2025 Techpoint. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default GuestHome;