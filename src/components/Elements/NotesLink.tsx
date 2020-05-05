import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mainButtonColor } from "../../components/Styles";

type Props = {
  domain?: string;
  userName?: string;
  problemNo?: number;
  tag?: string;
};

const LinkButton: React.FC<{ searchUrl: string }> = (props: {
  searchUrl: string;
}) => {
  return (
    <Link to={props.searchUrl}>
      <FontAwesomeIcon
        icon={["fas", "search"]}
        size="sm"
        color={mainButtonColor}
      />
    </Link>
  );
};

export const NotesSearchButton: React.FC<Props> = (props: Props) => {
  const { domain, userName, problemNo, tag } = props;
  if (domain !== undefined) {
    const searchUrl = `/notes/?domain=${domain}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  if (userName !== undefined) {
    const searchUrl = `/notes/?userName=${userName}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  if (problemNo !== undefined) {
    const searchUrl = `/notes/?problemNo=${problemNo}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  if (tag !== undefined) {
    const searchUrl = `/notes/?tag=${tag}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  return null;
};

export const MyNotesSearchButton: React.FC<Props> = (props: Props) => {
  const { domain, tag } = props;
  if (domain !== undefined) {
    const searchUrl = `/mynotes/?domain=${domain}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  if (tag !== undefined) {
    const searchUrl = `/mynotes/?tag=${tag}`;
    return <LinkButton searchUrl={searchUrl} />;
  }
  return null;
};

export const NotesSearchButtonWithPadding: React.FC<Props> = (props: Props) => {
  return (
    <span style={{ padding: "0 0.1em" }}>
      <NotesSearchButton {...props} />
    </span>
  );
};

export const MyNotesSearchButtonWithPadding: React.FC<Props> = (
  props: Props
) => {
  return (
    <span style={{ padding: "0 0.1em" }}>
      <MyNotesSearchButton {...props} />
    </span>
  );
};
