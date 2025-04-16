//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import OtpSearch from './pages/OtpSearch';
import Home from './pages/Home';
//import Notifications from './pages/Notifications';
import GenerateOtp from './pages/GenerateOtp';
import GeneralNavbar from './components/GeneralNavbar';
import GuestHome from './pages/GuestHome';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn';
import ListOtps from './pages/Otps';
import ProtectedRoute from './components/ProtectedRoute';
import SignOut from './components/SignOut';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      
      <div>
        
          <Routes>
            <Route path='/waiting' element={<Home />} />
            
              <Route path='/admin/notifications/all' element={
                <ProtectedRoute>
                  {/*<Notifications />*/}
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
            <Route path='/' element={<GuestHome />} />
            <Route path='/login' element={<LogIn />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
