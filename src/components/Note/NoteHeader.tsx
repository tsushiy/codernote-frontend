import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalState } from "../../types/globalState";
import { Problem, Contest } from "../../types/apiResponse";
import { problemUrl, serviceName } from "../../utils/problem";

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
        <EditButton to={`/edit/${props.problem?.No}`}>Edit</EditButton>
      )}
      <ContestTitle>
        {serviceName(props.problem?.Domain)} : {props.contest?.Title}
      </ContestTitle>
      <div style={{ display: "flex" }}>
        <ProblemTitle>
          <a
            href={problemUrl(props.problem)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.problem?.Title}
          </a>
        </ProblemTitle>
      </div>
      <div>Author : {props.userName}</div>
      <time
        dateTime={props.updatedAt}
        style={{ fontSize: "0.95em", color: "#444" }}
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

const EditButton = styled(Link)`
  &&& {
    position: absolute;
    white-space: nowrap;
    font-weight: bold;
    top: 24px;
    right: 16px;
    padding: 3px 10px;
    border-radius: 0.4em;
    color: #fff;
    background-color: #707070;
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
