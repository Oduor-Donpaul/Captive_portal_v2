# Captive Portal OTP-based Authentication System

## Overview

This project is a custom OTP-based Captive Portal system for managing network access. It is designed to enhance user security and streamline access control. Users connect to the Wi-Fi network, are redirected to a login page, and receive an OTP (One-Time Password) via M-Pesa after making a payment. The OTP grants them access to the internet.

## Key Features

Flask-based Backend for handling OTP generation and payment callbacks.

React Frontend for user interaction.

OpenWrt router for captive portal redirection.

RabbitMQ for message brokering between services.

No user registration required.

M-Pesa payment integration for OTP delivery.

## Technologies Used

Backend: Flask

Frontend: React

Database: SQLite / mysql

Authentication: Flask 

Networking: OpenWrt

Messaging: RabbitMQ

Payment Gateway: M-Pesa API

## Setup Instructions

## Prerequisites

Python 3.x

Node.js and npm

RabbitMQ

OpenWrt Router

M-Pesa Daraja API access

## Backend Setup

1. Clone the repository:
    
<pre> ```bash git clone https://github.com/yourusername/captive-portal-project.git 
cd captive-portal-project/backend ``` </pre>

2. Create and activate a virtual environment:

<pre> ```bash python3 -m venv venv
source venv/bin/activate``` </pre>

3. Install dependencies:

<pre> ```bash pip install -r requirements.txt ``` </pre>

4. Set up environment variables in .env:

<pre> ```SECRET_KEY=your_secret_key
DATABASE_URI=sqlite:///captive_portal.db
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret ``` </pre>

5. Run database migrations:

<pre> ``` flask db upgrade ``` </pre>

6. Start the backend server:

<pre> ``` flask run ``` </pre>

## RabbitMQ Setup

7. Install RabbitMQ on your server.

8. Start RabbitMQ:
   
   <pre> ``` sudo systemctl start rabbitmq-server ``` </pre>

## Frontend Setup

9. Navigate to the frontend directory:

<pre> ``` cd ../frontend ``` </pre>

10. Install dependencies:

<pre> ``` npm install ``` </pre>

11. Start the frontend development server

# Usage

Users connect to the Wi-Fi network.

They are redirected to the Captive Portal page.

After entering their phone number, they complete payment via M-Pesa.

The system verifies payment and generates an OTP.

Users enter the OTP to gain internet access.

# Security Considerations

Ensure HTTPS is enabled for secure communication.

Use strong passwords and rotate secrets regularly.

Validate and sanitize all user inputs.

# Troubleshooting

Common Issues

No routes matched location error: Check if all frontend routes are correctly defined.

FreeRADIUS authentication failure: Verify NAS client configuration.

OTP not received: Check M-Pesa integration and callback URL handling.

# Future Improvements

Implement a dashboard for admin management.

Add logging and monitoring for system events.

Support multiple payment gateways.

Improve UI/UX of the captive portal page.

