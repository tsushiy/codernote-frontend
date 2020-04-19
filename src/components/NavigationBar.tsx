import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GlobalState } from "../types/globalState";
import firebase from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBar: React.FC<{}> = () => {
  const { isLoggedIn, userName } = useSelector(
    (state: GlobalState) => state.auth
  );

  const onClickLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const onClickLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <Navbar expand="md" fixed="top" bg="light" variant="light">
      <LinkContainer to="/table">
        <Navbar.Brand>Codernote</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" activeKey="">
          <LinkContainer to="/table">
            <Nav.Link>Table</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/notes">
            <Nav.Link>Notes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/mynotes">
            <Nav.Link>MyNotes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/submissions">
            <Nav.Link>Submissions</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <Nav.Link onClick={isLoggedIn ? onClickLogout : onClickLogin}>
            {isLoggedIn ? `Logout (${userName})` : "Login"}
          </Nav.Link>
          <Nav.Link
            href="https://github.com/tsushiy/codernote-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={["fab", "github"]} size="lg" color="#777" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
