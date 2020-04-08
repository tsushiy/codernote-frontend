import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { markdownProcessor } from '../../utils/markdownProcessor';

type Props = {
  rawText: string,
  setAndShowMessage: (message: string) => void
}

const EditorPreview: React.FC<Props> = props => {
  const { rawText, setAndShowMessage } = props;
  const [htmlText, setHtmlText] = useState("");

  useEffect(() => {
    try {
      const { contents } = markdownProcessor.processSync(rawText);
      setHtmlText(contents as string);
    } catch (error) {
      setAndShowMessage(error.message);
    }
  }, [rawText, setAndShowMessage, setHtmlText])

  return (
    <Container>
      <div
        id="preview"
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlText as string }}
      />
    </Container>
  )
}

const Container = styled.div`
  top: 0;
  padding: 12px 16px;
  word-wrap: break-word;
`;

export default EditorPreview;