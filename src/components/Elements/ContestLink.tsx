import React from "react";
import { Contest } from "../../types/apiResponse";
import { contestUrl, contestColorClass } from "../../utils/problemUtil";

type Props = {
  contest: Contest | undefined;
  useShortName?: boolean;
};

export const ContestLink: React.FC<Props> = (props: Props) => {
  const { contest, useShortName } = props;
  if (contest !== undefined) {
    const url = contestUrl(contest);

    let showMark;
    switch (contest.Domain) {
      case "atcoder":
        showMark = true;
        break;
      case "codeforces":
        showMark = true;
        break;
      default:
        showMark = false;
        break;
    }

    let title = contest.Title;
    if (contest.Domain === "leetcode") {
      title = title.toUpperCase();
    }
    if (useShortName) {
      if (contest.Domain === "codeforces") {
        const tmpTitle = contest.Title.match(/#[0-9]{1,3}/)?.toString();
        title = tmpTitle ? tmpTitle : title;
      } else {
        title = contest.ContestID.toUpperCase();
      }
    }

    if (url === "") {
      return <>{title === undefined ? contest.Title : title}</>;
    } else {
      return (
        <React.Fragment>
          {showMark && (
            <span
              className={contestColorClass(contest)}
              style={{ fontSize: "85%", marginRight: "2px" }}
            >
              ◉
            </span>
          )}
          <a
            href={contestUrl(contest)}
            className="contest-title"
            target="_blank" // eslint-disable-line react/jsx-no-target-blank
            rel="noopener"
          >
            {title === undefined ? contest.Title : title}
          </a>
        </React.Fragment>
      );
    }
  } else {
    return null;
  }
};
