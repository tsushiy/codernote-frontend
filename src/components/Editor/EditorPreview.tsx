import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { markdownProcessor } from '../../utils/markdownProcessor';

type Props = {
  rawText: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const EditorPreview: React.FC<Props> = props => {
  const { rawText, setMessage } = props;
  const [htmlText, setHtmlText] = useState("");

  useEffect(() => {
    try {
      const { contents } = markdownProcessor.processSync(rawText);
      setHtmlText(contents as string);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }, [setMessage, rawText, setHtmlText])

  return (
    <Container>
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

export default EditorPreview;