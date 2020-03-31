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
      <h6>{serviceName(props.problem?.Domain)}</h6>
      <h5>{props.contest?.Title}</h5>
      <div style={{display: "flex"}}>
        <h2>
          <a href={problemUrl(props.problem)} target="_blank" rel="noopener noreferrer">
            {props.problem?.Title}
          </a>
        </h2>
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

export default NoteHeader;