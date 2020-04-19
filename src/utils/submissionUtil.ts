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
    date: Math.floor((new Date(submission.Date).getTime()) / 1000),
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
