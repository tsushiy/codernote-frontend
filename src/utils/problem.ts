import { Problem } from '../types/apiResponse';

export const problemUrl = (problem: Problem | undefined) => {
  let url = "";
  if (problem) {
    switch (problem.Domain) {
      case "atcoder":
        url = `https://atcoder.jp/contests/${problem.ContestID}/tasks/${problem.ProblemID}`;
        break;
      case "codeforces":
        url = `https://codeforces.com/contest/${problem.ContestID}/problem/${problem.ProblemID}`;
        break;
      case "yukicoder":
        url = `https://yukicoder.me/problems/no/${problem.FrontendID}`;
        break;
      case "aoj":
        url = `https://onlinejudge.u-aizu.ac.jp/problems/${problem.ProblemID}`;
        break;
      case "leetcode":
        url = `https://leetcode.com/problems/${problem.Slug}/`;
        break;
    }
  }
  return url;
}

export const problemColorClass = (problem: Problem | undefined) => {
  if (problem) {
    const difficulty = Number(problem.Difficulty);
    switch (problem.Domain) {
      case "atcoder":
        if (difficulty === 0) {
          return ""
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
          return ""
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
          return ""
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
        return "";
      case "leetcode":
        if (difficulty === 1) {
          return "leetcode-easy"
        } else if (difficulty === 2) {
          return "leetcode-medium";
        } else if (difficulty === 3) {
          return "leetcode-hard";
        } else {
          return "";
        }
    }
  }
  return "";
}

export const serviceName = (domain: string | undefined) => {
  let name = "";
  if (domain) {
    switch (domain) {
      case "atcoder":
        name = "AtCoder";
        break;
      case "codeforces":
        name = "Codeforces";
        break;
      case "yukicoder":
        name = "yukicoder";
        break;
      case "aoj":
        name = "AOJ";
        break;
      case "leetcode":
        name = "LeetCode";
        break;
    }
  }
  return name;
}