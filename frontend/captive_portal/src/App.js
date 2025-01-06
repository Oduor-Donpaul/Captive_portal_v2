import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import OtpSearch from './pages/OtpSearch';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import GenerateOtp from './pages/GenerateOtp';
import GeneralNavbar from './components/GeneralNavbar';
import GuestHome from './pages/GuestHome';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import ListOtps from './pages/Otps';
import ProtectedRoute from './components/ProtectedRoute';
import SignOut from './components/SignOut';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {

  //Establish socketio connection to the server
  var socket = io('http://127.0.0.1:8000', {
    transports: ['websocket', 'polling']
});


  socket.on('otp_notification', (data) => {
    console.log("Data:", data);
  
  })
  return (
    <Router>
      <GeneralNavbar />
      <div>
        
          <Routes>
            <Route path='/admin' element={<Home />} />
            
              <Route path='/admin/notifications/all' element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>  
                  } />
              <Route path='/admin/search' element={
                <ProtectedRoute>
                  <OtpSearch />
                  </ProtectedRoute>  
                  } />
              <Route path='/admin/generateotp' element={
                <ProtectedRoute>
                  <GenerateOtp />
                </ProtectedRoute>
                } />
              <Route path='/admin/get-otps' element={
                <ProtectedRoute>
                  <ListOtps />
                </ProtectedRoute>
              } />
              <Route path='/admin/signin' element={<SignIn />} />
              <Route path='/admin/signout' element={<SignOut />} />
            

            <Route path='/admin/login' element={<LogIn />} />
          </Routes>
          
          <Routes>
            <Route path='/' element={<GuestHome />} />
            <Route path='/login' element={<LogIn />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
