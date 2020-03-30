import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppState } from '../types/appState';
import firebase from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationBar: React.FC<{}> = () => {
  const { userName } = useSelector((state: AppState) => state.auth)

  const link = (userName !== "")
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
      <LinkContainer to="/table">
        <Nav.Link>Table</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/notes">
        <Nav.Link>Notes</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/my/notes">
        <Nav.Link>MyNotes</Nav.Link>
      </LinkContainer>
      <Navbar.Collapse className="justify-content-end">
        <a href="https://github.com/tsushiy/codernote-frontend" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fab', 'github']} size="lg" color="#777" />
        </a>
        <Button style={{margin: "0 12px"}} variant="outline-primary">{link}</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar;