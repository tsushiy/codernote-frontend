import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppState } from '../types/appState';
import firebase from '../utils/firebase';

const NavigationBar: React.FC<{}> = () => {
  const { name } = useSelector((state: AppState) => state.auth)

  const link = (name !== "")
    ? <a href="# " onClick={() => {
      firebase.auth().signOut();
    }}>Log out</a>
    : <a href="# " onClick={() => {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider)
    }}>Log in</a>;

  return (
    <Navbar className="navbar">
      <LinkContainer to="/">
        <Navbar.Brand>Codernote</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to="/notes">
        <Nav.Link>Notes</Nav.Link>
      </LinkContainer>
      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-primary">{link}</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar;