import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthState } from '../types/appState';
import { postLogin } from '../utils/apiClient';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const setIsLoggedIn = actionCreator<boolean>('SetIsLoggedIn');
export const setUserName = actionCreator<string>('SetUserName');
export const setUserNone = actionCreator<void>('SetUserNone');

export const setUser = asyncCreator<void, void>(
  "SetUser",
  async (params, dispatch, getState) => {
    const user = await postLogin()
    if (user !== undefined) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUserName(user.Name));
    }
  })

const initialState: AuthState = {
  isLoggedIn: false,
  userName: ""
};

const authReducer = reducerWithInitialState(initialState)
  .case(setIsLoggedIn, (state, isLoggedIn) => ({
    ...state,
    isLoggedIn
  }))
  .case(setUserName, (state, userName) => ({
    ...state,
    userName
  }))
  .case(setUserNone, (state) => ({
    ...state,
    isLoggedIn: false,
    userName: ""
  }))
  .case(setUser.async.done, state => ({
    ...state,
  }))

export default authReducer