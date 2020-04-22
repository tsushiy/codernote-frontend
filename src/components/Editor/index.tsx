import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Toast, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMyNote, postMyNote, deleteMyNote } from "../../utils/apiClient";
import { GlobalState } from "../../types/globalState";
import { Note, isPublicNote } from "../../types/apiResponse";
import { setEditorPreviewMode } from "../../reducers/appReducer";
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

  const { editorPreviewMode } = useSelector((state: GlobalState) => state.app);
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

  useEffect(() => {
    setIsFetchTried(false);
  }, [isLoggedIn]);

  useEffect(() => {
    let unmounted = false;
    if (isFetchTried) return;
    getMyNote(problemNo)
      .then((note) => {
        if (!unmounted) {
          setNote(note);
          setIsFetchTried(true);
        }
      })
      .catch(() => {
        if (!unmounted) {
          unsetNote();
          setIsFetchTried(true);
        }
      });
    return () => {
      unmounted = true;
    };
  }, [dispatch, isFetchTried, isLoggedIn, problemNo]);

  useEffect(() => {
    let timerId: number;
    if (!showMessage) {
      timerId = setTimeout(() => setMessage(""), 200);
    }
    return () => clearTimeout(timerId);
  }, [showMessage]);

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

  const setAndShowMessage = (message: string) => {
    setMessage(message);
    setShowMessage(true);
  };

  const submitNote = () => {
    postMyNote(problemNo, rawText, isPublic)
      .then((note) => {
        dispatch(setMyNote({ problemNo, newNote: note }));
        setNote(note);
        setAndShowMessage("Successfully submitted.");
      })
      .catch(() => {
        setAndShowMessage("Failed to submit.");
      });
  };

  const deleteNote = () => {
    deleteMyNote(problemNo)
      .then(() => {
        dispatch(unsetMyNote({ problemNo }));
        unsetNote();
        setAndShowMessage("Successfully deleted.");
      })
      .catch(() => {
        setAndShowMessage("Failed to delete.");
      });
  };

  return (
    <EditorWrapper problemExists={problemExists} isFetchTried={isFetchTried}>
      <Container>
        <StyledToast
          style={{ backgroundColor: messageColor(message) }}
          onClose={() => setShowMessage(false)}
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
            noteId={noteId}
          />
        </EditorHeaderContainer>
        <NavContainer>
          <Nav
            variant="tabs"
            defaultActiveKey={editorPreviewMode}
            onSelect={(eventKey: string) => {
              dispatch(setEditorPreviewMode(eventKey));
            }}
          >
            <Nav.Item>
              <Nav.Link eventKey="edit">
                <FontAwesomeIcon
                  icon={["fas", "edit"]}
                  size="sm"
                  color="#777"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="both">
                <FontAwesomeIcon
                  icon={["fas", "arrows-alt-h"]}
                  size="sm"
                  color="#777"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="preview">
                <FontAwesomeIcon icon={["fas", "eye"]} size="sm" color="#777" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </NavContainer>
        <EditorContainer>
          <MarkdownEditor
            editorPreviewMode={editorPreviewMode}
            rawText={rawText}
            setRawText={setRawText}
          />
          <EditorPreview
            editorPreviewMode={editorPreviewMode}
            rawText={rawText}
            setAndShowMessage={setAndShowMessage}
          />
        </EditorContainer>
        <FooterContainer>
          <Footer
            submitNote={submitNote}
            deleteNote={deleteNote}
            setIsPublic={setIsPublic}
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

const NavContainer = styled.div`
  position: absolute;
  width: calc(100vw - 20px);
  height: 32px;
  top: 118px;
  left: 5px;

  .nav-tabs {
    border-color: #ccc;
  }

  .nav-link.active {
    border-color: #ccc #ccc #fff;
  }

  .nav-link {
    height: 32px;
    padding: 4px 8px;
  }
`;

const EditorContainer = styled.div`
  position: absolute;
  width: calc(100vw - 20px);
  top: 150px;
  bottom: 42px;
  right: 5px;
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
