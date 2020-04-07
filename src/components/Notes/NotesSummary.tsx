import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { publicNoteColor, privateNoteColor } from '../Styles';
import { Note, isPublicNote } from '../../types/apiResponse';
import { GlobalState } from '../../types/globalState';
import { problemUrl, serviceName } from '../../utils/problem';

type Props = {
  notes: Note[] | undefined;
  isMyNotes: boolean;
}

const NotesSummary: React.FC<Props> = props => {
  const { notes, isMyNotes } = props;
  const { contestMap } = useSelector((state: GlobalState) => state.problem);
  return (
    <Container>
      {notes && notes.map((note, i) => (
        <SummaryContainer key={i}>
          <BoxContainer>
            {isMyNotes &&
              <React.Fragment>
                {isPublicNote(note) &&
                  <div style={{color: publicNoteColor}}>
                    Public
                  </div>}
                {!isPublicNote(note) && 
                  <div style={{color: privateNoteColor}}>
                    Private
                  </div>}
              </React.Fragment>
            }
          </BoxContainer>
          <h5>
            {"Note: "}
            <Link to={`/notes/${note.ID}`}>
              {note.ID.slice(0, 8)}
            </Link>
          </h5>
          <h6>
            {"Problem: "}
            <a href={problemUrl(note.Problem)} target="_blank" rel="noopener noreferrer">
              {note.Problem.Domain === "aoj" &&
                `${note.Problem.ProblemID}. `}
              {(note.Problem.Domain === "leetcode" || note.Problem.Domain === "yukicoder") &&
                `${note.Problem.FrontendID}. `}
              {note.Problem.Title}
            </a>
          </h6>
          <h6>
            {serviceName(note.Problem.Domain)}
            {": "}
            {contestMap.get(note.Problem.Domain + note.Problem.ContestID)?.Title}
          </h6>
          <TextContainer>
            {note.Text.slice(0, 300)}
            {note.Text.length > 300 && " ..."}
          </TextContainer>
          <FooterContainer>
            <div>
              {"Author: "}
              {note.User.Name}
            </div>
            <div>
              {"Updated At: "}
              {(new Date(note.UpdatedAt)).toLocaleString()}
            </div>
          </FooterContainer>
        </SummaryContainer>
      ))}
    </Container>
  );
}

export default NotesSummary;

const Container = styled.div`
  width: 80%;
  margin: 12px auto 18px;
`;

const SummaryContainer = styled.div`
  position: relative;
  display: block;
  word-wrap: break-word;
  padding: 14px 8px;
  max-width: 640px;
  margin: 0 auto;
  border-bottom: solid thin #bbb;
`;

const BoxContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 4px;
  font-weight: bold;
`;

const TextContainer = styled.div`
  font-size: 0.95em;
  margin-bottom: 40px;
`;

const FooterContainer = styled.div`
  position: absolute;
  font-size: 0.9em;
  right: 4px;
  bottom: 4px;
`;