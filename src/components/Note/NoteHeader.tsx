import React from 'react';
import styled from 'styled-components';
import { Problem } from '../../types/apiResponse';
import { problemUrl } from '../../utils/problem';

type Props = {
  problem: Problem | undefined;
  userName: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

const NoteHeader: React.FC<Props> = props => {
  return (
    <Container>
      <h5>{props.problem?.Domain.toUpperCase()}</h5>
      <div style={{display: "flex"}}>
        <a href={problemUrl(props.problem)} target="_blank" rel="noopener noreferrer">
          <h2>{props.problem?.Title}</h2>
        </a>
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