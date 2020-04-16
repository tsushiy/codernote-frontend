import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { publicNoteColor, privateNoteColor } from '../../components/Styles';
import { GlobalState } from '../../types/globalState';
import { problemUrl, problemColorClass } from '../../utils/problem';
import { isPublicNote } from '../../types/apiResponse';

type Props = {
  problemNo: number
}

const TableCell: React.FC<Props> = (props) => {
  const { problemNo } = props;
  const { problemMap } = useSelector((state: GlobalState) => state.problem);
  const { myNotesMap } = useSelector((state: GlobalState) => state.note);

  const note = myNotesMap.get(problemNo);
  const problem = problemMap.get(problemNo);
  const title = problem?.Title;
  const editUrl = `/edit/${problemNo}`;
  const viewUrl = note ? `/notes/${myNotesMap.get(problemNo)?.ID}` : "";

  return (
    <td>
      <div style={{display: "block", marginBottom: "2px"}}>
        <EditButton to={editUrl}>
          Edit
        </EditButton>
        {note && isPublicNote(note) && 
          <PublicViewButton to={viewUrl}>
            View
          </PublicViewButton>
        }
        {note && !isPublicNote(note) && 
          <PrivateViewButton to={viewUrl}>
            View
          </PrivateViewButton>
        }
      </div>
      <ProblemLink
        className={problemColorClass(problem)}
        href={problemUrl(problem)}
        target="_blank"
        rel="noopener noreferrer">
        {title}
      </ProblemLink>
    </td>
  )
}

const ProblemLink = styled.a`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const BaseButton = styled(Link)`
  &&& {
    color: #FFF;
    white-space: nowrap;
    font-size: 0.83em;
    font-weight: bold;
    padding: 2px 4px;
    margin-right: 3px;
    border-radius: 0.4em;
  }
`;

const EditButton = styled(BaseButton)`
  &&& {
    background-color: #707070;
  }
`;

const PrivateViewButton = styled(BaseButton)`
  &&& {
    background-color: ${privateNoteColor};
  }
`;

const PublicViewButton = styled(BaseButton)`
  &&& {
    background-color: ${publicNoteColor};
  }
`;

export default TableCell;