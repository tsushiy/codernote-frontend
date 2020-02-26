import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthState } from '../types';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const login = asyncCreator<void, void>(
  "Login",
  (params, dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((resonse: any) => {
        firestore.collection('users').doc(resonse.user.uid).set({}, { merge: true })
      }).catch((error: any) => {
        throw new Error(error.message);
      });
  })

export const logout = asyncCreator<void, void>(
  "Logout",
  (params, dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase.auth().signOut()
  })

const initialState: AuthState = {
  error: undefined
};

const authReducer = reducerWithInitialState(initialState)
  .case(login.async.failed, (state, { error }) => ({
    ...state,
    error
  }))
  .case(login.async.done, state => ({
    ...state,
    error: undefined
  }))

export default authReducer