import { Problem, Contest, ProblemMap, Note } from "../types/apiResponse";

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

export type AppState = {
  auth: AuthState;
  problem: ProblemState;
  editor: EditorState;
};