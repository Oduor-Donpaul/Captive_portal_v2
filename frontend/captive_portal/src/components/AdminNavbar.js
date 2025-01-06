import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AdminNavbar = () => {

  const authToken = localStorage.getItem('authToken')

  return (
    <div >
      <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
        <Container>
          <Navbar.Brand href='/admin'>Techpoint</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/admin'>Home</Nav.Link>
              <Nav.Link href='/admin/notifications/all'>Notifications</Nav.Link>
              <Nav.Link href='/admin/get-otps'>OTPs</Nav.Link>
              <Nav.Link href='/admin/search'>Search</Nav.Link>
              <Nav.Link href='/admin/generateotp'>Generate OTP</Nav.Link>
              { authToken ? (<Nav.Link href='/admin/signout'>Sign Out</Nav.Link>
              ) : (
                <Nav.Link href='/admin/signin'>Sign In</Nav.Link>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;