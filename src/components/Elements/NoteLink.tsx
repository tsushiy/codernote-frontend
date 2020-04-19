import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Note, ProblemNo } from "../../types/apiResponse";
import { isPublicNote } from "../../types/apiResponse";
import {
  editColor,
  publicNoteColor,
  privateNoteColor,
} from "../../components/Styles";

type EditProps = {
  problemNo: ProblemNo | undefined;
};

type ViewProps = {
  note: Note | undefined;
};

export const EditLink: React.FC<EditProps> = (props: EditProps) => {
  const { problemNo } = props;
  if (problemNo === undefined) {
    return null;
  } else {
    const editUrl = `/edit/${problemNo}`;
    return (
      <Link to={editUrl} style={{ color: editColor }}>
        Edit
      </Link>
    );
  }
};

export const EditButton: React.FC<EditProps> = (props: EditProps) => {
  const { problemNo } = props;
  if (problemNo === undefined) {
    return null;
  } else {
    const editUrl = `/edit/${problemNo}`;
    return <StyledEditLink to={editUrl}>Edit</StyledEditLink>;
  }
};

export const ViewLink: React.FC<ViewProps> = (props: ViewProps) => {
  const { note } = props;
  if (note !== undefined) {
    const viewUrl = `/notes/${note.ID}`;
    if (isPublicNote(note)) {
      return (
        <Link to={viewUrl} style={{ color: publicNoteColor }}>
          View
        </Link>
      );
    } else {
      return (
        <Link to={viewUrl} style={{ color: privateNoteColor }}>
          View
        </Link>
      );
    }
  } else {
    return null;
  }
};

export const ViewButton: React.FC<ViewProps> = (props: ViewProps) => {
  const { note } = props;
  if (note !== undefined) {
    const viewUrl = `/notes/${note.ID}`;
    if (isPublicNote(note)) {
      return <StyledPublicViewLink to={viewUrl}>View</StyledPublicViewLink>;
    } else {
      return <StyledPrivateViewLink to={viewUrl}>View</StyledPrivateViewLink>;
    }
  } else {
    return null;
  }
};

const StyledBaseLink = styled(Link)`
  &&& {
    color: #fff;
    white-space: nowrap;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    vertical-align: baseline;
    border-radius: 0.4rem;
  }
`;

const StyledEditLink = styled(StyledBaseLink)`
  &&& {
    background-color: ${editColor};
  }
`;

const StyledPrivateViewLink = styled(StyledBaseLink)`
  &&& {
    background-color: ${privateNoteColor};
  }
`;

const StyledPublicViewLink = styled(StyledBaseLink)`
  &&& {
    background-color: ${publicNoteColor};
  }
`;
