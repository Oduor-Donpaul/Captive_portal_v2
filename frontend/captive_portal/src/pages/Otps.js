import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import './styles/styles.css'

const ListOtps = () => {
    const [otpList, setOtpList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        const interval = setInterval(() => {
            fetch(`http://127.0.0.1:8000/admin/get-otps?page=${page}&page_size=${pageSize}`)
            .then(response => response.json())
            .then(data => {
                
                    console.log(data.total)

                    setOtpList(data.data);

                    setTotal(data.total)
            })
            .catch(error => console.error('Error fetching otp:', error))
        }, 5000);

        return () => clearInterval(interval) //cleanup on unmount

    }, [page, pageSize])


    const handleNextPage = () => {
        if (page * pageSize < total) {
            setPage(page + 1)
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    };

    return (
        <div style={{textAlign: 'center', width: '90%'}}>
            <h2><b>OTPs</b></h2>
            <div className="notifications-container" >
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                    {otpList.map((item, index) => (
                        <li key={index}>
                            <p>Dear {item.phone_number}, your OTP is {item.otp} created at {item.created_at}. Please Do NOT share it with anyone. </p>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <div>
                <Button onClick={handlePrevPage} disabled={page===1}>
                    previous
                </Button>
                <span>
                    Page {page} of {Math.ceil(total / pageSize)}.
                </span>
                <Button onClick={handleNextPage} disabled={page * pageSize >= total} >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default ListOtps;