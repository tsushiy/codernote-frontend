import React from 'react';
import styled from 'styled-components';
import { Problem, Contest } from '../../types/apiResponse';
import { problemUrl, serviceName } from '../../utils/problem';

type Props = {
  problem: Problem | undefined;
  contest: Contest | undefined;
  userName: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

const NoteHeader: React.FC<Props> = props => {
  return (
    <Container>
      <ContestTitle>{serviceName(props.problem?.Domain)} : {props.contest?.Title}</ContestTitle>
      <div style={{display: "flex"}}>
        <ProblemTitle>
          <a href={problemUrl(props.problem)} target="_blank" rel="noopener noreferrer">
            {props.problem?.Title}
          </a>
        </ProblemTitle>
      </div>
      <div>Author : {props.userName}</div>
      <div>Updated At : {props.updatedAt ? (new Date(props.updatedAt)).toLocaleString() : ""}</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
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

export default NoteHeader;