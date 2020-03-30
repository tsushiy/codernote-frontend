import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { setUser, unsetUser } from './reducers/authReducer';
import { initContestsAndProblems } from './reducers/problemReducer';
import { setMyNotes, unsetMyNotes } from './reducers/noteReducer';
import NavigationBar from './components/NavigationBar';
import ContestTable from './components/Table';
import Editor from './components/Editor';
import NotesPage from './components/Notes';
import NotePage from './components/Note';
import firebase from './utils/firebase';

type WrapperProps = {
  children: ReactElement
}

const InitWrapper: React.FC<WrapperProps> = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initContestsAndProblems());
  }, [dispatch])
  return props.children
}

const AuthWrapper: React.FC<WrapperProps> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser());
        dispatch(setMyNotes());
      } else {
        dispatch(unsetUser());
        dispatch(unsetMyNotes());
      }
    })
  }, [dispatch])

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
              <Route exact path='/notes' render={props => <NotesPage isMyNotes={false} {...props} />}/>
              <Route exact path='/notes/:noteId' component={NotePage} />
              <Route exact path='/my/notes' render={props => <NotesPage isMyNotes={true} {...props} />}/>
              <Route exact path='/my/:problemNo' component={Editor} />
            </Switch>
          </div>
        </AuthWrapper>
      </Router>
    </InitWrapper>
  );
}

export default App;
