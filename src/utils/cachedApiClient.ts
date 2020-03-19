import { Problem, Contest, isContest, isProblem, ProblemNo, ProblemMap } from "../types/apiResponse";

const API_BASE_URL = 'https://apiv1.codernote.tsushiy.com';

const fetchTypedArray = async <T>(url: string, typeGuardFn: (obj: any) => obj is T) => {
  return fetch(url)
    .then(res =>res.json())
    .then((array: any[]) => array.filter(typeGuardFn))
};

const fetchProblems = () => fetchTypedArray(`${API_BASE_URL}/problems`, isProblem);
const fetchContests = () => fetchTypedArray(`${API_BASE_URL}/contests?order=-started`, isContest);

let CACHED_PROBLEMS: Promise<Problem[]> | undefined;
export const cachedProblemArray = async () => {
  if (CACHED_PROBLEMS === undefined) {
    CACHED_PROBLEMS = fetchProblems();
  }
  return CACHED_PROBLEMS;
};

let CACHED_CONTESTS: Promise<Contest[]> | undefined;
export const cachedContestArray = async () => {
  if (CACHED_CONTESTS === undefined) {
    CACHED_CONTESTS = fetchContests();
  }
  return CACHED_CONTESTS;
};

let CACHED_PROBLEM_MAP: Promise<ProblemMap> | undefined;
export const cachedProblemMap = async () => {
  if (CACHED_PROBLEM_MAP === undefined) {
    CACHED_PROBLEM_MAP = cachedProblemArray().then(array => 
        array.reduce((map, problem) => map.set(problem.No, problem), new Map<ProblemNo, Problem>())
    )
  }
  return CACHED_PROBLEM_MAP;
};
