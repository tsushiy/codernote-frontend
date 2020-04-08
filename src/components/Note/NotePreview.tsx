import React, { useState, useEffect } from 'react';
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
    <div
      id="preview"
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlText as string }}
    />
  )
}

export default NotePreview;