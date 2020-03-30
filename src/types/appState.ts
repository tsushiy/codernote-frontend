import { Problem, Contest, ProblemMap, Note, ProblemNo } from "../types/apiResponse";

export type AuthState = {
  isLoggedIn: boolean;
  userName: string;
};

export type ProblemState = {
  contests: Contest[];
  problems: Problem[];
  problemMap: ProblemMap;
};

export type EditorState = {
  showPreview: boolean;
};

export type NoteState = {
  myNoteCount: number;
  myNotesMap: Map<ProblemNo, Note>; // <ProblemNo, Note>
}

export type AppState = {
  auth: AuthState;
  problem: ProblemState;
  editor: EditorState;
  note: NoteState;
};