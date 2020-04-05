import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import { GlobalState } from '../types/globalState';
import { setUser } from '../reducers/authReducer';
import { setMyNotes } from '../reducers/noteReducer';
import { postChangeName, postUserSetting } from '../utils/apiClient';

const SettingsPage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const defaultSettings = useSelector((state: GlobalState) => state.auth);

  const [isSettingChanged, setIsSettingChanged] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState(defaultSettings);

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
      setMessage("Successfully changed UserName.");
      setIsSettingChanged(true);
    } catch (error) {
      setMessage("Failed to change UserName.");
    }
  }

  const onSubmitOtherSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postUserSetting(
        settings.atcoderID,
        settings.codeforcesID,
        settings.yukicoderID,
        settings.aojID,
        settings.leetcodeID,
      );
      setMessage("Successfully changed User Settings.");
      setIsSettingChanged(true);
    } catch (error) {
      setMessage("Failed to change User Settings.");
    }
  }

  return (
    <Container>
      <InnerContainer>
        <h1>Settings</h1>
        <MessageContainer>
          {message}
        </MessageContainer>
        <UserNameContainer>
          <Form onSubmit={onSubmitUserName}>
            <Form.Group controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultSettings.userName}
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
                defaultValue={defaultSettings.atcoderID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, atcoderID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="codecorces-id">
              <Form.Label>Codeforces ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultSettings.codeforcesID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, codeforcesID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="yukicoder-id">
              <Form.Label>yukicoder ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultSettings.yukicoderID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, yukicoderID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="aoj-id">
              <Form.Label>AOJ ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultSettings.aojID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, aojID: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="leetcode-id">
              <Form.Label>LeetCode ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultSettings.leetcodeID}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSettings({...settings, leetcodeID: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </OtherSettingContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: calc(100vh - 64px);
  width: calc(100vw - 80px);
  max-width: 480px;
  top: 64px;
	left: 50%;
	transform: translateX(-50%);
`;

const MessageContainer = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: #4a8;
  height: 32px;
  padding-left: 20px;
`

const UserNameContainer = styled.div`
  padding: 20px;
  margin: 8px 0;
  border: solid thin #CCC;
  border-radius: 1em;
`;

const OtherSettingContainer = styled.div`
  padding: 20px;
  margin: 8px 0;
  border: solid thin #CCC;
  border-radius: 1em;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SettingsPage;