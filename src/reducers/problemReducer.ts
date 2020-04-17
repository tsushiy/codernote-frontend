import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProblemState } from "../types/globalState";
import { fetchProblems, fetchContests } from "../utils/apiClient";
import {
  Problem,
  Contest,
  ProblemNo,
  ProblemMap,
  ContestMap,
} from "../types/apiResponse";

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const setContestsAndProblems = asyncCreator<
  void,
  {
    contests: Contest[];
    contestMap: ContestMap;
    problems: Problem[];
    problemMap: ProblemMap;
  }
>("SetContestsAndProblems", async () => {
  let contests: Contest[] = [];
  let problems: Problem[] = [];
  const contestMap = new Map<string, Contest>();
  const problemMap = new Map<ProblemNo, Problem>();
  await Promise.all([
    fetchContests().then((c) => {
      contests = c;
      c.forEach((v) => {
        contestMap.set(v.Domain + v.ContestID, v);
      });
    }),
    fetchProblems().then((p) => {
      problems = p;
      p.forEach((v) => {
        problemMap.set(v.No, v);
      });
    }),
  ]);
  return { contests, contestMap, problems, problemMap };
});

const initialState: ProblemState = {
  contests: [],
  problems: [],
  contestMap: new Map<string, Contest>(),
  problemMap: new Map<ProblemNo, Problem>(),
};

const problemReducer = reducerWithInitialState(initialState).case(
  setContestsAndProblems.async.done,
  (state, { result }) => ({
    ...state,
    ...result,
  })
);

export default problemReducer;
