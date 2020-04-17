import {
  Problem,
  Contest,
  ProblemMap,
  ContestMap,
  Note,
  ProblemNo,
} from "./apiResponse";

export type AuthState = {
  isLoggedIn: boolean;
  userName: string;
  atcoderID: string;
  codeforcesID: string;
  yukicoderID: string;
  aojID: string;
  leetcodeID: string;
};

export type ProblemState = {
  contests: Contest[];
  problems: Problem[];
  contestMap: ContestMap;
  problemMap: ProblemMap;
};

export type AppState = {
  showPreview: boolean;
  largeTableCategory: string;
  smallTableCategory: string;
  showTableInfoMessage: boolean;
  notesShowMode: string;
};

export type NoteState = {
  myNoteCount: number;
  myNotesMap: Map<ProblemNo, Note>; // <ProblemNo, Note>
};

export type GlobalState = {
  auth: AuthState;
  problem: ProblemState;
  app: AppState;
  note: NoteState;
};
