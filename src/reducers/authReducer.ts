import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthState } from '../types/appState';
import { postLogin } from '../utils/apiClient';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const unsetUser = actionCreator<void>('UnsetUser');

export const setUser = asyncCreator<void, {isLoggedIn: boolean, userName: string}>(
  "SetUser",
  async (params, dispatch, getState) => {
    const user = await postLogin();
    return {
      isLoggedIn: true,
      userName: user ? user.Name : ""
    }
  })

const initialState: AuthState = {
  isLoggedIn: false,
  userName: ""
};

const authReducer = reducerWithInitialState(initialState)
  .case(unsetUser, state => ({
    ...state,
    isLoggedIn: false,
    userName: ""
  }))
  .case(setUser.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))

export default authReducer