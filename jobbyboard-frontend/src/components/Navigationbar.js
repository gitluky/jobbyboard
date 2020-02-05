import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchJobby from './SearchJobby';

const Navigationbar = ({ user }) => {
  return(
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Jobbyboard</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link><NavLink to={'/' + user } exact >Bulletin</NavLink></Nav.Link>
          <Nav.Link><NavLink to="#MyProfile" exact >My Profile</NavLink></Nav.Link>
          <Nav.Link><NavLink to="#History" exact >History</NavLink></Nav.Link>
        </Nav>
        <SearchJobby />
      </Navbar>
    </div>
  )

}

export default Navigationbar;
