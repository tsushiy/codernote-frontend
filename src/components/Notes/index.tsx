import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import { parse } from 'query-string';
import { Table } from 'react-bootstrap';
import styled from "styled-components";
import { MainContainer, publicNoteColor, privateNoteColor } from '../../components/Styles';
import { getPublicNotes, getMyNotes } from '../../utils/apiClient';
import { problemUrl, serviceName } from '../../utils/problem';
import { Note, isPublicNote } from '../../types/apiResponse';
import { GlobalState } from '../../types/globalState';
import NotesFilter from './NotesFilter'

type Props = {
  isMyNotes: boolean;
} & RouteComponentProps;

export type queryType = {
  domain: string;
  problemNo: number;
  userName: string;
  tag: string;
  page: number;
  order: string;
}

export const queryToParams = (query: queryType) => {
  const params = new URLSearchParams({
    domain: query.domain,
    problemNo: query.problemNo.toString(),
    userName: query.userName,
    tag: query.tag,
    page: query.page.toString(),
    order: query.order
  });
  return params.toString();
}

const NotesPage: React.FC<Props> = props => {
  const { isMyNotes } = props;

  const [notes, setNotes] = useState<Note[]>();
  const [query, setQuery] = useState<queryType>({
    domain: "",
    problemNo: 0,
    userName: "",
    tag: "",
    page: 1,
    order: ""
  });
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { contestMap } = useSelector((state: GlobalState) => state.problem);

  useEffect(() => {
    setNotes(undefined);
    setQuery({
      domain: "",
      problemNo: 0,
      userName: "",
      tag: "",
      page: 1,
      order: ""
    });
    setIsFetchTried(false);
  }, [props, isLoggedIn, isMyNotes])

  useEffect(() => {
    if (isFetchTried) return;
    const urlQuery = parse(props.location.search);
    let page = typeof(urlQuery.page) === "string" ? parseInt(urlQuery.page) : 1;
    if (page <= 0 || isNaN(page)) {
      page = 1;
    }
    const limit = 30;
    const skip = limit * (page - 1);
    let currentQuery = {
      domain: typeof(urlQuery.domain) === "string" ? urlQuery.domain : "",
      problemNo: typeof(urlQuery.problemNo) === "string" ? parseInt(urlQuery.problemNo) : 0,
      userName: typeof(urlQuery.userName) === "string" ? urlQuery.userName : "",
      tag: typeof(urlQuery.tag) === "string" ? urlQuery.tag : "",
      page: page,
      order: typeof(urlQuery.order) === "string" ? urlQuery.order : "",
    }
    setQuery(Object.assign({}, currentQuery));

    (async() => {
      setIsFetchTried(true);
      let noteList;
      if (isMyNotes) {
        noteList = await getMyNotes({...currentQuery, skip, limit});
      } else {
        noteList = await getPublicNotes({...currentQuery, skip, limit});
      }
      if (noteList) {
        setNotes(noteList.Notes);
        setMaxPage(Math.max(1, Math.ceil(noteList.Count / limit)));
      }
    })();
  }, [props, isFetchTried, isMyNotes])

  return (
    <MainContainer>
      <Container>
        <h1 style={{padding: "22px"}}>
          {isMyNotes ? "My Notes" : "Public Notes"}
        </h1>
        <NotesFilter
          isMyNotes={isMyNotes}
          query={query}
          maxPage={maxPage}/>
        <Table
          className="table-responsive-sm table-hover"
          size="sm"
          striped
          style={{color: "#444", fontSize: "0.98em"}}>
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
                    {note.Problem.Title}
                  </a>
                </td>
                <td>{(new Date(note.UpdatedAt)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </MainContainer>
  );
}

const Container = styled.div`
  display: block;
  position: relative;
`;

export default NotesPage;