import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Problem } from "../../types/apiResponse";
import { problemUrl, problemColor } from "../../utils/problemUtil";

type Props = {
  problem: Problem | undefined;
  showID?: boolean;
};

const DifficultyCircle: React.FC<Props> = (props: Props) => {
  const { problem } = props;
  const difficulty = Number(problem?.Difficulty);
  if (problem === undefined || isNaN(difficulty)) {
    return null;
  }
  let color = problemColor(problem);
  if (problem.Domain === "atcoder" || problem.Domain === "codeforces") {
    let background;
    if (problem.Domain === "atcoder") {
      const ratio = difficulty >= 3200 ? 1.0 : (difficulty % 400) / 400;
      if (difficulty < 3200) {
        background = `linear-gradient(to top, ${color} 0%, ${color} ${
          ratio * 100
        }%,
          #fff0 ${ratio * 100}%, #fff0 100%)`;
      } else if (difficulty < 3600) {
        color = "#965c2c";
        background = `linear-gradient(to bottom right, ${color}, #fff 25%, ${color} 70%)`;
      } else if (difficulty < 4000) {
        color = "#808080";
        background = `linear-gradient(to bottom right, ${color}, #fff 25%, ${color} 70%)`;
      } else {
        color = "#fcc800";
        background = `linear-gradient(to bottom right, ${color}, #fff 25%, ${color} 70%)`;
      }
    } else if (problem.Domain === "codeforces") {
      if (difficulty === 0) {
        return null;
      }
      let ratio;
      const diffs = [800, 1200, 1400, 1600, 1900, 2100, 2400, 3000, 3600];
      for (let i = 1; i < diffs.length; i++) {
        if (diffs[i - 1] <= difficulty && difficulty < diffs[i]) {
          ratio = (difficulty - diffs[i - 1]) / (diffs[i] - 100 - diffs[i - 1]);
          background = `linear-gradient(to top, ${color} 0%, ${color} ${
            ratio * 100
          }%, #fff0 ${ratio * 100}%, #fff0 100%)`;
        }
      }
    }
    return (
      <OverlayTrigger
        key={`overlay-${problem.No}`}
        overlay={
          <Tooltip id={`tooltip-${problem.No}`}>
            {`Difficulty: ${problem.Difficulty}`}
          </Tooltip>
        }
      >
        <StyledDifficultyCircle
          style={{ background: background, borderColor: color }}
        />
      </OverlayTrigger>
    );
  } else if (problem.Domain === "yukicoder") {
    return (
      <OverlayTrigger
        key={`overlay-${problem.No}`}
        overlay={
          <Tooltip id={`tooltip-${problem.No}`}>
            {`Level: ${problem.Difficulty}`}
          </Tooltip>
        }
      >
        <StyledStar>
          <FontAwesomeIcon icon={["fas", "star"]} size="sm" color={color} />
        </StyledStar>
      </OverlayTrigger>
    );
  } else {
    return null;
  }
};

export const ProblemLink: React.FC<Props> = (props: Props) => {
  const { problem, showID } = props;
  if (problem === undefined) {
    return null;
  }
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
    <React.Fragment>
      <DifficultyCircle problem={problem} />
      <a
        href={problemUrl(problem)}
        target="_blank" // eslint-disable-line react/jsx-no-target-blank
        rel="noopener"
        style={{ color: problemColor(problem) }}
      >
        {showID && id !== "" && `${id}. `}
        {problem.Title}
      </a>
    </React.Fragment>
  );
};

const StyledDifficultyCircle = styled.span`
  display: inline-block;
  height: 0.75em;
  width: 0.75em;
  border: solid 1px;
  border-radius: 50%;
  margin-right: 0.3em;
`;

const StyledStar = styled.span`
  display: inline-block;
  margin-right: 0.3em;
`;
