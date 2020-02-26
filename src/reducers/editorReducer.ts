import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EditorState } from '../types';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const changeShowPreview = actionCreator<boolean>("ChangeShowPreview");

export const save = asyncCreator<{ docId: string, text: string }, void>(
  "Save",
  ({ docId, text }, dispatch, getState: any, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const uid = getState().firebase.auth.uid;
    firestore.collection('users').doc(uid).update({
      [docId]: text
    }).then(() => {
    }).catch((error: any) => {
      throw new Error(error.message);
    })
  });

const initialState: EditorState = {
  showPreview: false,
  error: undefined
};

const editorReducer = reducerWithInitialState(initialState)
  .case(changeShowPreview, (state, showPreview) => ({
    ...state,
    showPreview
  }))
  .case(save.async.failed, (state, { error }) => ({
    ...state
  }))
  .case(save.async.done, state => ({
    ...state
  }));

export default editorReducer