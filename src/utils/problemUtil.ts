import { Problem, Contest, ProblemMap } from "../types/apiResponse";

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

export const filteredContests = (
  domain: string,
  contests: Contest[],
  tab: string
) => {
  if (domain === "atcoder") {
    const timeFilter = [
      { year: 2020, start: 1577804400, end: 1609426800 },
      { year: 2019, start: 1546268400, end: 1577804400 },
      { year: 2018, start: 1514732400, end: 1546268400 },
      { year: 2017, start: 1483196400, end: 1514732400 },
      { year: 2016, start: 1451574000, end: 1483196400 },
      { year: 2015, start: 1420038000, end: 1451574000 },
      { year: 2014, start: 0, end: 1420038000 },
    ];
    if (tab === "abc-1999") {
      return contests
        .filter((v) => v.ContestID.match(/^abc\d{3}$/))
        .filter((v) => v.Rated === " ~ 1999");
    }
    if (tab === "abc-1199") {
      return contests
        .filter((v) => v.ContestID.match(/^abc\d{3}$/))
        .filter((v) => v.Rated === " ~ 1199");
    }
    if (tab === "abc-unrated") {
      return contests
        .filter((v) => v.ContestID.match(/^abc\d{3}$/))
        .filter((v) => v.Rated === "-");
    }
    if (tab === "abc-sponsored") {
      return contests
        .filter((v) => !v.ContestID.match(/^abc\d{3}$/))
        .filter((v) => v.Rated === " ~ 1199" || v.Rated === " ~ 1999");
    }
    if (tab === "arc-rated") {
      return contests
        .filter((v) => v.ContestID.match(/^arc\d{3}$/))
        .filter((v) => v.Rated === " ~ 2799");
    }
    if (tab === "arc-unrated") {
      return contests
        .filter((v) => v.ContestID.match(/^arc\d{3}$/))
        .filter((v) => v.Rated === "-");
    }
    if (tab === "arc-sponsored") {
      return contests
        .filter((v) => !v.ContestID.match(/^arc\d{3}$/))
        .filter((v) => v.Rated === " ~ 2799");
    }
    if (tab === "agc-regular") {
      return contests.filter((v) => v.ContestID.match(/^agc\d{3}$/));
    }
    if (tab === "agc-others") {
      return contests
        .filter((v) => !v.ContestID.match(/^agc\d{3}$/))
        .filter((v) => v.Rated === "All");
    }
    if (tab === "past") {
      return contests.filter((v) => v.ContestID.startsWith("past"));
    }
    if (tab === "joi") {
      return contests.filter((v) => v.ContestID.startsWith("joi"));
    }
    if (tab === "jag") {
      return contests.filter((v) => v.ContestID.startsWith("jag"));
    }
    for (const f of timeFilter) {
      if (tab === `others-${f.year}`) {
        return contests
          .filter((v) => !v.ContestID.match(/^a[brg]c\d{3}$/))
          .filter((v) => v.Rated === "-")
          .filter((v) => !v.ContestID.startsWith("past"))
          .filter((v) => !v.ContestID.startsWith("joi"))
          .filter((v) => !v.ContestID.startsWith("jag"))
          .filter(
            (v) => f.start <= v.StartTimeSeconds && v.StartTimeSeconds < f.end
          );
      }
    }
  }
  if (domain === "codeforces") {
    const timeFilter = [
      { year: 2020, start: 1577826000, end: 1609448400 },
      { year: 2019, start: 1546290000, end: 1577826000 },
      { year: 2018, start: 1514754000, end: 1546290000 },
      { year: 2017, start: 1483218000, end: 1514754000 },
      { year: 2016, start: 1451595600, end: 1483218000 },
      { year: 2015, start: 1420059600, end: 1451595600 },
      { year: 2014, start: 1388520000, end: 1420059600 },
      { year: 2013, start: 1356984000, end: 1388520000 },
      { year: 2012, start: 0, end: 1356984000 },
    ];
    if (tab === "div1-others") {
      return contests
        .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
        .filter((v) => v.Rated === "1" || v.Rated === "12");
    }
    if (tab === "div2-others") {
      return contests
        .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
        .filter((v) => !v.Title.match(/^Educational/))
        .filter((v) => v.Rated === "2" || v.Rated === "12");
    }
    if (tab === "div3") {
      return contests.filter((v) => v.Rated === "3");
    }
    if (tab === "educational") {
      return contests.filter((v) => v.Title.startsWith("Educational"));
    }
    for (const f of timeFilter) {
      if (tab === `div1-${f.year}`) {
        return contests
          .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
          .filter((v) => v.Rated === "1" || v.Rated === "12")
          .filter(
            (v) => f.start <= v.StartTimeSeconds && v.StartTimeSeconds < f.end
          );
      }
      if (tab === `div2-${f.year}`) {
        return contests
          .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
          .filter((v) => v.Rated === "2" || v.Rated === "12")
          .filter(
            (v) => f.start <= v.StartTimeSeconds && v.StartTimeSeconds < f.end
          );
      }
      if (tab === `others-${f.year}`) {
        return contests
          .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
          .filter((v) => !v.Title.match(/^Educational/))
          .filter((v) => v.Rated === "-")
          .filter(
            (v) => f.start <= v.StartTimeSeconds && v.StartTimeSeconds < f.end
          );
      }
    }
  }
  if (domain === "yukicoder") {
    if (tab === "regular-201") {
      return contests
        .filter((v) => v.Title.match(/^yukicoder contest/))
        .filter((v) => 201 <= Number(v.Title.match(/[0-9]{1,3}/)?.toString()));
    }
    if (tab === "regular-101") {
      return contests
        .filter((v) => v.Title.match(/^yukicoder contest/))
        .filter(
          (v) =>
            101 <= Number(v.Title.match(/[0-9]{1,3}/)?.toString()) &&
            Number(v.Title.match(/[0-9]{1,3}/)?.toString()) < 201
        );
    }
    if (tab === "regular-001") {
      return contests
        .filter((v) => v.Title.match(/^yukicoder contest/))
        .filter((v) => Number(v.Title.match(/[0-9]{1,3}/)?.toString()) < 101);
    }
    if (tab === "others") {
      return contests.filter((v) => !v.Title.match(/^yukicoder contest/));
    }
  }
  return [];
};

export const filteredProblemNoList = (
  domain: string,
  problemNoList: number[] | undefined,
  problemMap: ProblemMap,
  tab: string
) => {
  if (problemNoList === undefined) {
    return [];
  }
  const split = [1, 201, 401, 601, 801, 1001, 1201, 1401, 9999];
  if (domain === "leetcode") {
    for (let i = 0; i < split.length - 1; i++) {
      if (tab === `algorithms-${split[i]}`) {
        return problemNoList.filter(
          (v) =>
            split[i] <= Number(problemMap.get(v)?.FrontendID) &&
            Number(problemMap.get(v)?.FrontendID) < split[i + 1]
        );
      }
    }
  }
  return [];
};
