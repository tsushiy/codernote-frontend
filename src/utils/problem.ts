import { Problem } from '../types/apiResponse';

export const problemUrl = (problem: Problem | undefined) => {
  let url = "";
  if (problem) {
    switch (problem.Domain) {
      case "atcoder":
        url = `https://atcoder.jp/contests/${problem.ContestID}/tasks/${problem.ProblemID}`;
        break;
      case "codeforces":
        url = `https://codeforces.com/contest/${problem.ContestID}/problem/${problem.ProblemID}`
        break;
      case "yukicoder":
        url = `https://yukicoder.me/problems/no/${problem.FrontendID}`
        break;
      case "aoj":
        url = `https://onlinejudge.u-aizu.ac.jp/problems/${problem.ProblemID}`
        break;
      case "leetcode":
        url = `https://leetcode.com/problems/${problem.Slug}/`
        break;
    }
  }
  return url;
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