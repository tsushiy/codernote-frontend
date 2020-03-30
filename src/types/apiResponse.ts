export type ProblemNo = number;

export type ProblemMap = Map<ProblemNo, Problem>;
export type ContestMap = Map<{domain: string, contestId: string}, Contest>;

export type User = {
  readonly UserID: string;
  readonly Name: string;
  readonly CreatedAt: string;
  readonly UpdatedAt: string;
}

export type UserDetail = {
  readonly UserID: string;
  readonly AtCoderID: string;
  readonly CodeforcesID: string;
  readonly YukicoderID: string;
  readonly AOJID: string;
  readonly LeetCodeID: string;
}

export type Problem = {
  readonly No: number;
  readonly Domain: string;
  readonly ProblemID: string;
  readonly ContestID: string;
  readonly Title: string;
  readonly Slug: string;
  readonly FrontendID: string;
  readonly Difficulty: string;
};

export type Contest = {
  readonly No: number;
  readonly Domain: string;
  readonly ContestID: string;
  readonly Title: string;
  readonly StartTimeSeconds: number;
  readonly DurationSeconds: number;
  readonly Rated: string;
  readonly ProblemNoList: number[];
}

export type Note = {
  readonly ID: string;
  readonly CreatedAt: string;
  readonly UpdatedAt: string;
  readonly Text: string;
  readonly Problem: Problem;
  readonly User: User;
  readonly Public: number;
}

export type NoteList = {
  readonly Count: number;
  readonly Notes: Note[];
}

export type TagList = {
  readonly Tags: string[];
}

export const isUser = (user: any): user is User =>
typeof user.UserID === "string" &&
typeof user.Name === "string" &&
typeof user.CreatedAt === "string" &&
typeof user.UpdatedAt === "string";

export const isUserDetail = (userDetail: any): userDetail is UserDetail =>
typeof userDetail.UserID === "string" &&
typeof userDetail.AtCoderID === "string" &&
typeof userDetail.CodeforcesID === "string" &&
typeof userDetail.YukicoderID === "string" &&
typeof userDetail.AOJID === "string" &&
typeof userDetail.LeetCodeID === "string";

export const isProblem = (problem: any): problem is Problem =>
  typeof problem.No === "number" &&
  typeof problem.Domain === "string" &&
  typeof problem.ProblemID === "string" &&
  typeof problem.ContestID === "string" &&
  typeof problem.Title === "string" &&
  typeof problem.Slug === "string" &&
  typeof problem.FrontendID === "string" &&
  typeof problem.Difficulty === "string";

export const isContest = (contest: any): contest is Contest =>
  typeof contest.No === "number" &&
  typeof contest.Domain === "string" &&
  typeof contest.ContestID === "string" &&
  typeof contest.Title === "string" &&
  typeof contest.StartTimeSeconds === "number" &&
  typeof contest.DurationSeconds === "number" &&
  typeof contest.Rated === "string" &&
  isNumberArray(contest.ProblemNoList);

export const isNote = (note: any): note is Note =>
  typeof note.ID === "string" &&
  typeof note.CreatedAt === "string" &&
  typeof note.UpdatedAt === "string" &&
  typeof note.Text === "string" &&
  isProblem(note.Problem) &&
  isUser(note.User) &&
  typeof note.Public === "number";

export const isNoteList = (noteList: any): noteList is NoteList =>
  typeof noteList.Count === "number" &&
  isNoteArray(noteList.Notes);

export const isTagList = (tagList: any): tagList is TagList =>
  isStringArray(tagList.Tags);

const isNumberArray = (array: any): array is number[] =>
  typeof array === "object" &&
  array !== null &&
  (Object.keys(array).length === 0 || typeof array[0] === "number");

const isStringArray = (array: any): array is number[] =>
  typeof array === "object" &&
  array !== null &&
  (Object.keys(array).length === 0 || typeof array[0] === "string");

const isNoteArray = (array: any): array is Note[] =>
  typeof array === "object" &&
  array !== null &&
  (Object.keys(array).length === 0 || isNote(array[0]));

export const isPublicNote = (note: Note) => note.Public === 2