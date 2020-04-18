import React from "react";
import styled from "styled-components";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { publicNoteColor, privateNoteColor } from "../Styles";

type Props = {
  onSubmitText: () => Promise<void>;
  onChangePublic: (pub: boolean) => void;
  onDeleteText: () => Promise<void>;
  noteExists: boolean;
  isPublic: boolean;
};

const Footer: React.FC<Props> = (props: Props) => {
  const publicButton = (
    <span style={{ color: publicNoteColor }}>
      <FontAwesomeIcon
        icon={["fas", "users"]}
        style={{ width: "16px", height: "16px" }}
      />{" "}
      Public
    </span>
  );

  const privateButton = (
    <span style={{ color: privateNoteColor }}>
      <FontAwesomeIcon
        icon={["fas", "lock"]}
        style={{ width: "16px", height: "16px" }}
      />{" "}
      Private
    </span>
  );

  return (
    <ButtonsContainer>
      {props.noteExists && (
        <Button variant="danger" onClick={props.onDeleteText}>
          Delete
        </Button>
      )}
      <Dropdown
        as={ButtonGroup}
        drop="up"
        onSelect={(eventKey: string) => {
          switch (eventKey) {
            case "public":
              props.onChangePublic(true);
              break;
            case "private":
              props.onChangePublic(false);
              break;
          }
        }}
      >
        <Dropdown.Toggle id="public-dropdown" variant="light">
          {props.isPublic ? publicButton : privateButton}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="public">{publicButton}</Dropdown.Item>
          <Dropdown.Item eventKey="private">{privateButton}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={props.onSubmitText}>
        <FontAwesomeIcon
          icon={["fas", "edit"]}
          style={{ width: "16px", height: "16px" }}
        />{" "}
        {props.noteExists ? "Update" : "Submit"}
      </Button>
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  right: 5px;

  & > button {
    margin: 0 4px;
  }
`;

export default Footer;
