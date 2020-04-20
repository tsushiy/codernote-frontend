import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Toast } from "react-bootstrap";
import styled from "styled-components";
import { getMyNote, postMyNote, deleteMyNote } from "../../utils/apiClient";
import { GlobalState } from "../../types/globalState";
import { Note, isPublicNote } from "../../types/apiResponse";
import { setShowPreview } from "../../reducers/appReducer";
import { setMyNote, unsetMyNote } from "../../reducers/noteReducer";
import { messageColor } from "../Styles";
import MarkdownEditor from "./MarkdownEditor";
import EditorPreview from "./EditorPreview";
import Header from "./Header";
import Footer from "./Footer";

type Props = {} & RouteComponentProps<{ problemNo: string }>;

type WrapperProps = {
  children: React.ReactElement;
  problemExists: boolean;
  isFetchTried: boolean;
};

const EditorWrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  if (!props.problemExists) {
    return <Container>No problems matched.</Container>;
  } else if (!props.isFetchTried) {
    return null;
  } else {
    return props.children;
  }
};

const EditorPage: React.FC<Props> = (props: Props) => {
  const problemNo = Number(props.match.params.problemNo);

  const dispatch = useDispatch();
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [noteExists, setNoteExists] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [rawText, setRawText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { showPreview } = useSelector((state: GlobalState) => state.app);
  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { problemMap, contestMap } = useSelector(
    (state: GlobalState) => state.problem
  );

  const problemExists = problemMap.has(problemNo);
  const problem = problemMap.get(problemNo);
  let contest;
  if (problem) {
    contest = contestMap.get(problem?.Domain + problem?.ContestID);
  }

  const setAndShowMessage = (message: string) => {
    setMessage(message);
    setShowMessage(true);
  };

  const setNote = (note: Note) => {
    setNoteId(note.ID);
    setRawText(note.Text);
    setIsPublic(isPublicNote(note));
    setNoteExists(true);
  };

  const unsetNote = () => {
    setNoteId("");
    setRawText("");
    setIsPublic(false);
    setNoteExists(false);
  };

  useEffect(() => {
    setIsFetchTried(false);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isFetchTried) return;
    setIsFetchTried(true);
    if (!isLoggedIn) return;
    (async () => {
      try {
        const note = await getMyNote(problemNo);
        if (note) {
          setNote(note);
        }
      } catch (error) {
        setNoteExists(false);
      }
    })();
  }, [dispatch, isFetchTried, isLoggedIn, problemNo]);

  const onSubmitText = async () => {
    try {
      const note = await postMyNote(problemNo, rawText, isPublic);
      if (note) {
        dispatch(setMyNote({ problemNo, newNote: note }));
        setNote(note);
        setAndShowMessage("Successfully submitted.");
      }
    } catch (error) {
      setAndShowMessage("Failed to submit.");
    }
  };

  const onDeleteText = async () => {
    const res = await deleteMyNote(problemNo);
    if (res.status === 200) {
      dispatch(unsetMyNote({ problemNo }));
      unsetNote();
      setAndShowMessage("Successfully deleted.");
    } else {
      setAndShowMessage("Failed to delete.");
    }
  };

  const onChangeText = (txt: string) => setRawText(txt);
  const onChangePublic = (pub: boolean) => setIsPublic(pub);

  const onClickPreview = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      ev.preventDefault();
      dispatch(setShowPreview(!showPreview));
    },
    [dispatch, showPreview]
  );

  return (
    <EditorWrapper problemExists={problemExists} isFetchTried={isFetchTried}>
      <Container>
        <StyledToast
          style={{
            display: showMessage ? "block" : "none",
            backgroundColor: messageColor(message),
          }}
          onClose={() => {
            setShowMessage(false);
            setMessage("");
          }}
          show={showMessage}
          delay={3000}
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </StyledToast>
        <EditorHeaderContainer>
          <Header
            problem={problemMap.get(problemNo)}
            contest={contest}
            onClickPreview={onClickPreview}
            noteId={noteId}
          />
        </EditorHeaderContainer>
        <MarkdownEditorContainer>
          <MarkdownEditor
            showPreview={showPreview}
            rawText={rawText}
            onChangeText={onChangeText}
          />
        </MarkdownEditorContainer>
        {showPreview && (
          <EditorPreviewContainer>
            <EditorPreview
              rawText={rawText}
              setAndShowMessage={setAndShowMessage}
            />
          </EditorPreviewContainer>
        )}
        <FooterContainer>
          <Footer
            onSubmitText={onSubmitText}
            onChangePublic={onChangePublic}
            onDeleteText={onDeleteText}
            noteExists={noteExists}
            isPublic={isPublic}
          />
        </FooterContainer>
      </Container>
    </EditorWrapper>
  );
};

const Container = styled.div`
  position: absolute;
  overflow: hidden;
  height: calc(100vh - 56px);
  top: 56px;
  right: 5px;
  left: 5px;
  bottom: 0;
  padding-top: 8px;
  background-color: #fff;
`;

const StyledToast = styled(Toast)`
  &&& {
    position: absolute;
    top: 14px;
    right: 8px;
    color: #fff;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 0.5em;
  }
`;

const EditorHeaderContainer = styled.div`
  position: absolute;
  height: 150px;
  padding-left: 20px;
`;

const MarkdownEditorContainer = styled.div`
  position: absolute;
  overflow: auto;
  width: calc(100vw - 20px);
  top: 150px;
  bottom: 42px;
  left: 5px;
  border: solid thin #ccc;
`;

const EditorPreviewContainer = styled.div`
  position: absolute;
  overflow: auto;
  width: calc(50% - 5px);
  top: 150px;
  bottom: 42px;
  right: 5px;
  border: solid thin #ccc;
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
