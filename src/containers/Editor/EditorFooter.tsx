import React from 'react';
import styled from "styled-components";
import { Button, Form } from 'react-bootstrap';

type Props = {
  onSubmitText: () => Promise<void>,
  onChangePublic: (pub: boolean) => void,
  isPublic: boolean
}

const Footer: React.FC<Props> = props => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "public") {
      props.onChangePublic(true)
    } else {
      props.onChangePublic(false)
    }
  }

  return (
    <FooterButtons>
      <Form style={{padding: "0 5px"}}>
        <Form.Control as="select" custom value={props.isPublic ? "public" : "private"} onChange={onChange}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Form.Control>
      </Form>
      <Button onClick={props.onSubmitText}>Submit</Button>
    </FooterButtons>
  )
}

const FooterButtons = styled.div`
  position: absolute;
  display: flex;
  right: 5px;
`;

export default Footer;