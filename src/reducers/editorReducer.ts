import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EditorState } from '../types/appState';

const actionCreator = actionCreatorFactory();

export const changeShowPreview = actionCreator<boolean>("ChangeShowPreview");

const initialState: EditorState = {
  showPreview: true
};

const editorReducer = reducerWithInitialState(initialState)
  .case(changeShowPreview, (state, showPreview) => ({
    ...state,
    showPreview
  }))

export default editorReducer