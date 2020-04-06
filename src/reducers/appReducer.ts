import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppState } from '../types/globalState';

const actionCreator = actionCreatorFactory();

export const setShowPreview = actionCreator<boolean>("SetShowPreview");
export const setLargeTableCategory = actionCreator<string>("SetLargeTableCategory");
export const setSmallTableCategory = actionCreator<string>("SetSmallTableCategory");
export const setShowTableInfoMessage = actionCreator<boolean>("SetShowTableInfoMessage");

const initialState: AppState = {
  showPreview: true,
  largeTableCategory: "atcoder",
  smallTableCategory: "abc",
  showTableInfoMessage: true,
};

const appReducer = reducerWithInitialState(initialState)
  .case(setShowPreview, (state, showPreview) => ({
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
  .case(setShowTableInfoMessage, (state, showTableInfoMessage) => ({
    ...state,
    showTableInfoMessage
  }))

export default appReducer