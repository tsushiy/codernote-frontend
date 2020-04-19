import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProblemState, GlobalState } from "../types/globalState";
import { fetchProblems, fetchContests } from "../utils/apiClient";
import {
  getAtcoderSubmissions,
  getCodeforcesSubmissions,
  getAOJSubmissions,
  getYukicoderSolvedProblems,
} from "../utils/submissionFetcher";
import {
  formatAtcoderSubmission,
  formatCodeforcesSubmission,
  formatAOJSubmission,
  formatYukicoderSolvedProblem,
} from "../utils/submissionUtil";
import {
  Problem,
  Contest,
  ProblemNo,
  ProblemMap,
  ContestMap,
} from "../types/apiResponse";
import { Submission, SubmissionMap } from "../types/submissions";

const actionCreator = actionCreatorFactory();
const asyncCreator = asyncFactory<GlobalState>(actionCreator);

export const unsetSubmissions = actionCreator<void>("UnsetSubmissions");

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
  return { isProblemFetched: true, contests, contestMap, problems, problemMap };
});

export const setSubmissions = asyncCreator<
  void,
  {
    submissions: Submission[];
    submissionMap: SubmissionMap;
  }
>("SetSubmissions", async (params, dispatch, getState) => {
  const submissions: Submission[] = [];
  const submissionMap = new Map<ProblemNo, Submission[]>();
  const { auth, problem } = getState();
  const { atcoderID, codeforcesID, aojID, yukicoderID } = auth;
  const { problems, contestMap } = problem;

  const updateSubmissions = (submission: Submission, problemNo: ProblemNo) => {
    submissions.push(submission);
    const list = submissionMap.get(problemNo);
    if (list === undefined) {
      submissionMap.set(problemNo, [submission]);
    } else {
      list.push(submission);
    }
  };

  await Promise.allSettled([
    (async () => {
      if (atcoderID) {
        const atcoderMap = new Map<string, ProblemNo>();
        problems
          .filter((v) => v.Domain === "atcoder")
          .forEach((v) => {
            atcoderMap.set(v.ProblemID, v.No);
          });
        await getAtcoderSubmissions(atcoderID).then((list) => {
          list.forEach((v) => {
            let problemNo = atcoderMap.get(v.problem_id);
            if (problemNo === undefined) problemNo = 0;
            const submission = formatAtcoderSubmission(v, problemNo);
            updateSubmissions(submission, problemNo);
          });
        });
      }
    })(),
    (async () => {
      if (codeforcesID) {
        const codeforcesMap = new Map<string, ProblemNo>();
        const codeforcesMapKey = (title: string, contestID: string) => {
          const problemTitle = title;
          const contest = contestMap.get("codeforces" + contestID);
          const epoch = contest ? String(contest.StartTimeSeconds) : "0";
          return problemTitle + epoch;
        };
        problems
          .filter((v) => v.Domain === "codeforces")
          .forEach((v) => {
            codeforcesMap.set(codeforcesMapKey(v.Title, v.ContestID), v.No);
          });
        await getCodeforcesSubmissions(codeforcesID).then((list) => {
          list.forEach((v) => {
            let problemNo = codeforcesMap.get(
              codeforcesMapKey(v.problem.name, String(v.contestId))
            );
            if (problemNo === undefined) problemNo = 0;
            const submission = formatCodeforcesSubmission(v, problemNo);
            updateSubmissions(submission, problemNo);
          });
        });
      }
    })(),
    (async () => {
      if (aojID) {
        const aojMap = new Map<string, ProblemNo>();
        problems
          .filter((v) => v.Domain === "aoj")
          .forEach((v) => {
            aojMap.set(v.ProblemID, v.No);
          });
        await getAOJSubmissions(aojID).then((list) => {
          list.forEach((v) => {
            let problemNo = aojMap.get(v.problemId);
            if (problemNo === undefined) problemNo = 0;
            const submission = formatAOJSubmission(v, problemNo);
            updateSubmissions(submission, problemNo);
          });
        });
      }
    })(),
    (async () => {
      if (yukicoderID) {
        const yukicoderMap = new Map<string, ProblemNo>();
        problems
          .filter((v) => v.Domain === "yukicoder")
          .forEach((v) => {
            yukicoderMap.set(v.ProblemID, v.No);
          });
        await getYukicoderSolvedProblems(yukicoderID).then((list) => {
          list.forEach((v) => {
            let problemNo = yukicoderMap.get(String(v.ProblemId));
            if (problemNo === undefined) problemNo = 0;
            const submission = formatYukicoderSolvedProblem(v, problemNo);
            updateSubmissions(submission, problemNo);
          });
        });
      }
    })(),
  ]);

  submissionMap.forEach((v) => {
    v.sort((a, b) => b.date - a.date);
  });
  submissions.sort((a, b) => b.date - a.date);

  return { submissions, submissionMap };
});

const initialState: ProblemState = {
  isProblemFetched: false,
  contests: [],
  problems: [],
  contestMap: new Map<string, Contest>(),
  problemMap: new Map<ProblemNo, Problem>(),
  submissions: [],
  submissionMap: new Map<ProblemNo, Submission[]>(),
};

const problemReducer = reducerWithInitialState(initialState)
  .case(unsetSubmissions, (state) => ({
    ...state,
    submissions: [],
    submissionMap: new Map<ProblemNo, Submission[]>(),
  }))
  .case(setContestsAndProblems.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }))
  .case(setSubmissions.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }));

export default problemReducer;
