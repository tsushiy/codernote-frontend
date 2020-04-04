import React from 'react';
import styled from "styled-components";
import { Button, Form } from 'react-bootstrap';

type Props = {
  onSubmitText: () => Promise<void>,
  onChangePublic: (pub: boolean) => void,
  onDeleteText: () => Promise<void>,
  isPublic: boolean,
  message: string
}

const Footer: React.FC<Props> = props => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "public") {
      props.onChangePublic(true)
    } else {
      props.onChangePublic(false)
    }
  }

  const isErrorMessage = props.message !== "Successfully submitted." ? true : false;

  return (
    <React.Fragment>
      <FooterMessage style={{color: isErrorMessage ? "red" : "green"}}>
        {props.message}
      </FooterMessage>
      <FooterButtons>
        <Button variant="danger" onClick={props.onDeleteText}>Delete</Button>
        <Form style={{padding: "0 5px"}}>
          <Form.Control as="select" custom="true" value={props.isPublic ? "public" : "private"} onChange={onChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Control>
        </Form>
        <Button onClick={props.onSubmitText}>Submit</Button>
      </FooterButtons>
    </React.Fragment>
  )
}

const FooterMessage = styled.p`
  position: absolute;
  left: 8px;
  color: red;
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
`;

const FooterButtons = styled.div`
  position: absolute;
  display: flex;
  right: 5px;
`;

export default Footer;