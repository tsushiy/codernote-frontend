import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { markdownProcessor } from '../../utils/markdownProcessor';

type Props = {
  rawText: string
}

const NotePreview: React.FC<Props> = props => {
  const { rawText } = props;
  const [htmlText, setHtmlText] = useState("");

  useEffect(() => {
    const { contents } = markdownProcessor.processSync(rawText);
    setHtmlText(contents as string);
  }, [rawText, setHtmlText])

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
  word-wrap: break-word;
`;

export default NotePreview;