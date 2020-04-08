import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { parse } from 'query-string';
import { Nav } from "react-bootstrap"
import styled from "styled-components";
import { MainContainer, } from '../../components/Styles';
import { getPublicNotes, getMyNotes } from '../../utils/apiClient';
import { Note } from '../../types/apiResponse';
import { GlobalState } from '../../types/globalState';
import { setNotesShowMode } from '../../reducers/appReducer';
import NotesFilter from './NotesFilter';
import NotesSummary from './NotesSummary';
import NotesTable from './NotesTable';

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

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { notesShowMode } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(notesShowMode);

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
        <Nav
          variant="tabs"
          className="flex-row"
          defaultActiveKey={activeTab}
          onSelect={(eventKey: string) => {
            setActiveTab(eventKey);
            dispatch(setNotesShowMode(eventKey));
          }}>
          <Nav.Item>
            <Nav.Link eventKey="summary">Summary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="table">Table</Nav.Link>
          </Nav.Item>
        </Nav>
        {activeTab === "summary" && <NotesSummary notes={notes} isMyNotes={isMyNotes} />}
        {activeTab === "table" && <NotesTable notes={notes} isMyNotes={isMyNotes} />}
      </Container>
    </MainContainer>
  );
}

const Container = styled.div`
  display: block;
  position: relative;
  padding: 0 6px 0;
`;

export default NotesPage;