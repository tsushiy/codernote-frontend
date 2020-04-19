import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
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

const NotesTable: React.FC<Props> = (props: Props) => {
  const { notes, isMyNotes } = props;
  const { contestMap } = useSelector((state: GlobalState) => state.problem);
  return (
    <StyledTable className="table-responsive-sm table-hover" size="sm">
      <thead>
        <tr>
          <th style={{ width: "5%" }}>Note</th>
          {isMyNotes && <th style={{ width: "6%" }}>Public</th>}
          {!isMyNotes && <th style={{ width: "10%" }}>User</th>}
          <th style={{ width: "10%" }}>Service</th>
          <th style={{ width: "22%" }}>Contest</th>
          <th>Problem</th>
          <th style={{ width: "18%" }}>UpdatedAt</th>
        </tr>
      </thead>
      <tbody>
        {notes &&
          notes.map((note, i) => (
            <tr key={i}>
              <td>
                <Link to={`/notes/${note.ID}`}>View</Link>
              </td>
              {isMyNotes && (
                <td>
                  {isPublicNote(note) && (
                    <div style={{ color: publicNoteColor }}>Public</div>
                  )}
                  {!isPublicNote(note) && (
                    <div style={{ color: privateNoteColor }}>Private</div>
                  )}
                </td>
              )}
              {!isMyNotes && <td>{note.User.Name}</td>}
              <td>{serviceName(note.Problem.Domain)}</td>
              <td>
                <ContestLink
                  contest={contestMap.get(
                    note.Problem.Domain + note.Problem.ContestID
                  )}
                />
              </td>
              <td>
                <ProblemLinkWithID problem={note.Problem} />
              </td>
              <td>{new Date(note.UpdatedAt).toLocaleString()}</td>
            </tr>
          ))}
      </tbody>
    </StyledTable>
  );
};

export default NotesTable;

const StyledTable = styled(Table)`
  &&& {
    color: #444;
    font-size: 0.98em;
  }
`;
