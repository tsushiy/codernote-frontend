import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EditorState } from '../types/appState';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const changeShowPreview = actionCreator<boolean>("ChangeShowPreview");

const initialState: EditorState = {
  showPreview: false
};

const editorReducer = reducerWithInitialState(initialState)
  .case(changeShowPreview, (state, showPreview) => ({
    ...state,
    showPreview
  }))

export default editorReducer