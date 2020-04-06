import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Toast, Alert } from 'react-bootstrap';
import styled from "styled-components";
import { MainContainer } from './Styles';
import { GlobalState } from '../types/globalState';
import { setUser } from '../reducers/authReducer';
import { setMyNotes } from '../reducers/noteReducer';
import { postChangeName, postUserSetting } from '../utils/apiClient';

const SettingsPage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const initialSettings = useSelector((state: GlobalState) => state.auth);
  const { isLoggedIn } = initialSettings;

  const [isSettingChanged, setIsSettingChanged] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  // useStateでobjを扱うときの挙動がよくわからない
  useEffect(() => {
    setSettings(Object.assign({}, initialSettings));
  }, [isLoggedIn, initialSettings])

  useEffect(() => {
    if (!isSettingChanged) return;
    dispatch(setUser());
    dispatch(setMyNotes());
    setIsSettingChanged(false);
  }, [dispatch, isSettingChanged])

  const onSubmitUserName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postChangeName(settings.userName);
      setIsSettingChanged(true);
      setMessage("Successfully changed UserName.");
      setShowMessage(true);
    } catch (error) {
      setMessage("Failed to change UserName.");
      setShowMessage(true);
    }
  }

  const onSubmitOtherSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postUserSetting({...settings});
      setIsSettingChanged(true);
      setMessage("Successfully changed User Settings.");
      setShowMessage(true);
    } catch (error) {
      setMessage("Failed to change User Settings.");
      setShowMessage(true);
    }
  }

  return (
    <MainContainer>
      <Container>
        <h1>Settings</h1>
        {!isLoggedIn &&
          <Alert variant="warning" style={{padding: "10px 16px", marginBottom: "10px"}}>
            You must be logged in to change settings.
          </Alert>}
        <StyledToast
          style={{backgroundColor: message.match(/^Success/) ? "#394" : "red"}}
          onClose={() => setShowMessage(false)}
          show={showMessage}
          delay={3000}
          autohide>
          <Toast.Body>
            {message}
          </Toast.Body>
        </StyledToast>
        <UserNameContainer>
          <Form onSubmit={onSubmitUserName}>
            <Form.Group controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.userName}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, userName: e.target.value})} />
              <Form.Text className="text-muted">
                UserName must be unique and between 3 and 30 alphanumeric characters.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </UserNameContainer>
        <OtherSettingContainer>
          <Form onSubmit={onSubmitOtherSettings}>
            <Form.Group controlId="atcoder-id">
              <Form.Label>AtCoder ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.atcoderID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, atcoderID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="codecorces-id">
              <Form.Label>Codeforces ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.codeforcesID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, codeforcesID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="yukicoder-id">
              <Form.Label>yukicoder ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.yukicoderID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, yukicoderID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="aoj-id">
              <Form.Label>AOJ ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.aojID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, aojID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="leetcode-id">
              <Form.Label>LeetCode ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.leetcodeID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, leetcodeID: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </OtherSettingContainer>
      </Container>
    </MainContainer>
  );
}

const Container = styled.div`
  display: block;
  position: relative;
  width: calc(100% - 30px);
  max-width: 480px;
  padding-top: 24px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledToast = styled(Toast)`
  &&& {
    position: absolute;
    top: 10px;
    right: 0;
    color: #FFF;
    background-color: red;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 0.5em;
  }
`

const UserNameContainer = styled.div`
  padding: 20px;
  margin: 16px 0;
  border: solid thin #CCC;
  border-radius: 1em;
`;

const OtherSettingContainer = styled.div`
  padding: 20px;
  margin: 16px 0;
  border: solid thin #CCC;
  border-radius: 1em;
`;

export default SettingsPage;