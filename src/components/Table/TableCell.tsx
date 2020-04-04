import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppState } from '../../types/appState';
import { problemUrl } from '../../utils/problem';

type Props = {
  problemNo: number
}

const TableCell: React.FC<Props> = (props) => {
  const { problemNo } = props;
  const { problemMap } = useSelector((state: AppState) => state.problem);
  const { myNotesMap } = useSelector((state: AppState) => state.note);

  const noteExists = myNotesMap.has(problemNo);
  const problem = problemMap.get(problemNo);
  const title = problem?.Title;
  const editUrl = `/my/${problemNo}`;
  const viewUrl = noteExists ? `/notes/${myNotesMap.get(problemNo)?.ID}` : ""

  return (
    <Container>
      <div style={{display: "block"}}>
        <EditButton to={editUrl}>
          Edit
        </EditButton>
        {noteExists &&
          <ViewButton to={viewUrl}>
            View
          </ViewButton>
        }
      </div>
      <ProblemLink href={problemUrl(problem)} target="_blank" rel="noopener noreferrer">
        {title}
      </ProblemLink>
    </Container>
  )
}

const ProblemLink = styled.a`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditButton = styled(Link)`
  &&& {
    color: #FFF;
    background-color: #777;
    white-space: nowrap;
    font-size: 0.7em;
    font-weight: bold;
    padding: 2px 4px;
    margin-right: 1px;
    border: solid thin;
    border-radius: 1em;
  }
`;

const ViewButton = styled(Link)`
  &&& {
    color: #FFF;
    background-color: #39c;
    white-space: nowrap;
    font-size: 0.7em;
    font-weight: bold;
    padding: 2px 4px;
    margin-right: 1px;
    border: solid thin;
    border-radius: 1em;
  }
`;

export default TableCell;