import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import { parse } from 'query-string';
import { Table } from 'react-bootstrap';
import styled from "styled-components";
import { getPublicNotes, getMyNotes } from '../../utils/apiClient';
import { problemUrl, serviceName } from '../../utils/problem';
import { Note, isPublicNote } from '../../types/apiResponse';
import { AppState } from '../../types/appState';

type Props = {
  isMyNotes: boolean;
} & RouteComponentProps;

const NotesPage: React.FC<Props> = props => {
  const query = parse(props.location.search);
  const { isMyNotes } = props;
  const [noteCount, setNoteCount] = useState(0);
  const [notes, setNotes] = useState<Note[]>();
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const { contestMap } = useSelector((state: AppState) => state.problem);

  let page = Number(query.page);
  if (page === 0 || isNaN(page) || page !== Number(page.toFixed())) {
    page = 1;
  }
  const limit = 100;
  const skip = 100 * (page - 1);

  useEffect(() => {
    if (isMyNotes) return;
    getPublicNotes({skip, limit})
      .then(noteList => {
        if (noteList) {
          setNotes(noteList.Notes);
          setNoteCount(noteList.Count);
        }
      })
  }, [isMyNotes, props, skip, limit])

  useEffect(() => {
    if (!isMyNotes || !isLoggedIn) return;
    getMyNotes({skip, limit})
      .then(noteList => {
        if (noteList) {
          setNotes(noteList.Notes);
          setNoteCount(noteList.Count);
        }
      })
  }, [isLoggedIn, isMyNotes, props, skip, limit])

  return (
    <Container>
      <h1 style={{padding: "22px"}}>
        {isMyNotes ? "My Notes" : "Public Notes"}
      </h1>
      <Table className="table-responsive-sm table-hover">
        <thead>
          <tr>
            <th>NoteID</th>
            {isMyNotes && <th>Public</th>}
            {!isMyNotes && <th>User</th>}
            <th>Service</th>
            <th>Contest</th>
            <th>Problem</th>
            <th>UpdatedAt</th>
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
              {isMyNotes && <td>{isPublicNote(note) ? "public" : ""}</td>}
              {!isMyNotes && <td>{note.User.Name}</td>}
              <td>{serviceName(note.Problem.Domain)}</td>
              <td>
                {contestMap.get(note.Problem.Domain + note.Problem.ContestID)?.Title}
              </td>
              <td>
                <a href={problemUrl(note.Problem)} target="_blank" rel="noopener noreferrer">
                  {note.Problem.Title}
                </a>
              </td>
              <td>{(new Date(note.UpdatedAt)).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: calc(100vh - 56px);
  top: 56px;
  right: 24px;
  left: 24px;
  bottom: 0;
`;

export default NotesPage;