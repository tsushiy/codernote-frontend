import {
  CodeforcesSubmission,
  isAtCoderSubmission,
  isCodeforcesSubmission,
  isAOJSubmission,
  isYukiCoderSolvedProblem,
} from "../types/submissions";
import { fetchTypedArray } from "./apiClient";

export const getAtcoderSubmissions = async (atcoderID: string) => {
  const params = new URLSearchParams({ user: atcoderID });
  const url = `https://kenkoooo.com/atcoder/atcoder-api/results?${params}`;
  return fetchTypedArray(isAtCoderSubmission, url);
};

export const getCodeforcesSubmissions = async (codeforcesID: string) => {
  const params = new URLSearchParams({
    handle: codeforcesID,
    from: "1",
    count: "100000",
  });
  const url = `https://codeforces.com/api/user.status?${params}`;
  return fetch(url)
    .then((res) => res.json())
    .then(
      (obj: { status: string; result: CodeforcesSubmission[] }) => obj.result
    )
    .then((array) => array.filter(isCodeforcesSubmission));
};

export const getAOJSubmissions = async (aojID: string) => {
  const params = new URLSearchParams({ page: "0", size: "100000" });
  const url = `https://judgeapi.u-aizu.ac.jp/submission_records/users/${aojID}?${params}`;
  return fetchTypedArray(isAOJSubmission, url);
};

export const getYukicoderSolvedProblems = async (yukicoderID: string) => {
  const url = `https://yukicoder.me/api/v1/solved/id/${yukicoderID}`;
  return fetchTypedArray(isYukiCoderSolvedProblem, url);
};
