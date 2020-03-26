import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { login, logout } from './reducers/authReducer';
import { initContestsAndProblems } from './reducers/contestReducer';
import NavigationBar from './containers/NavigationBar';
import ContestTable from './containers/Table';
import EditorContainer from './containers/Editor';
import firebase from './utils/firebase';

type WrapperProps = {
  children: ReactElement
}

const InitWrapper: React.FC<WrapperProps> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initContestsAndProblems());
  }, [])

  return props.children
}

const AuthWrapper: React.FC<WrapperProps> = props => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [isLoggedIn])

  return props.children
}

const App: React.FC<{}> = () => {
  return (
    <InitWrapper>
      <Router>
        <AuthWrapper>
          <div className="App">
            <NavigationBar />
            <Switch>
              <Route exact path='/'>
                <Redirect to='/table' />
              </Route>
              <Route exact path='/table' component={ContestTable} />
              <Route exact path='/my/:problemNo' component={EditorContainer} />
            </Switch>
          </div>
        </AuthWrapper>
      </Router>
    </InitWrapper>
  );
}

export default App;
