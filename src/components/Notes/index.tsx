import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import { parse } from 'query-string';
import { Table } from 'react-bootstrap';
import styled from "styled-components";
import { getPublicNotes } from '../../utils/apiClient';
import { problemUrl } from '../../utils/problem';
import { Note } from '../../types/apiResponse';

type Props = {} & RouteComponentProps;

const NotesPage: React.FC<Props> = props => {
  const query = parse(props.location.search);
  const [noteCount, setNoteCount] = useState(0);
  const [notes, setNotes] = useState<Note[]>();

  let page = Number(query.page);
  if (page === 0 || isNaN(page) || page !== Number(page.toFixed())) {
    page = 1;
  }

  useEffect(() => {
    const limit = 100;
    const skip = 100 * (page - 1);
    getPublicNotes({skip, limit})
      .then(noteList => {
        if (noteList) {
          setNotes(noteList.Notes);
          setNoteCount(noteList.Count);
        }
      })
  }, [page])

  return (
    <Container>
      <h1 style={{padding: "18px 22px"}}>Public Notes</h1>
      <Table className="table-responsive-sm table-hover">
        <thead>
          <tr>
            <th>NoteID</th>
            <th>User</th>
            <th>Service</th>
            <th>Problem</th>
            <th>UpdatedAt</th>
          </tr>
        </thead>
        <tbody>
          {notes && notes.map((note, i) => (
            <tr key={i}>
              <td>
                <Link to={`notes/${note.ID}`}>
                  {note.ID.slice(0, 8)}
                </Link>
              </td>
              <td>{note.User.Name}</td>
              <td>{note.Problem.Domain.toUpperCase()}</td>
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