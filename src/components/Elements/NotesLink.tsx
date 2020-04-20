import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  domain?: string;
  userName?: string;
  problemNo?: number;
  tag?: string;
};

const LinkButton: React.FC<{ editUrl: string }> = (props: {
  editUrl: string;
}) => {
  return (
    <StyledLink to={props.editUrl}>
      <span role="img" aria-label="search">
        🔍
      </span>
    </StyledLink>
  );
};

export const NotesLinkButton: React.FC<Props> = (props: Props) => {
  const { domain, userName, problemNo, tag } = props;
  if (domain !== undefined) {
    const editUrl = `/notes/?domain=${domain}`;
    return <LinkButton editUrl={editUrl} />;
  }
  if (userName !== undefined) {
    const editUrl = `/notes/?userName=${userName}`;
    return <LinkButton editUrl={editUrl} />;
  }
  if (problemNo !== undefined) {
    const editUrl = `/notes/?problemNo=${problemNo}`;
    return <LinkButton editUrl={editUrl} />;
  }
  if (tag !== undefined) {
    const editUrl = `/notes/?tag=${tag}`;
    return <LinkButton editUrl={editUrl} />;
  }
  return null;
};

export const MyNotesLinkButton: React.FC<Props> = (props: Props) => {
  const { domain, tag } = props;
  if (domain !== undefined) {
    const editUrl = `/mynotes/?domain=${domain}`;
    return <LinkButton editUrl={editUrl} />;
  }
  if (tag !== undefined) {
    const editUrl = `/mynotes/?tag=${tag}`;
    return <LinkButton editUrl={editUrl} />;
  }
  return null;
};

const StyledLink = styled(Link)`
  &&& {
    padding: 0 0.15em;
    text-decoration: none;

    & > span {
      font-size: 0.85em;
    }
  }
`;
