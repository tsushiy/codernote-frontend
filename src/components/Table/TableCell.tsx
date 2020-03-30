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
      <div>
        <Link to={editUrl} style={{color: "#555", fontSize: "0.9em", fontWeight: "bold", paddingRight: "4px"}}>
          Edit
        </Link>
        {noteExists &&
          <Link to={viewUrl} style={{color: "#39c", fontSize: "0.9em", fontWeight: "bold", paddingRight: "4px"}}>
            View
          </Link>
        }
      </div>
      <a href={problemUrl(problem)} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TableCell;