import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { MainContainer } from "../../components/Styles";
import { nonAuthGetNote, authGetNote } from "../../utils/apiClient";
import { GlobalState } from "../../types/globalState";
import { Note } from "../../types/apiResponse";
import NotePreview from "./NotePreview";
import Header from "./Header";

type Props = {} & RouteComponentProps<{ noteId: string }>;

type WrapperProps = {
  children: React.ReactElement;
  noteExists: boolean;
  isFetchTried: boolean;
};

const NoteWrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  if (!props.isFetchTried) {
    return null;
  } else if (!props.noteExists) {
    return <Container>Note not found.</Container>;
  } else {
    return props.children;
  }
};

const NotePage: React.FC<Props> = (props: Props) => {
  const noteId = props.match.params.noteId;
  const [note, setNote] = useState<Note>();
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [noteExists, setNoteExists] = useState(false);

  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { contestMap } = useSelector((state: GlobalState) => state.problem);

  let contest;
  if (note) {
    contest = contestMap.get(note?.Problem.Domain + note?.Problem.ContestID);
  }

  useEffect(() => {
    let unmounted = false;
    const getNote = isLoggedIn ? authGetNote : nonAuthGetNote;
    getNote(noteId)
      .then((note) => {
        if (!unmounted) {
          setNote(note);
          setNoteExists(true);
          setIsFetchTried(true);
        }
      })
      .catch(() => {
        if (!unmounted) {
          setNoteExists(false);
          setIsFetchTried(true);
        }
      });
    return () => {
      unmounted = true;
    };
  }, [isLoggedIn, noteId]);

  return (
    <MainContainer>
      <NoteWrapper noteExists={noteExists} isFetchTried={isFetchTried}>
        <Container>
          <HeaderContainer>
            <Header
              problem={note?.Problem}
              contest={contest}
              userName={note?.User.Name}
              createdAt={note?.CreatedAt}
              updatedAt={note?.UpdatedAt}
            />
          </HeaderContainer>
          <PreviewContainer>
            <NotePreview rawText={note ? note.Text : ""} />
          </PreviewContainer>
        </Container>
      </NoteWrapper>
    </MainContainer>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  padding: 24px 18px 0;
`;

const HeaderContainer = styled.div`
  padding: 0 0 18px;
  border-bottom: solid thin #aaa;
`;

const PreviewContainer = styled.div`
  word-wrap: break-word;
  padding: 18px 0;
`;

export default NotePage;
