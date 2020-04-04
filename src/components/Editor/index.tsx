import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { Toast } from 'react-bootstrap';
import styled from "styled-components";
import { getMyNote, postMyNote, deleteMyNote } from '../../utils/apiClient';
import { AppState } from '../../types/appState';
import { isPublicNote } from '../../types/apiResponse';
import { changeShowPreview } from '../../reducers/editorReducer';
import { setMyNote, unsetMyNote } from '../../reducers/noteReducer';
import MarkdownEditor from './MarkdownEditor';
import EditorPreview from './EditorPreview';
import EditorFooter from './EditorFooter';
import EditorHeader from './EditorHeader';

type Props = {} & RouteComponentProps<{problemNo: string}>;

type WrapperProps = {
  children: React.ReactElement;
  problemExists: boolean;
  isFetchTried: boolean;
}

const EditorWrapper: React.FC<WrapperProps> = props => {
  if (!props.problemExists) {
    return <div>No problems matched.</div>
  } else if (!props.isFetchTried) {
    return null;
  } else {
    return props.children;
  }
}

const EditorPage: React.FC<Props> = props => {
  const problemNo = Number(props.match.params.problemNo);

  const dispatch = useDispatch();
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [noteExists, setNoteExists] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [rawText, setRawText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");

  const { showPreview } = useSelector((state: AppState) => state.editor)
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const { problemMap, contestMap } = useSelector((state: AppState) => state.problem);

  const problemExists = problemMap.has(problemNo);
  const problem = problemMap.get(problemNo);
  let contest;
  if (problem) {
    contest = contestMap.get(problem?.Domain + problem?.ContestID);
  }

  useEffect(() => {
    if (isFetchTried || !isLoggedIn) return;
    (async() => {
      try {
        const note = await getMyNote(problemNo);
        if (note) {
          setNoteId(note.ID);
          setRawText(note.Text);
          setIsPublic(isPublicNote(note));
          setNoteExists(true);
        }
      } catch (error) {
        setNoteExists(false);
      }
      setIsFetchTried(true);
    })();
  }, [dispatch, isFetchTried, isLoggedIn, problemNo])

  const onSubmitText = async () => {
    try {
      const note = await postMyNote(problemNo, rawText, isPublic);
      if (note) {
        dispatch(setMyNote({problemNo, newNote: note}));
        setNoteId(note.ID);
        setNoteExists(true);
        setMessage("Successfully submitted.");
      }
    } catch (error) {
      setMessage("Failed to submit.");
    }
  }

  const onDeleteText = async () => {
    const res = await deleteMyNote(problemNo);
    if (res.status === 200) {
      dispatch(unsetMyNote({problemNo}));
      setNoteId("");
      setNoteExists(false);
      setMessage("Successfully deleted.");
    } else {
      setMessage("Failed to delete.");
    }
  }

  const onChangeText = (txt: string) => {
    setRawText(txt)
  }

  const onChangePublic = (pub: boolean) => {
    setIsPublic(pub)
  }

  const onClickPreview = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      ev.preventDefault();
      dispatch(changeShowPreview(!showPreview));
    },
    [dispatch, showPreview]
  );

  return (
    <EditorWrapper problemExists={problemExists} isFetchTried={isFetchTried}>
      <Container>
        <StyledToast
          style={{backgroundColor: message.match(/^Success/) ? "#394" : "red"}}
          onClose={() => setMessage("")}
          show={message!==""}
          delay={3000}
          autohide>
          <Toast.Body>
            {message}
          </Toast.Body>
        </StyledToast>
        <EditorHeaderContainer>
          <EditorHeader
            problem={problemMap.get(problemNo)}
            contest={contest}
            onClickPreview={onClickPreview}
            noteId={noteId}/>
        </EditorHeaderContainer>
        <MarkdownEditorContainer>
          <MarkdownEditor
            showPreview={showPreview}
            rawText={rawText}
            onChangeText={onChangeText}/>
        </MarkdownEditorContainer>
        {showPreview &&
          <EditorPreviewContainer>
            <EditorPreview
              rawText={rawText}
              setMessage={setMessage}/>
          </EditorPreviewContainer>
        }
        <FooterContainer>
          <EditorFooter
            onSubmitText={onSubmitText}
            onChangePublic={onChangePublic}
            onDeleteText={onDeleteText}
            noteExists={noteExists}
            isPublic={isPublic}/>
        </FooterContainer>
      </Container>
    </EditorWrapper>
  )
}

const Container = styled.div`
  position: absolute;
  height: calc(100vh - 56px);
  top: 56px;
  right: 5px;
  left: 5px;
  bottom: 0;
`;

const StyledToast = styled(Toast)`
  &&& {
    position: absolute;
    bottom: 42px;
    right: 0;
    color: #FFF;
    background-color: red;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 0.5em;
  }
`

const EditorHeaderContainer = styled.div`
  position: absolute;
  height: 140px;
  padding-left: 20px;
`;

const MarkdownEditorContainer = styled.div`
  position: absolute;
  overflow: auto;
  width: calc(100vw - 10px);
  top: 140px;
  bottom: 42px;
  left: 0;
  border: solid thin #CCC;
`;

const EditorPreviewContainer = styled.div`
  position: absolute;
  overflow: auto;
  width: 50%;
  top: 140px;
  bottom: 42px;
  right: 0;
  border: solid thin #CCC;
`;

const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 42px;
  padding: 10px;
  top: auto;
  bottom: 8px;
`;

export default EditorPage;