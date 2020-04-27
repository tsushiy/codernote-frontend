import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "./utils/firebase";
import { setUser, unsetUser } from "./reducers/authReducer";
import {
  setContestsAndProblems,
  setSubmissions,
  unsetSubmissions,
} from "./reducers/problemReducer";
import { setMyNotes, unsetMyNotes } from "./reducers/noteReducer";
import { GlobalState } from "./types/globalState";
import withTracker from "./GATracker";
import NavigationBar from "./components/NavigationBar";
import AppFooter from "./components/AppFooter";
import TablePage from "./components/Table";
import EditorPage from "./components/Editor";
import NotesPage from "./components/Notes";
import NotePage from "./components/Note";
import SubmissionsPage from "./components/Submissions";
import SettingsPage from "./components/Settings";
import HelpPage from "./components/Help";

type WrapperProps = {
  children: React.ReactElement;
};

const InitWrapper: React.FC<WrapperProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContestsAndProblems());
  }, [dispatch]);

  return props.children;
};

const AuthWrapper: React.FC<WrapperProps> = (props) => {
  const dispatch = useDispatch();
  const { isProblemFetched } = useSelector(
    (state: GlobalState) => state.problem
  );
  const {
    isLoggedIn,
    atcoderID,
    codeforcesID,
    yukicoderID,
    aojID,
  } = useSelector((state: GlobalState) => state.auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser());
        dispatch(setMyNotes());
      } else {
        dispatch(unsetUser());
        dispatch(unsetMyNotes());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isProblemFetched) return;
    if (isLoggedIn) {
      dispatch(setSubmissions());
    } else {
      dispatch(unsetSubmissions());
    }
  }, [
    dispatch,
    isProblemFetched,
    isLoggedIn,
    atcoderID,
    codeforcesID,
    yukicoderID,
    aojID,
  ]);

  return props.children;
};

const App: React.FC<{}> = () => {
  return (
    <InitWrapper>
      <AuthWrapper>
        <Router>
          <NavigationBar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/table" />
            </Route>
            <Route exact path="/table" component={withTracker(TablePage)} />
            <Route exact path="/notes" component={withTracker(NotesPage)} />
            <Route exact path="/mynotes" component={withTracker(NotesPage)} />
            <Route
              exact
              path="/notes/:noteId"
              component={withTracker(NotePage)}
            />
            <Route
              exact
              path="/submissions"
              component={withTracker(SubmissionsPage)}
            />
            <Route
              exact
              path="/edit/:problemNo"
              component={withTracker(EditorPage)}
            />
            <Route
              exact
              path="/settings"
              component={withTracker(SettingsPage)}
            />
            <Route exact path="/help" component={withTracker(HelpPage)} />
          </Switch>
          <Switch>
            <Route exact path="/edit/:problemNo" />
            <Route path="/" component={AppFooter} />
          </Switch>
        </Router>
      </AuthWrapper>
    </InitWrapper>
  );
};

export default App;
