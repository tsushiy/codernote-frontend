import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Problem, Contest } from '../../types/apiResponse';
import { problemUrl, serviceName } from '../../utils/problem';

type Props = {
  problem: Problem | undefined;
  contest: Contest | undefined;
  onClickPreview: any;
}

const EditorHeader: React.FC<Props> = props => {
  return (
    <Container>
      <h6>{serviceName(props.problem?.Domain)}</h6>
      <h5>{props.contest?.Title}</h5>
      <div style={{display: "flex"}}>
        <h3>
          <a href={problemUrl(props.problem)} target="_blank" rel="noopener noreferrer">
            {props.problem?.Title}
          </a>
        </h3>
      </div>
      <div style={{display: "flex"}}>
        <Button onClick={props.onClickPreview}>Preview</Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
`;

export default EditorHeader;