import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ProblemState } from '../types/appState';
import { fetchProblems, fetchContests } from '../utils/apiClient';
import { Problem, Contest, ProblemNo, ProblemMap, ContestMap } from "../types/apiResponse";

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const setContestsAndProblems = asyncCreator<void, {contests: Contest[], contestMap: ContestMap, problems: Problem[], problemMap: ProblemMap}>(
  "SetContestsAndProblems",
  async (params, dispatch, getState) => {
    const contests = await fetchContests();
    let contestMap = new Map<{domain: string, contestId: string}, Contest>();
    contests.forEach(v => {
      contestMap.set({domain: v.Domain, contestId: v.ContestID}, v);
    })
    const problems = await fetchProblems();
    let problemMap = new Map<ProblemNo, Problem>();
    problems.forEach(v => {
      problemMap.set(v.No, v);
    })
    return {contests, contestMap, problems, problemMap}
  })

const initialState: ProblemState = {
  contests: [],
  problems: [],
  contestMap: new Map<{domain: string, contestId: string}, Contest>(),
  problemMap: new Map<ProblemNo, Problem>(),
};

const problemReducer = reducerWithInitialState(initialState)
  .case(setContestsAndProblems.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))

export default problemReducer