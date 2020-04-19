import { ProblemNo } from "./apiResponse";

export type SubmissionMap = Map<ProblemNo, Submission[]>;

export type Submission = {
  id: number;
  problemID: string;
  contestID: string;
  status: string;
  language: string;
  date: number;
  domain: string;
  problemNo: number;
};

export type AtCoderSubmission = {
  readonly id: number;
  readonly epoch_second: number;
  readonly problem_id: string;
  readonly contest_id: string;
  readonly user_id: string;
  readonly language: string;
  readonly point: number;
  readonly length: number;
  readonly result: string;
  readonly execution_time: number | null;
};

export type CodeforcesSubmission = {
  readonly id: number;
  readonly contestId: number;
  readonly creationTimeSeconds: number;
  readonly relativeTimeSeconds: number;
  readonly programmingLanguage: string;
  readonly verdict: string;
  readonly testset: string;
  readonly passedTestCount: number;
  readonly timeConsumedMillis: number;
  readonly memoryConsumedBytes: number;
  readonly problem: {
    readonly contestId: number;
    readonly index: string;
    readonly name: string;
    readonly type: string;
    readonly points: number;
    readonly rating: number;
    readonly tags: string[];
  };
  readonly author: {
    readonly contestId: number;
    readonly members: {
      readonly handle: string;
    }[];
    readonly participantType: string;
    readonly ghost: boolean;
    readonly room: number;
    readonly startTimeSeconds: number;
  };
};

export type AOJSubmission = {
  readonly judgeId: number;
  readonly judgeType: number;
  readonly userId: string;
  readonly problemId: string;
  readonly submissionDate: number;
  readonly language: string;
  readonly status: number;
  readonly cpuTime: number;
  readonly memory: number;
  readonly codeSize: number;
  readonly accuracy: string;
  readonly judgeDate: number;
  readonly score: number;
};

export type YukiCoderSolvedProblem = {
  readonly No: number;
  readonly ProblemId: number;
  readonly Title: string;
  readonly AuthorId: number;
  readonly TesterId: number;
  readonly Level: number;
  readonly ProblemType: number;
  readonly Tags: string;
  readonly Date: string;
};

export const isAtCoderSubmission = (
  obj: AtCoderSubmission
): obj is AtCoderSubmission =>
  typeof obj.id === "number" &&
  typeof obj.epoch_second === "number" &&
  typeof obj.problem_id === "string" &&
  typeof obj.contest_id === "string" &&
  typeof obj.user_id === "string" &&
  typeof obj.language === "string" &&
  typeof obj.point === "number" &&
  typeof obj.length === "number" &&
  typeof obj.result === "string" &&
  (typeof obj.execution_time === "number" || obj.execution_time === null);

export const isCodeforcesSubmission = (
  obj: CodeforcesSubmission
): obj is CodeforcesSubmission =>
  typeof obj.id === "number" &&
  typeof obj.contestId === "number" &&
  typeof obj.creationTimeSeconds === "number" &&
  typeof obj.relativeTimeSeconds === "number" &&
  typeof obj.programmingLanguage === "string" &&
  typeof obj.verdict === "string" &&
  typeof obj.testset === "string" &&
  typeof obj.passedTestCount === "number" &&
  typeof obj.timeConsumedMillis === "number" &&
  typeof obj.memoryConsumedBytes === "number" &&
  typeof obj.problem === "object" &&
  typeof obj.problem.contestId === "number" &&
  typeof obj.problem.index === "string" &&
  typeof obj.problem.name === "string" &&
  typeof obj.problem.type === "string" &&
  typeof obj.problem.points === "number" &&
  typeof obj.problem.rating === "number";

export const isAOJSubmission = (obj: AOJSubmission): obj is AOJSubmission =>
  typeof obj.judgeId === "number" &&
  typeof obj.judgeType === "number" &&
  typeof obj.userId === "string" &&
  typeof obj.problemId === "string" &&
  typeof obj.submissionDate === "number" &&
  typeof obj.language === "string" &&
  typeof obj.status === "number" &&
  typeof obj.cpuTime === "number" &&
  typeof obj.memory === "number" &&
  typeof obj.codeSize === "number" &&
  typeof obj.accuracy === "string" &&
  typeof obj.judgeDate === "number" &&
  typeof obj.score === "number";

export const isYukiCoderSolvedProblem = (
  obj: YukiCoderSolvedProblem
): obj is YukiCoderSolvedProblem =>
  typeof obj.No === "number" &&
  typeof obj.ProblemId === "number" &&
  typeof obj.Title === "string" &&
  typeof obj.AuthorId === "number" &&
  typeof obj.TesterId === "number" &&
  typeof obj.Level === "number" &&
  typeof obj.ProblemType === "number" &&
  typeof obj.Tags === "string" &&
  typeof obj.Date === "string";
