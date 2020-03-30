import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NoteState } from '../types/appState';
import { Note, ProblemNo } from "../types/apiResponse";
import { getMyNotes } from '../utils/apiClient';
import { AppState } from '../types/appState';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory<AppState>(actionCreator);

export const unsetMyNotes = actionCreator<void>('UnsetMyNotes');

export const setMyNotes = asyncCreator<{}, {myNoteCount: number, myNotesMap: Map<ProblemNo, Note>}>(
  "SetMyNotes",
  async (params, dispatch, getState) => {
    const NoteList = await getMyNotes("", "", 50000);
    let myNotesMap = new Map<ProblemNo, Note>();
    NoteList?.Notes.forEach(v => myNotesMap.set(v.Problem.No, v))
    return {
      myNoteCount: NoteList ? NoteList.Count : 0,
      myNotesMap
    }
  })

export const setMyNote = asyncCreator<{problemNo: ProblemNo, newNote: Note}, {myNotesMap: Map<ProblemNo, Note>}>(
  "SetMyNote",
  async ({problemNo, newNote}, dispatch, getState) => {
    const { note } = getState()
    let { myNotesMap } = note;
    myNotesMap.set(problemNo, newNote)
    return {
      myNotesMap
    }
  })

const initialState: NoteState = {
  myNoteCount: 0,
  myNotesMap: new Map<ProblemNo, Note>()
};

const noteReducer = reducerWithInitialState(initialState)
  .case(unsetMyNotes, state => ({
    ...state,
    myNoteCount: 0,
    myNotesMap: new Map<ProblemNo, Note>()
  }))
  .case(setMyNotes.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))
  .case(setMyNote.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))

export default noteReducer