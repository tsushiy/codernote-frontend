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

const NotePage: React.FC<Props> = props => {
  const noteId = props.match.params.noteId;
  const [note, setNote] = useState<Note>();
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      authGetNote(noteId)
        .then(note => {
          if (note) {
            setNote(note)
          }
        });
    } else {
      nonAuthGetNote(noteId)
        .then(note => {
          if (note) {
            setNote(note)
          }
        });
    }
  }, [isLoggedIn, noteId])

  return (
    <Container>
      <HeaderContainer>
        <NoteHeader
          problem={note?.Problem}
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