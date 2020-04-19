import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicNoteColor, privateNoteColor } from "../../components/Styles";
import { GlobalState } from "../../types/globalState";
import {
  isAccepted,
  acceptedOrLatestSubmission,
  timePassageString,
} from "../../utils/submissionUtil";
import { Submission } from "../../types/submissions";
import { isPublicNote } from "../../types/apiResponse";
import { ProblemLink } from "../Elements/ProblemLink";

type Props = {
  problemNo: number;
};

const cellColor = (submission: Submission | null, noteExists: boolean) => {
  if (submission === null) {
    if (!noteExists) {
      return "";
    } else {
      return "tablecell-note";
    }
  }
  if (isAccepted(submission)) {
    return "tablecell-success";
  } else {
    return "tablecell-warning";
  }
};

const TableCell: React.FC<Props> = (props: Props) => {
  const { problemNo } = props;
  const { problemMap, submissionMap } = useSelector(
    (state: GlobalState) => state.problem
  );
  const { myNotesMap } = useSelector((state: GlobalState) => state.note);

  const note = myNotesMap.get(problemNo);
  const problem = problemMap.get(problemNo);
  const editUrl = `/edit/${problemNo}`;
  const viewUrl = note ? `/notes/${myNotesMap.get(problemNo)?.ID}` : "";

  const submissions = submissionMap.get(problemNo);
  const acceptedOrLatest = acceptedOrLatestSubmission(submissions);
  const timePassed = timePassageString(acceptedOrLatest);

  return (
    <td
      className={cellColor(acceptedOrLatest, note !== undefined)}
      style={{ position: "relative" }}
    >
      <div style={{ display: "block", marginBottom: "2px" }}>
        <EditButton to={editUrl}>Edit</EditButton>
        {note && isPublicNote(note) && (
          <PublicViewButton to={viewUrl}>View</PublicViewButton>
        )}
        {note && !isPublicNote(note) && (
          <PrivateViewButton to={viewUrl}>View</PrivateViewButton>
        )}
      </div>
      <ProblemLinkContainer>
        <ProblemLink problem={problem} />
      </ProblemLinkContainer>
      {timePassed && <TimePassage>{timePassed}</TimePassage>}
    </td>
  );
};

const ProblemLinkContainer = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const BaseButton = styled(Link)`
  &&& {
    color: #fff;
    white-space: nowrap;
    font-size: 0.83em;
    font-weight: bold;
    padding: 2px 4px;
    margin-right: 3px;
    border-radius: 0.4em;
  }
`;

const EditButton = styled(BaseButton)`
  &&& {
    background-color: #707070;
  }
`;

const PrivateViewButton = styled(BaseButton)`
  &&& {
    background-color: ${privateNoteColor};
  }
`;

const PublicViewButton = styled(BaseButton)`
  &&& {
    background-color: ${publicNoteColor};
  }
`;

const TimePassage = styled.div`
  position: absolute;
  right: 2px;
  bottom: 0;
  font-size: 0.7em;
  color: #666;
`;

export default TableCell;
