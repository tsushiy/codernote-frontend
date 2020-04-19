import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Problem, Contest } from "../../types/apiResponse";
import { serviceName } from "../../utils/problemUtil";
import { ProblemLink } from "../Elements/ProblemLink";

type Props = {
  problem: Problem | undefined;
  contest: Contest | undefined;
  onClickPreview: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
        {serviceName(props.problem?.Domain)} : {props.contest?.Title}
      </ContestTitle>
      <div style={{ display: "flex" }}>
        <ProblemTitle>
          <ProblemLink problem={props.problem} />
        </ProblemTitle>
      </div>
      <div style={{ display: "flex" }}>
        <Button onClick={props.onClickPreview}>Preview</Button>
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