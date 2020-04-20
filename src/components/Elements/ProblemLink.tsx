import React from "react";
import { Problem } from "../../types/apiResponse";
import { problemUrl, problemColorClass } from "../../utils/problemUtil";

type Props = {
  problem: Problem | undefined;
};

export const ProblemLink: React.FC<Props> = (props: Props) => {
  const { problem } = props;
  if (problem !== undefined) {
    return (
      <a
        href={problemUrl(problem)}
        className={problemColorClass(problem)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {problem.Title}
      </a>
    );
  } else {
    return null;
  }
};

export const ProblemLinkWithID: React.FC<Props> = (props: Props) => {
  const { problem } = props;
  if (problem !== undefined) {
    let id = "";
    switch (problem.Domain) {
      case "aoj":
        id = problem.ProblemID;
        break;
      case "yukicoder":
        id = problem.FrontendID;
        break;
      case "leetcode":
        id = problem.FrontendID;
        break;
    }
    return (
      <a
        href={problemUrl(problem)}
        className={problemColorClass(problem)}
        target="_blank" // eslint-disable-line react/jsx-no-target-blank
        rel="noopener"
      >
        {id !== "" && `${id}. `}
        {problem.Title}
      </a>
    );
  } else {
    return null;
  }
};
