import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthState } from '../types/appState';
import firebase from '../utils/firebase';
import { postLogin } from '../utils/apiClient';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const setIsLoggedIn = actionCreator<boolean>('SetIsLoggedIn');
export const setUserName = actionCreator<string>('SetUserName');

export const login = asyncCreator<void, void>(
  "Login",
  (params, dispatch, getState) => {
    firebase.auth().currentUser?.getIdToken()
      .then(() => postLogin())
      .then(user => {
        if (user !== undefined) {
          console.log(user);
          dispatch(setIsLoggedIn(true));
          dispatch(setUserName(user.Name));
        }
      });
  })

export const logout = asyncCreator<void, void>(
  "Logout",
  (params, dispatch, getState) => {
    console.log("logout");
    dispatch(setIsLoggedIn(false));
    dispatch(setUserName(""));
  })

const initialState: AuthState = {
  isLoggedIn: false,
  name: ""
};

const authReducer = reducerWithInitialState(initialState)
  .case(setIsLoggedIn, (state, isLoggedIn) => ({
    ...state,
    isLoggedIn
  }))
  .case(setUserName, (state, name) => ({
    ...state,
    name
  }))
  .case(login.async.done, state => ({
    ...state,
  }))
  .case(logout.async.done, state => ({
    ...state,
  }))

export default authReducer