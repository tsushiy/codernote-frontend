import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { GlobalState } from "../../types/globalState";
import { Problem, Contest } from "../../types/apiResponse";
import { serviceName } from "../../utils/problemUtil";
import { ProblemLink } from "../Elements/ProblemLink";
import { ContestLink } from "../Elements/ContestLink";
import { EditButton } from "../Elements/NoteLink";
import { NotesLinkButton } from "../Elements/NotesLink";

type Props = {
  problem: Problem | undefined;
  contest: Contest | undefined;
  userName: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

const NoteHeader: React.FC<Props> = (props: Props) => {
  const { userName } = useSelector((state: GlobalState) => state.auth);

  return (
    <Container>
      {userName === props.userName && (
        <EditButtonContainer>
          <EditButton problemNo={props.problem?.No}>Edit</EditButton>
        </EditButtonContainer>
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
      <div style={{ fontSize: "0.95em", color: "#555" }}>
        {"by "}
        {props.userName}
        <NotesLinkButton userName={props.userName} />
      </div>
      <time
        dateTime={props.updatedAt}
        style={{ fontSize: "0.95em", color: "#555" }}
      >
        Updated At :{" "}
        {props.updatedAt ? new Date(props.updatedAt).toLocaleString() : ""}
      </time>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;

const EditButtonContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 16px;

  a {
    font-size: 1em;
    padding: 0.3em 0.5em;
  }
`;

const ContestTitle = styled.h5`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProblemTitle = styled.h3`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default NoteHeader;
