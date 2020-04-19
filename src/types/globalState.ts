import {
  Problem,
  Contest,
  ProblemMap,
  ContestMap,
  Note,
  ProblemNo,
} from "./apiResponse";

import { Submission } from "./submissions";

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
  isProblemFetched: boolean;
  contests: Contest[];
  problems: Problem[];
  contestMap: ContestMap;
  problemMap: ProblemMap;
  submissions: Submission[];
  submissionMap: Map<ProblemNo, Submission[]>;
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
