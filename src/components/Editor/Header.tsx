import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Problem, Contest } from "../../types/apiResponse";
import { serviceName } from "../../utils/problemUtil";
import { ProblemLink } from "../Elements/ProblemLink";
import { ContestLink } from "../Elements/ContestLink";
import { NotesLinkButton } from "../Elements/NotesLink";

type Props = {
  problem: Problem | undefined;
  contest: Contest | undefined;
  noteId: string;
};

const EditorHeader: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      {props.noteId && (
        <NoteID>
          NoteID: <Link to={`/notes/${props.noteId}`}>{props.noteId}</Link>
        </NoteID>
      )}
      <ContestTitle>
        {serviceName(props.problem?.Domain)}
        {" : "}
        <ContestLink contest={props.contest} />
      </ContestTitle>
      <div style={{ display: "flex" }}>
        <ProblemTitle>
          <ProblemLink problem={props.problem} />
          <NotesLinkButton problemNo={props.problem?.No} />
        </ProblemTitle>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;

const NoteID = styled.h6`
  width: calc(100vw - 30px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ContestTitle = styled.h5`
  width: calc(100vw - 30px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProblemTitle = styled.h3`
  width: calc(100vw - 30px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default EditorHeader;
