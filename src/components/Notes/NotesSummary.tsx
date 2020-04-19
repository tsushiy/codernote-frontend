import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicNoteColor, privateNoteColor } from "../Styles";
import { Note, isPublicNote } from "../../types/apiResponse";
import { GlobalState } from "../../types/globalState";
import { serviceName } from "../../utils/problemUtil";
import { ProblemLinkWithID } from "../Elements/ProblemLink";
import { ContestLink } from "../Elements/ContestLink";

type Props = {
  notes: Note[] | undefined;
  isMyNotes: boolean;
};

const NotesSummary: React.FC<Props> = (props: Props) => {
  const { notes, isMyNotes } = props;
  const { contestMap } = useSelector((state: GlobalState) => state.problem);
  return (
    <Container>
      {notes &&
        notes.map((note, i) => (
          <SummaryContainer key={i}>
            <TopRightContainer>
              {isMyNotes && (
                <React.Fragment>
                  {isPublicNote(note) && (
                    <div style={{ color: publicNoteColor }}>Public</div>
                  )}
                  {!isPublicNote(note) && (
                    <div style={{ color: privateNoteColor }}>Private</div>
                  )}
                </React.Fragment>
              )}
            </TopRightContainer>
            <div style={{ fontWeight: 500 }}>
              {serviceName(note.Problem.Domain)}
              {" : "}
              <ContestLink
                contest={contestMap.get(
                  note.Problem.Domain + note.Problem.ContestID
                )}
              />
            </div>
            <div style={{ fontSize: "1.25em", fontWeight: 500 }}>
              {"Problem: "}
              <ProblemLinkWithID problem={note.Problem} />
            </div>
            {!isMyNotes && (
              <div
                style={{
                  fontSize: ".9em",
                  color: "#555",
                }}
              >
                {"by "}
                {note.User.Name}
              </div>
            )}
            <TextContainer>
              {note.Text.slice(0, 300)}
              {note.Text.length > 300 && " ..."}
            </TextContainer>
            <LeftFooterContainer>
              <Link to={`/notes/${note.ID}`}>Read Note »</Link>
            </LeftFooterContainer>
            <RightFooterContainer>
              <div>
                {"Updated At: "}
                {new Date(note.UpdatedAt).toLocaleString()}
              </div>
            </RightFooterContainer>
          </SummaryContainer>
        ))}
    </Container>
  );
};

export default NotesSummary;

const Container = styled.div`
  width: 80%;
  margin: 12px auto 18px;
`;

const SummaryContainer = styled.div`
  position: relative;
  display: block;
  word-wrap: break-word;
  padding: 16px 8px 20px;
  max-width: 680px;
  margin: 0 auto;
  border-bottom: solid thin #bbb;
`;

const TopRightContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 6px;
  font-weight: bold;
`;

const TextContainer = styled.div`
  color: #444;
  font-size: 0.95em;
  padding: 0.4em 0 1.3em;
`;

const LeftFooterContainer = styled.div`
  position: absolute;
  font-size: 0.9em;
  left: 8px;
  bottom: 10px;
`;

const RightFooterContainer = styled.div`
  color: #555;
  position: absolute;
  font-size: 0.85em;
  right: 6px;
  bottom: 10px;
`;
