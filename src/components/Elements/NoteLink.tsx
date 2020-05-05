import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Note, ProblemNo } from "../../types/apiResponse";
import { mainButtonColor } from "../../components/Styles";

type EditProps = {
  problemNo: ProblemNo | undefined;
};

type ViewProps = {
  note: Note | undefined;
};

export const EditButton: React.FC<EditProps> = (props: EditProps) => {
  const { problemNo } = props;
  if (problemNo === undefined) {
    return null;
  } else {
    const editUrl = `/edit/${problemNo}`;
    return (
      <Link to={editUrl}>
        <FontAwesomeIcon
          icon={["fas", "pencil-alt"]}
          size="sm"
          color={mainButtonColor}
        />
      </Link>
    );
  }
};

export const ViewButton: React.FC<ViewProps> = (props: ViewProps) => {
  const { note } = props;
  if (note === undefined) {
    return null;
  } else {
    const viewUrl = `/notes/${note.ID}`;
    return (
      <Link to={viewUrl}>
        <FontAwesomeIcon
          icon={["fas", "eye"]}
          size="sm"
          color={mainButtonColor}
        />
      </Link>
    );
  }
};
