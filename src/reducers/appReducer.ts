import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppState } from '../types/globalState';

const actionCreator = actionCreatorFactory();

export const changeShowPreview = actionCreator<boolean>("ChangeShowPreview");
export const setLargeTableCategory = actionCreator<string>("SetLargeTableCategory");
export const setSmallTableCategory = actionCreator<string>("SetSmallTableCategory");

const initialState: AppState = {
  showPreview: true,
  largeTableCategory: "atcoder",
  smallTableCategory: "abc",
};

const appReducer = reducerWithInitialState(initialState)
  .case(changeShowPreview, (state, showPreview) => ({
    ...state,
    showPreview
  }))
  .case(setLargeTableCategory, (state, largeTableCategory) => ({
    ...state,
    largeTableCategory
  }))
  .case(setSmallTableCategory, (state, smallTableCategory) => ({
    ...state,
    smallTableCategory
  }))

export default appReducer