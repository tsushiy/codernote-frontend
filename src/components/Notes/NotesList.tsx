import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { Note } from "../../types/apiResponse";
import { GlobalState } from "../../types/globalState";
import { serviceName } from "../../utils/problemUtil";
import { ProblemLinkWithID } from "../Elements/ProblemLink";
import { ContestLink } from "../Elements/ContestLink";
import { EditLink, ViewLink } from "../Elements/NoteLink";
import { NotesLinkButton, MyNotesLinkButton } from "../Elements/NotesLink";

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
          <th style={{ width: "17%" }}>UpdatedAt</th>
          {!isMyNotes && <th style={{ width: "12%" }}>User</th>}
          <th style={{ width: "13%" }}>Service</th>
          <th style={{ width: "22%" }}>Contest</th>
          <th>Problem</th>
          <th style={{ width: "10%" }}>Note</th>
        </tr>
      </thead>
      <tbody>
        {notes &&
          notes.map((note, i) => (
            <tr key={i}>
              <td className="text-center">
                {new Date(note.UpdatedAt).toLocaleString()}
              </td>
              {!isMyNotes && (
                <td>
                  {note.User.Name}
                  <NotesLinkButton userName={note.User.Name} />
                </td>
              )}
              <td className="text-center">
                {serviceName(note.Problem.Domain)}
                {isMyNotes && (
                  <MyNotesLinkButton domain={note.Problem.Domain} />
                )}
                {!isMyNotes && <NotesLinkButton domain={note.Problem.Domain} />}
              </td>
              <td>
                <ContestLink
                  contest={contestMap.get(
                    note.Problem.Domain + note.Problem.ContestID
                  )}
                />
              </td>
              <td>
                <ProblemLinkWithID problem={note.Problem} />
                <NotesLinkButton problemNo={note.Problem.No} />
              </td>
              <td className="text-center">
                {isMyNotes && (
                  <React.Fragment>
                    <EditLink problemNo={note.Problem.No} />
                    {" / "}
                  </React.Fragment>
                )}
                <ViewLink note={note} />
              </td>
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
