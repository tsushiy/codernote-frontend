import { Problem, Contest, ProblemMap } from "../types/apiResponse";

export type AuthState = {
  isLoggedIn: boolean;
  userName: string;
};

export type ContestState = {
  contests: Contest[];
  problems: Problem[];
  problemMap: ProblemMap;
};

export type EditorState = {
  showPreview: boolean;
};

export type AppState = {
  auth: AuthState;
  contest: ContestState;
  editor: EditorState;
};