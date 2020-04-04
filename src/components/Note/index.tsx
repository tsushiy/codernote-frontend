import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import styled from "styled-components";
import { nonAuthGetNote, authGetNote } from '../../utils/apiClient';
import { AppState } from '../../types/appState';
import { Note } from '../../types/apiResponse';
import NotePreview from './NotePreview';
import NoteHeader from './NoteHeader';

type Props = {} & RouteComponentProps<{noteId: string}>;

type WrapperProps = {
  children: React.ReactElement;
  noteExists: boolean;
  isFetchTried: boolean;
}

const NoteWrapper: React.FC<WrapperProps> = props => {
  if (!props.isFetchTried) {
    return null;
  } else if (!props.noteExists) {
    return <div>Note not found.</div>
  } else {
    return props.children;
  }
}

const NotePage: React.FC<Props> = props => {
  const noteId = props.match.params.noteId;
  const [note, setNote] = useState<Note>();
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [noteExists, setNoteExists] = useState(false);

  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const { contestMap } = useSelector((state: AppState) => state.problem);

  let contest;
  if (note) {
    contest = contestMap.get(note?.Problem.Domain + note?.Problem.ContestID);
  }

  useEffect(() => {
    (async() => {
      try {
        if (isLoggedIn) {
          const note = await authGetNote(noteId);
          if (note) {
            setNote(note);
            setNoteExists(true);
          }
        } else {
          const note = await nonAuthGetNote(noteId);
          if (note) {
            setNote(note);
            setNoteExists(true);
          }
        }
      } catch (error) {
        setNoteExists(false);
      }
      setIsFetchTried(true);
    })();
  }, [isLoggedIn, noteId])

  return (
    <NoteWrapper noteExists={noteExists} isFetchTried={isFetchTried}>
      <Container>
        <HeaderContainer>
          <NoteHeader
            problem={note?.Problem}
            contest={contest}
            userName={note?.User.Name}
            createdAt={note?.CreatedAt}
            updatedAt={note?.UpdatedAt} />
        </HeaderContainer>
        <PreviewContainer>
          <NotePreview rawText={note ? note.Text : ""} />
        </PreviewContainer>
        <FooterContainer>
        </FooterContainer>
      </Container>
    </NoteWrapper>
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

const HeaderContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 18px;
  padding-right: 18px;
  padding-left: 18px;
  border-bottom: solid thin #CCC;
`;

const FooterContainer = styled.div`
  border-top: solid thin #CCC;
`;

const PreviewContainer = styled.div`
  padding-top: 18px;
  padding-bottom: 32px;
  padding-right: 18px;
  padding-left: 18px;
`;

export default NotePage;