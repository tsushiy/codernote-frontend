import {
  Submission,
  AtCoderSubmission,
  CodeforcesSubmission,
  AOJSubmission,
  YukiCoderSolvedProblem,
} from "../types/submissions";
import { ProblemNo } from "../types/apiResponse";

export const formatAtcoderSubmission = (
  submission: AtCoderSubmission,
  problemNo: ProblemNo
): Submission => {
  return {
    id: submission.id,
    problemID: submission.problem_id,
    contestID: submission.contest_id,
    status: submission.result,
    language: submission.language,
    date: submission.epoch_second,
    domain: "atcoder",
    problemNo,
  };
};

export const formatCodeforcesSubmission = (
  submission: CodeforcesSubmission,
  problemNo: ProblemNo
): Submission => {
  return {
    id: submission.id,
    problemID: submission.problem.index,
    contestID: String(submission.contestId),
    status: codeforcesStatus(submission.verdict),
    language: submission.programmingLanguage,
    date: submission.creationTimeSeconds,
    domain: "codeforces",
    problemNo,
  };
};

export const formatAOJSubmission = (
  submission: AOJSubmission,
  problemNo: ProblemNo
): Submission => {
  return {
    id: submission.judgeId,
    problemID: submission.problemId,
    contestID: "",
    status: AOJStatus(submission.status),
    language: submission.language,
    date: Math.floor(submission.submissionDate / 1000),
    domain: "aoj",
    problemNo,
  };
};

export const formatYukicoderSolvedProblem = (
  submission: YukiCoderSolvedProblem,
  problemNo: ProblemNo
): Submission => {
  return {
    id: 0,
    problemID: String(submission.ProblemId),
    contestID: "",
    status: "AC",
    language: "",
    date: Math.floor(new Date(submission.Date).getTime() / 1000),
    domain: "yukicoder",
    problemNo,
  };
};

const codeforcesStatus = (verdict: string) => {
  switch (verdict) {
    case "OK":
      return "AC";
    case "WRONG_ANSWER":
      return "WA";
    case "COMPILATION_ERROR":
      return "CE";
    case "RUNTIME_ERROR":
      return "RE";
    case "TIME_LIMIT_EXCEEDED":
      return "TLE";
    case "MEMORY_LIMIT_EXCEEDED":
      return "MLE";
    default:
      return verdict;
  }
};

const AOJStatus = (status: number) => {
  switch (status) {
    case 0:
      return "CE";
    case 1:
      return "WA";
    case 2:
      return "TLE";
    case 3:
      return "MLE";
    case 4:
      return "AC";
    case 5:
      return "WAITING";
    case 6:
      return "OUTPUTLIMIT";
    case 7:
      return "RE";
    case 8:
      return "PE";
    case 9:
      return "RUNNING";
    default:
      return "";
  }
};

export const isAccepted = (submission: Submission) => {
  return submission.status === "AC";
};

export const acceptedOrLatestSubmission = (
  submissions: Submission[] | undefined
) => {
  if (submissions === undefined) {
    return null;
  }
  const accepted = submissions.filter((v) => isAccepted(v));
  if (accepted.length > 0) {
    return accepted[0];
  } else {
    return submissions[0];
  }
};

export const submissionUrl = (submission: Submission, aojID: string) => {
  switch (submission.domain) {
    case "atcoder":
      return `https://atcoder.jp/contests/${submission.contestID}/submissions/${submission.id}`;
    case "codeforces":
      return `https://codeforces.com/contest/${submission.contestID}/submission/${submission.id}`;
    case "aoj":
      return `https://onlinejudge.u-aizu.ac.jp/solutions/problem/${submission.problemID}/review/${submission.id}/${aojID}/${submission.language}`;
    default:
      return "";
  }
};
