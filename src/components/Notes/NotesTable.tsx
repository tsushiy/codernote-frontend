import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { publicNoteColor, privateNoteColor } from '../Styles';
import { Note, isPublicNote } from '../../types/apiResponse';
import { GlobalState } from '../../types/globalState';
import { problemUrl, serviceName } from '../../utils/problem';

type Props = {
  notes: Note[] | undefined;
  isMyNotes: boolean;
}

const NotesTable: React.FC<Props> = props => {
  const { notes, isMyNotes } = props;
  const { contestMap } = useSelector((state: GlobalState) => state.problem);
  return (
    <StyledTable
      className="table-responsive-sm table-hover"
      size="sm">
      <thead>
        <tr>
          <th style={{width: "8%"}}>NoteID</th>
          {isMyNotes && <th style={{width: "6%"}}>Public</th>}
          {!isMyNotes && <th>User</th>}
          <th style={{width: "6%"}}>Service</th>
          <th>Contest</th>
          <th>Problem</th>
          <th style={{width: "13%"}}>UpdatedAt</th>
        </tr>
      </thead>
      <tbody>
        {notes && notes.map((note, i) => (
          <tr key={i}>
            <td>
              <Link to={`/notes/${note.ID}`}>
                {note.ID.slice(0, 8)}
              </Link>
            </td>
            {isMyNotes &&
              <td>
                {isPublicNote(note) && 
                  <div style={{color: publicNoteColor}}>
                    Public
                  </div>}
                {!isPublicNote(note) && 
                  <div style={{color: privateNoteColor}}>
                    Private
                  </div>}
              </td>}
            {!isMyNotes && <td>{note.User.Name}</td>}
            <td>{serviceName(note.Problem.Domain)}</td>
            <td>
              {contestMap.get(note.Problem.Domain + note.Problem.ContestID)?.Title}
            </td>
            <td>
              <a href={problemUrl(note.Problem)} target="_blank" rel="noopener noreferrer">
                {note.Problem.Domain === "aoj" &&
                  `${note.Problem.ProblemID}. `}
                {(note.Problem.Domain === "leetcode" || note.Problem.Domain === "yukicoder") &&
                  `${note.Problem.FrontendID}. `}
                {note.Problem.Title}
              </a>
            </td>
            <td>{(new Date(note.UpdatedAt)).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default NotesTable;

const StyledTable = styled(Table)`
  &&& {
    color: #444;
    font-size: 0.98em;
  }
`;
