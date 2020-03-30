import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { markdownProcessor } from '../../utils/markdownProcessor';

type Props = {
  rawText: string
}

const EditorPreview: React.FC<Props> = props => {
  const [htmlText, setHtmlText] = useState("");
  const [message, setMessage] = useState("");

  const compile = (raw: string) => {
    try {
      const { contents } = markdownProcessor.processSync(raw);
      setHtmlText(contents as string);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    compile(props.rawText);
  })

  return (
    <Container>
      <ErrorMessage>{message}</ErrorMessage>
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: htmlText as string }}
      />
    </Container>
  )
}

const Container = styled.div`
  top: 0;
  padding-top: 5px;
  padding-bottom: 12px;
  padding-left: 18px;
  word-wrap: break-word;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default EditorPreview;