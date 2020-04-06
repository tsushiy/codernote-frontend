import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import { parse } from 'query-string';
import { Table } from 'react-bootstrap';
import styled from "styled-components";
import { getPublicNotes, getMyNotes } from '../../utils/apiClient';
import { problemUrl, serviceName } from '../../utils/problem';
import { Note, isPublicNote } from '../../types/apiResponse';
import { GlobalState } from '../../types/globalState';

type Props = {
  isMyNotes: boolean;
} & RouteComponentProps;

type WrapperProps = {
  children: React.ReactElement;
  isFetchTried: boolean;
}

const NotesWrapper: React.FC<WrapperProps> = props => {
  if (!props.isFetchTried) {
    return null;
  } else {
    return props.children;
  }
}

const NotesPage: React.FC<Props> = props => {
  const query = parse(props.location.search);
  const { isMyNotes } = props;

  const [isFetchTried, setIsFetchTried] = useState(false);
  const [noteCount, setNoteCount] = useState(0);
  const [notes, setNotes] = useState<Note[]>()

  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { contestMap } = useSelector((state: GlobalState) => state.problem);

  let page = Number(query.page);
  if (page === 0 || isNaN(page) || page !== Number(page.toFixed())) {
    page = 1;
  }
  const limit = 100;
  const skip = 100 * (page - 1);

  useEffect(() => {
    setIsFetchTried(false);
  }, [props])

  useEffect(() => {
    if (isMyNotes || isFetchTried) return;
    setIsFetchTried(true);
    (async() => {
      const noteList = await getPublicNotes({skip, limit});
      if (noteList) {
        setNotes(noteList.Notes);
        setNoteCount(noteList.Count);
      }
    })();
  }, [isFetchTried, isMyNotes, skip, limit])

  useEffect(() => {
    if (!isMyNotes || isFetchTried) return;
    setIsFetchTried(true);
    if (!isLoggedIn) {
      setNotes(undefined);
      setNoteCount(0);
      return;
    };
    (async() => {
      const noteList = await getMyNotes({skip, limit});
      if (noteList) {
        setNotes(noteList.Notes);
        setNoteCount(noteList.Count);
      }
    })();
  }, [isFetchTried, isLoggedIn, isMyNotes, skip, limit])

  return (
    <NotesWrapper isFetchTried={isFetchTried}>
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
                {isMyNotes &&
                  <td>
                    {isPublicNote(note) && 
                      <div style={{color: "#ff8800"}}>
                        Public
                      </div>}
                    {!isPublicNote(note) && 
                      <div style={{color: "#39c"}}>
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
                    {note.Problem.Title}
                  </a>
                </td>
                <td>{(new Date(note.UpdatedAt)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </NotesWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: calc(100vh - 64px);
  top: 64px;
  right: 24px;
  left: 24px;
  bottom: 0;
`;

export default NotesPage;