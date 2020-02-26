import React from 'react';
import { Form, Button } from 'react-bootstrap';

const EditorPane: React.FC<any> = (props) => {
  const onChange = (e: any) => {
    props.onChangeText(e.target.value)
  };

  return (
    <div className="container">
      <Form>
        <Button onClick={props.onClickPreview}>Preview</Button>
        <Button onClick={props.onSubmitText}>Submit</Button>
        <Form.Control
          as="textarea"
          rows="30"
          defaultValue={props.text}
          onChange={onChange}
        />
      </Form>
    </div>
  )
}

export default EditorPane;