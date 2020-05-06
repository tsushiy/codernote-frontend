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

export const problemColor = (problem: Problem | undefined) => {
  const difficulty = Number(problem?.Difficulty);
  const defaultColor = "#4080d2";
  if (problem === undefined || isNaN(difficulty)) {
    return defaultColor;
  }
  switch (problem.Domain) {
    case "atcoder":
      if (difficulty < 400) {
        return "#808080";
      } else if (difficulty < 800) {
        return "#804000";
      } else if (difficulty < 1200) {
        return "#008000";
      } else if (difficulty < 1600) {
        return "#00c0c0";
      } else if (difficulty < 2000) {
        return "#0000ff";
      } else if (difficulty < 2400) {
        return "#c0c000";
      } else if (difficulty < 2800) {
        return "#ff8000";
      } else {
        return "#ff0000";
      }
    case "codeforces":
      if (difficulty < 1200) {
        return "#808080";
      } else if (difficulty < 1400) {
        return "#008000";
      } else if (difficulty < 1600) {
        return "#03a89e";
      } else if (difficulty < 1900) {
        return "#0000ff";
      } else if (difficulty < 2100) {
        return "#aa00aa";
      } else if (difficulty < 2400) {
        return "#ff8c00";
      } else if (difficulty < 3000) {
        return "#ff0000";
      } else {
        return "#aa0000";
      }
    case "yukicoder":
      if (difficulty === 1) {
        return "#808080";
      } else if (difficulty === 1.5) {
        return "#804000";
      } else if (difficulty === 2) {
        return "#008000";
      } else if (difficulty === 2.5) {
        return "#00c0c0";
      } else if (difficulty === 3) {
        return "#0000ff";
      } else if (difficulty === 3.5) {
        return "#c0c000";
      } else if (difficulty === 4) {
        return "#ff8000";
      } else {
        return "#ff0000";
      }
    case "aoj":
      return defaultColor;
    case "leetcode":
      if (difficulty === 1) {
        return "#5cb85c";
      } else if (difficulty === 2) {
        return "#f0ad4e";
      } else if (difficulty === 3) {
        return "#d9534f";
      } else {
        return defaultColor;
      }
    default:
      return defaultColor;
  }
};

export const contestColor = (contest: Contest | undefined) => {
  if (contest) {
    const rated = contest.Rated;
    switch (contest.Domain) {
      case "atcoder":
        if (rated === " ~ 1199") {
          return "#008000";
        } else if (rated === " ~ 1999") {
          return "#0000ff";
        } else if (rated === " ~ 2799") {
          return "#ff8000";
        } else if (rated === "All") {
          return "#ff0000";
        } else {
          return "";
        }
      case "codeforces":
        if (rated === "1" || rated === "12") {
          return "#ff0000";
        } else if (rated === "2") {
          return "#0000ff";
        } else if (rated === "3") {
          return "#03a89e";
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
