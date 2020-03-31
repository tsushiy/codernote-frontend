import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AuthState } from '../types/appState';
import { postLogin, getUserSetting } from '../utils/apiClient';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const unsetUser = actionCreator<void>('UnsetUser');

export const setUser = asyncCreator<void, {isLoggedIn: boolean, userName: string}>(
  "SetUser",
  async (params, dispatch, getState) => {
    const user = await postLogin();
    const settings = await getUserSetting();
    return {
      isLoggedIn: true,
      userName: user ? user.Name : "",
      atcoderID: settings ? settings.AtCoderID : "",
      codeforcesID: settings ? settings.CodeforcesID : "",
      yukicoderID: settings ? settings.YukicoderID : "",
      aojID: settings ? settings.AOJID : "",
      leetcodeID: settings ? settings.LeetCodeID : "",
    }
  })

const initialState: AuthState = {
  isLoggedIn: false,
  userName: "",
  atcoderID: "",
  codeforcesID: "",
  yukicoderID: "",
  aojID: "",
  leetcodeID: "",
};

const authReducer = reducerWithInitialState(initialState)
  .case(unsetUser, state => ({
    ...state,
    isLoggedIn: false,
    userName: "",
    atcoderID: "",
    codeforcesID: "",
    yukicoderID: "",
    aojID: "",
    leetcodeID: "",
  }))
  .case(setUser.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))

export default authReducer