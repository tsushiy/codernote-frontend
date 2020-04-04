import React from 'react';
import styled from "styled-components";
import { Button, Form } from 'react-bootstrap';

type Props = {
  onSubmitText: () => Promise<void>,
  onChangePublic: (pub: boolean) => void,
  onDeleteText: () => Promise<void>,
  noteExists: boolean,
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
    <React.Fragment>
      <ButtonsContainer>
        {props.noteExists ? <Button variant="danger" onClick={props.onDeleteText}>Delete</Button> : null}
        <Form style={{padding: "0 5px"}}>
          <Form.Control as="select" custom="true" value={props.isPublic ? "public" : "private"} onChange={onChange}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Control>
        </Form>
        <Button onClick={props.onSubmitText}>Submit</Button>
      </ButtonsContainer>
    </React.Fragment>
  )
}

const ButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  right: 5px;
`;

export default Footer;