export type AuthState = {
  error: any;
};

export type EditorState = {
  showPreview: boolean;
  error: any;
};

export type Contest = {
  title: string;
  startTimeSeconds: number;
};

export type Problem = {
  title: string;
  contestId: string;
};

export type ContestMap = Map<string, Contest>; // <id, Contest>
export type ProblemMap = Map<string, Problem>; // <id, Problem>
export type ContestToProblemMap = Map<string, string[]> // <id, id[]>

export type ContestState = {
  isApiFetched: boolean;
  contests: ContestMap;
  problems: ProblemMap;
  contestToProblems: ContestToProblemMap;
};

export type AppState = {
  auth: AuthState;
  editor: EditorState;
  contest: ContestState;
  firebase: any;
  firestore: any;
};