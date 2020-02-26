import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/authReducer';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppState } from '../types';

const NavigationBar: React.FC<any> = (props: any) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const dispatch = useDispatch();

  const link = auth.uid
    ? <a href="# " onClick={() => { dispatch(logout()) }}>Log Out</a>
    : <a href="# " onClick={() => { dispatch(login()) }}>Log In</a>;

  return (
    <Navbar className="navbar">
      <LinkContainer to="/">
        <Navbar.Brand>Judge Note</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to="/atcoder">
        <Nav.Link>AtCoder</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/codeforces">
        <Nav.Link>Codeforces</Nav.Link>
      </LinkContainer>
      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-primary">{link}</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar;