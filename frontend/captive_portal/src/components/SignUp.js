import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/admin/login', {
                email: email,
                password: password                
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

            const access_token = response.data.access_token

            setMessage('Login successful')

            alert(message)
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again'
            console.error('erroe loging in:', errorMessage)

            setMessage(`Login failed: ${errorMessage}`)
            alert(`Login failed: ${errorMessage}`)
        }

    }

    return (
        <div style={{textAlign: 'center'}}>
            <div style={{textAlign: 'center'}}>
                <h1><b>Welcome to Techpoint</b></h1>
                <p>Your One Stop for all Things Tech</p>
            </div>
            <div>
                <h2 style={{fontSize: '25px'}}><b>Sign In</b></h2>
            </div>
            <div>
                <label htmlFor="email">
                    Email:
                </label>
                <br></br>
                <input 
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Email"
                    style={{
                        marginTop: '5px',
                        marginBottom: '20px'
                    }}
                />
                <br></br>
                <label htmlFor="password">
                    Enter your Password:
                </label>
                <br></br>
                <input 
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="password"
                    style={{
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}
                />
                <br></br>
                <label htmlFor="role">
                    Role
                </label>
                <br></br>
                <input
                    name="role"
                    type="text"
                    value={role}
                    onChange={handleRoleChange}
                    placeholder="role"
                />
                <br></br>
                <Button onClick={handleSignIn}>Sign Up</Button>
            </div>
        </div>
    )
};

export default SignUp;