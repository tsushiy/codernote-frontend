import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ContestState } from '../types/appState';
import { fetchProblems, fetchContests } from '../utils/apiClient';
import { Problem, Contest, ProblemNo, ProblemMap } from "../types/apiResponse";

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

export const setContests = actionCreator<Contest[]>('SetContests');
export const setProblems = actionCreator<Problem[]>('SetProblems');
export const setProblemMap = actionCreator<ProblemMap>('SetProblemMap');

export const initContestsAndProblems = asyncCreator<void, void>(
  "InitContestsAndProblems",
  (params, dispatch, getState) => {
    fetchContests()
      .then(contests => dispatch(setContests(contests)));
    fetchProblems()
      .then(problems => {
        dispatch(setProblems(problems));
        dispatch(setProblemMap(problems.reduce((map, problem) => 
          map.set(problem.No, problem), new Map<ProblemNo, Problem>())))
      });
  })

const initialState: ContestState = {
  contests: [],
  problems: [],
  problemMap: new Map<ProblemNo, Problem>()
};

const contestReducer = reducerWithInitialState(initialState)
  .case(setContests, (state, contests) => ({
    ...state,
    contests
  }))
  .case(setProblems, (state, problems) => ({
    ...state,
    problems
  }))
  .case(setProblemMap, (state, problemMap) => ({
    ...state,
    problemMap
  }))
  .case(initContestsAndProblems.async.done, state => ({
    ...state,
  }))

export default contestReducer