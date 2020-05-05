import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Toast, Alert } from "react-bootstrap";
import styled from "styled-components";
import { MainContainer, messageColor } from "../Styles";
import { GlobalState } from "../../types/globalState";
import { setUser } from "../../reducers/authReducer";
import { setMyNotes } from "../../reducers/noteReducer";
import { postChangeName, postUserSetting } from "../../utils/apiClient";

const SettingsPage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const initialSettings = useSelector((state: GlobalState) => state.auth);
  const { isLoggedIn } = initialSettings;

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    setSettings(Object.assign({}, initialSettings));
  }, [isLoggedIn, initialSettings]);

  useEffect(() => {
    let timerId: number;
    if (!showMessage) {
      timerId = setTimeout(() => setMessage(""), 200);
    }
    return () => clearTimeout(timerId);
  }, [showMessage]);

  const dispatchSettings = () => {
    dispatch(setUser());
    dispatch(setMyNotes());
  };

  const setAndShowMessage = (message: string) => {
    setMessage(message);
    setShowMessage(true);
  };

  const onSubmitUserName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postChangeName(settings.userName)
      .then(() => {
        dispatchSettings();
        setAndShowMessage("Successfully changed UserName.");
      })
      .catch(() => {
        setAndShowMessage("Failed to change UserName.");
      });
  };

  const onSubmitOtherSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUserSetting({ ...settings })
      .then(() => {
        dispatchSettings();
        setAndShowMessage("Successfully changed User Settings.");
      })
      .catch(() => {
        setAndShowMessage("Failed to change User Settings.");
      });
  };

  return (
    <MainContainer>
      <Container>
        <h1>Settings</h1>
        {!isLoggedIn && (
          <Alert
            variant="warning"
            style={{ padding: "10px 16px", marginBottom: "10px" }}
          >
            You must be logged in to change settings.
          </Alert>
        )}
        <StyledToast
          style={{ backgroundColor: messageColor(message) }}
          onClose={() => setShowMessage(false)}
          show={showMessage}
          delay={3000}
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </StyledToast>
        <UserNameContainer>
          <Form onSubmit={onSubmitUserName}>
            <Form.Group controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, userName: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                UserName must be unique and between 3 and 30 alphanumeric
                characters.
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, atcoderID: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="codecorces-id">
              <Form.Label>Codeforces ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.codeforcesID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, codeforcesID: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="yukicoder-id">
              <Form.Label>yukicoder ID (Not Username)</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.yukicoderID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, yukicoderID: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                <React.Fragment>
                  {`https://yukicoder.me/users/{yukicoderID}`}
                  <br />
                  {
                    "Only the information about solved problems is fetched for yukicoder."
                  }
                </React.Fragment>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="aoj-id">
              <Form.Label>AOJ ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.aojID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, aojID: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="leetcode-id">
              <Form.Label>LeetCode ID</Form.Label>
              <Form.Control
                type="text"
                defaultValue={settings.leetcodeID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSettings({ ...settings, leetcodeID: e.target.value })
                }
                disabled
              />
              <Form.Text className="text-muted">Currently disabled.</Form.Text>
            </Form.Group>
            <Form.Text>
              {"These settings are used for fetching your submissions."}
              <br />
              {
                "It takes longer to load if you have a large number of submissions."
              }
            </Form.Text>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </OtherSettingContainer>
      </Container>
    </MainContainer>
  );
};

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
    color: #fff;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 0.5em;
  }
`;

const UserNameContainer = styled.div`
  padding: 20px;
  margin: 16px 0;
  border: solid thin #ccc;
  border-radius: 1em;
`;

const OtherSettingContainer = styled.div`
  padding: 20px;
  margin: 16px 0;
  border: solid thin #ccc;
  border-radius: 1em;
`;

export default SettingsPage;
