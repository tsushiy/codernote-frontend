import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { NoteState } from "../types/globalState";
import { Note, ProblemNo } from "../types/apiResponse";
import { getMyNotes } from "../utils/apiClient";
import { GlobalState } from "../types/globalState";

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory<GlobalState>(actionCreator);

export const unsetMyNotes = actionCreator<void>("UnsetMyNotes");

export const setMyNotes = asyncCreator<
  void,
  { myNoteCount: number; myNotesMap: Map<ProblemNo, Note> }
>("SetMyNotes", async () => {
  const limit = 40000;
  const NoteList = await getMyNotes({ limit });
  const myNotesMap = new Map<ProblemNo, Note>();
  NoteList?.Notes.forEach((v) => myNotesMap.set(v.Problem.No, v));
  return {
    myNoteCount: NoteList ? NoteList.Count : 0,
    myNotesMap,
  };
});

export const setMyNote = asyncCreator<
  { problemNo: ProblemNo; newNote: Note },
  { myNotesMap: Map<ProblemNo, Note> }
>("SetMyNote", async ({ problemNo, newNote }, dispatch, getState) => {
  const { note } = getState();
  const { myNotesMap } = note;
  myNotesMap.set(problemNo, newNote);
  return {
    myNotesMap,
  };
});

export const unsetMyNote = asyncCreator<
  { problemNo: ProblemNo },
  { myNotesMap: Map<ProblemNo, Note> }
>("UnsetMyNote", async ({ problemNo }, dispatch, getState) => {
  const { note } = getState();
  const { myNotesMap } = note;
  myNotesMap.delete(problemNo);
  return {
    myNotesMap,
  };
});

const initialState: NoteState = {
  myNoteCount: 0,
  myNotesMap: new Map<ProblemNo, Note>(),
};

const noteReducer = reducerWithInitialState(initialState)
  .case(unsetMyNotes, (state) => ({
    ...state,
    myNoteCount: 0,
    myNotesMap: new Map<ProblemNo, Note>(),
  }))
  .case(setMyNotes.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }))
  .case(setMyNote.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }))
  .case(unsetMyNote.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }));

export default noteReducer;
