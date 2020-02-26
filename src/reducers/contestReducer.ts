import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ContestMap, ProblemMap, ContestToProblemMap, ContestState } from '../types';

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory(actionCreator);

const changeIsApiFetched = actionCreator<boolean>('ChangeIsApiFetched');

export const fetchAtCoderAPI = asyncCreator<void, { contests: ContestMap, problems: ProblemMap, contestToProblems: ContestToProblemMap }>(
  "FetchAtCoderAPI",
  async (params, dispatch, getState, { getFirebase, getFirestore }) => {
    const CONTEST_API_URL = "http://localhost:3000/atcoder/contests";
    const PROBLEM_API_URL = "http://localhost:3000/atcoder/problems";

    let contests: ContestMap = new Map();
    let problems: ProblemMap = new Map();
    let contestToProblems: ContestToProblemMap = new Map();

    await fetch(CONTEST_API_URL)
      .then(res => res.json())
      .then((array: any[]) => {
        // array.sort((a, b) => { return b.start_epoch_second - a.start_epoch_second });
        array.forEach(e => {
          contests.set(e.id, { title: e.title, startTimeSeconds: e.start_epoch_second });
        })
        return contests;
      })

    await fetch(PROBLEM_API_URL)
      .then(res => res.json())
      .then((array: any[]) => {
        array.forEach(e => {
          problems.set(e.id, { title: e.title, contestId: e.contest_id });
          if (!contestToProblems.has(e.contest_id)) {
            contestToProblems.set(e.contest_id, [e.id])
          } else {
            let ref = contestToProblems.get(e.contest_id);
            ref?.push(e.id);
          }
        })
      })
    dispatch(changeIsApiFetched(true));
    return { contests, problems, contestToProblems };
  })

const initialState: ContestState = {
  isApiFetched: false,
  contests: new Map(),
  problems: new Map(),
  contestToProblems: new Map()
};

const contestReducer = reducerWithInitialState(initialState)
  .case(changeIsApiFetched, (state, isApiFetched) => ({
    ...state,
    isApiFetched
  }))
  .case(fetchAtCoderAPI.async.done, (state, { result }) => ({
    ...state,
    ...result
  }))

export default contestReducer