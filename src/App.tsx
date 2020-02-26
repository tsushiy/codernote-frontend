import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './containers/NavigationBar';
import ContestTable from './containers/ContestTable';
import EditorContainer from './containers/EditorContainer';
import { fetchAtCoderAPI } from './reducers/contestReducer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector<any>(state => state.firebase.auth);

  useEffect(() => {
    dispatch(fetchAtCoderAPI())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/atcoder' />
          </Route>
          <Route exact path='/:host' component={ContestTable} />
          {auth.uid !== undefined
            ? <Route exact path='/:host/:id' component={EditorContainer} />
            : null}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
