import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { AppState } from "../types/globalState";

const actionCreator = actionCreatorFactory();

export const setEditorPreviewMode = actionCreator<string>(
  "SetEditorPreviewMode"
);
export const setLargeTableCategory = actionCreator<string>(
  "SetLargeTableCategory"
);
export const setSmallTableCategory = actionCreator<string>(
  "SetSmallTableCategory"
);
export const setNotesShowMode = actionCreator<string>("SetNotesShowMode");

const initialState: AppState = {
  editorPreviewMode: "both",
  largeTableCategory: "atcoder",
  smallTableCategory: "abc-1999",
  notesShowMode: "summary",
};

const appReducer = reducerWithInitialState(initialState)
  .case(setEditorPreviewMode, (state, editorPreviewMode) => ({
    ...state,
    editorPreviewMode,
  }))
  .case(setLargeTableCategory, (state, largeTableCategory) => ({
    ...state,
    largeTableCategory,
  }))
  .case(setSmallTableCategory, (state, smallTableCategory) => ({
    ...state,
    smallTableCategory,
  }))
  .case(setNotesShowMode, (state, notesShowMode) => ({
    ...state,
    notesShowMode,
  }));

export default appReducer;
