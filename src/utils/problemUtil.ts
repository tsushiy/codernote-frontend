import { Problem, Contest } from "../types/apiResponse";

export const problemUrl = (problem: Problem | undefined): string => {
  if (problem === undefined) {
    return "";
  } else {
    switch (problem.Domain) {
      case "atcoder":
        return `https://atcoder.jp/contests/${problem.ContestID}/tasks/${problem.ProblemID}`;
      case "codeforces":
        return `https://codeforces.com/contest/${problem.ContestID}/problem/${problem.ProblemID}`;
      case "yukicoder":
        return `https://yukicoder.me/problems/no/${problem.FrontendID}`;
      case "aoj":
        return `https://onlinejudge.u-aizu.ac.jp/problems/${problem.ProblemID}`;
      case "leetcode":
        return `https://leetcode.com/problems/${problem.Slug}/`;
      default:
        return "";
    }
  }
};

export const contestUrl = (contest: Contest | undefined) => {
  if (contest === undefined) {
    return "";
  } else {
    switch (contest.Domain) {
      case "atcoder":
        return `https://atcoder.jp/contests/${contest.ContestID}`;
      case "codeforces":
        return `https://codeforces.com/contest/${contest.ContestID}`;
      case "yukicoder":
        return `https://yukicoder.me/contests/${contest.ContestID}`;
      default:
        return "";
    }
  }
};

export const problemColorClass = (problem: Problem | undefined) => {
  if (problem) {
    const difficulty = Number(problem.Difficulty);
    switch (problem.Domain) {
      case "atcoder":
        if (difficulty === 0) {
          return "difficulty-none";
        } else if (difficulty < 400) {
          return "atcoder-grey";
        } else if (difficulty < 800) {
          return "atcoder-brown";
        } else if (difficulty < 1200) {
          return "atcoder-green";
        } else if (difficulty < 1600) {
          return "atcoder-cyan";
        } else if (difficulty < 2000) {
          return "atcoder-blue";
        } else if (difficulty < 2400) {
          return "atcoder-yellow";
        } else if (difficulty < 2800) {
          return "atcoder-orange";
        } else {
          return "atcoder-red";
        }
      case "codeforces":
        if (difficulty === 0) {
          return "difficulty-none";
        } else if (difficulty < 1200) {
          return "codeforces-grey";
        } else if (difficulty < 1400) {
          return "codeforces-green";
        } else if (difficulty < 1600) {
          return "codeforces-cyan";
        } else if (difficulty < 1900) {
          return "codeforces-blue";
        } else if (difficulty < 2100) {
          return "codeforces-violet";
        } else if (difficulty < 2400) {
          return "codeforces-orange";
        } else {
          return "codeforces-red";
        }
      case "yukicoder":
        if (difficulty === 0) {
          return "difficulty-none";
        } else if (difficulty === 1) {
          return "yukicoder-grey";
        } else if (difficulty === 1.5) {
          return "yukicoder-brown";
        } else if (difficulty === 2) {
          return "yukicoder-green";
        } else if (difficulty === 2.5) {
          return "yukicoder-cyan";
        } else if (difficulty === 3) {
          return "yukicoder-blue";
        } else if (difficulty === 3.5) {
          return "yukicoder-yellow";
        } else if (difficulty === 4) {
          return "yukicoder-orange";
        } else {
          return "yukicoder-red";
        }
      case "aoj":
        return "difficulty-none";
      case "leetcode":
        if (difficulty === 1) {
          return "leetcode-easy";
        } else if (difficulty === 2) {
          return "leetcode-medium";
        } else if (difficulty === 3) {
          return "leetcode-hard";
        } else {
          return "difficulty-none";
        }
    }
  }
  return "difficulty-none";
};

export const contestColorClass = (contest: Contest | undefined) => {
  if (contest) {
    const rated = contest.Rated;
    switch (contest.Domain) {
      case "atcoder":
        if (rated === " ~ 1199") {
          return "atcoder-green";
        } else if (rated === " ~ 1999") {
          return "atcoder-blue";
        } else if (rated === " ~ 2799") {
          return "atcoder-orange";
        } else if (rated === "All") {
          return "atcoder-red";
        } else {
          return "";
        }
      case "codeforces":
        if (rated === "1" || rated === "12") {
          return "codeforces-red";
        } else if (rated === "2") {
          return "codeforces-blue";
        } else if (rated === "3") {
          return "codeforces-cyan";
        } else {
          return "";
        }
    }
  }
  return "";
};

export const serviceName = (domain: string | undefined) => {
  if (domain) {
    switch (domain) {
      case "atcoder":
        return "AtCoder";
      case "codeforces":
        return "Codeforces";
      case "yukicoder":
        return "yukicoder";
      case "aoj":
        return "AOJ";
      case "leetcode":
        return "LeetCode";
    }
  }
  return "";
};
