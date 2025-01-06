import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    // Remove the auth token
    localStorage.removeItem('authToken');

    const handleSignOut = () => {
    
        // Redirect to sign-in page
        navigate('/admin/signin', { replace: true });
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>You have been signed out.</h1>
            <button
                onClick={handleSignOut}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Sign In Again
            </button>
        </div>
    );
};

export default SignOut;
